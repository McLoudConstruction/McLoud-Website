import { createHash } from 'node:crypto';
import { STATIC_PROMPT, dynamicPrompt } from '@/lib/chatPrompt';
import { JOBS_API_URL, CHAT_FALLBACK_REPLY, CHAT_PHONE, CHAT_EMAIL } from '@/lib/chatConfig';

// The website chat assistant.
//
//   GET  /api/chat   { enabled }   Lets the widget stay hidden until the keys
//                                  below are set, so this can be deployed first.
//   POST /api/chat   { messages, conversationId?, visitorId?, pagePath? }
//                    -> { reply, conversationId, quickReplies, form, booked, handedOff }
//
// The browser only ever sees text. The model key and the shared secret live
// here on the server. Leads, bookings, rate limits and transcripts are handled
// by the jobs platform (/api/public/chat/*), which this route calls with a
// shared secret.
//
// Environment variables (Vercel, this project):
//   ANTHROPIC_API_KEY   required
//   CHAT_SHARED_SECRET  required, 16+ characters, identical in the jobs project
//   CHAT_IP_SALT        optional, any random text; falls back to the secret
//   CHAT_MODEL          optional, defaults to claude-haiku-5-5
//   CHAT_ENABLED        optional, set to "false" to switch the chat off
//   JOBS_API_URL        optional, defaults to https://jobs.mcloudconstruction.com

export const runtime = 'nodejs';
export const maxDuration = 45;

const MODEL = process.env.CHAT_MODEL || 'claude-haiku-5-5';
const MAX_HISTORY = 24;
const MAX_MESSAGE_CHARS = 1500;
const MAX_TOTAL_CHARS = 14000;
const MAX_TOOL_ROUNDS = 5;

const ALLOWED_ORIGINS = [
  'https://mcloudconstruction.com',
  'https://www.mcloudconstruction.com',
];

function configured() {
  return Boolean(
    process.env.ANTHROPIC_API_KEY &&
      process.env.CHAT_SHARED_SECRET &&
      process.env.CHAT_SHARED_SECRET.length >= 16 &&
      process.env.CHAT_ENABLED !== 'false',
  );
}

function originAllowed(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // same origin requests from some browsers omit it; rate limits still apply
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return true; // preview deploys
  if (/^http:\/\/localhost:\d+$/.test(origin)) return true;
  return false;
}

function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

function hashIp(ip) {
  const salt = process.env.CHAT_IP_SALT || process.env.CHAT_SHARED_SECRET || '';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

// Calls the jobs platform. Returns { status, data }; never throws.
async function jobs(action, payload, timeoutMs = 9000) {
  try {
    const res = await fetch(`${JOBS_API_URL}/api/public/chat/${action}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-chat-secret': process.env.CHAT_SHARED_SECRET },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
      cache: 'no-store',
    });
    let data = null;
    try { data = await res.json(); } catch { /* not JSON */ }
    return { status: res.status, data };
  } catch {
    return { status: 0, data: null };
  }
}

// ── Tools the assistant can use ─────────────────────────────────────────

const FORM_FIELDS = ['name', 'phone', 'email', 'address', 'project', 'company'];

const TOOLS = [
  {
    name: 'get_consult_times',
    description:
      'Get the open times for a free consultation. Returns the next several days that have openings. Call this before offering times; never invent times.',
    input_schema: {
      type: 'object',
      properties: {
        from_date: {
          type: 'string',
          description: 'Optional. Only show times on or after this date, formatted YYYY-MM-DD. Use when the visitor asks for a later week.',
        },
      },
    },
  },
  {
    name: 'book_consultation',
    description:
      'Book a free consultation and create the lead. Only call after the visitor has chosen a time from get_consult_times AND has clearly said yes to your confirmation of the details. Use the date and time exactly as returned by get_consult_times.',
    input_schema: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'YYYY-MM-DD, as returned by get_consult_times.' },
        time: { type: 'string', description: 'HH:MM in 24 hour time, as returned by get_consult_times.' },
        name: { type: 'string', description: 'Full name.' },
        phone: { type: 'string', description: '10 digit phone number.' },
        email: { type: 'string', description: 'Email address.' },
        address: { type: 'string', description: 'Property address where the consultation will happen (street and city).' },
        project_type: { type: 'string', enum: ['residential', 'commercial'] },
        service: { type: 'string', description: 'Short name of the work, for example Kitchen Remodeling or Unit Renovations.' },
        description: { type: 'string', description: 'What the visitor wants done, in a few sentences, using their words.' },
        company: { type: 'string', description: 'Company name. Required for commercial.' },
      },
      required: ['date', 'time', 'name', 'phone', 'email', 'address', 'project_type', 'description'],
    },
  },
  {
    name: 'show_contact_form',
    description:
      'Show the visitor a short form for their contact details, so they can fill it in instead of typing answers one by one. Use it when a booking or a team follow up needs details. List only the fields you still need. The visitor submits the form and their details arrive as their next message.',
    input_schema: {
      type: 'object',
      properties: {
        fields: {
          type: 'array',
          items: { type: 'string', enum: FORM_FIELDS },
          description: 'Which fields to show, in order. Usually name, phone, email, address, project. Add company only for commercial work.',
        },
      },
      required: ['fields'],
    },
  },
  {
    name: 'request_team_followup',
    description:
      'Pass the visitor to a person at McLoud. Use when they want a person, ask something you may not answer, press on warranty, licensing, price or timeline, or booking is not available. Needs their name and a phone number or email.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
        reason: { type: 'string', description: 'One short line on why a person is needed.' },
        summary: { type: 'string', description: 'The visitor\'s question or project in a few sentences, in their words.' },
        project_type: { type: 'string', enum: ['residential', 'commercial'] },
        address: { type: 'string' },
        company: { type: 'string' },
        service: { type: 'string' },
      },
      required: ['name', 'reason', 'summary'],
    },
  },
];

function describeDays(days) {
  return days
    .map(d => `${d.date}: ${d.slots.map(s => `${s.time} (${s.label})`).join(', ')}`)
    .join('\n');
}

function chipsFromDays(days) {
  const chips = [];
  for (const d of days.slice(0, 3)) {
    for (const s of d.slots.slice(0, 2)) chips.push({ label: s.label, text: `I'd like ${s.label}` });
  }
  return chips.slice(0, 6);
}

// Runs one tool for the model. `ctx` collects what the widget should show.
async function runTool(name, input, ctx) {
  input = input && typeof input === 'object' ? input : {};

  if (name === 'get_consult_times') {
    const { data } = await jobs('availability', { fromDate: input.from_date });
    if (!data || data.ok === false) return 'Booking is not available right now. Offer to have the team follow up.';
    if (!data.enabled) return 'Online booking is turned off right now. Offer to have the team follow up with request_team_followup, or point to the estimate form.';
    if (!data.days.length) return 'There are no open times in the coming weeks. Offer to have the team follow up with request_team_followup.';
    ctx.quickReplies = chipsFromDays(data.days);
    return `Open consultation times (about ${data.durationMinutes} minutes each, Kansas City time). Offer a few and use the date and 24 hour time when booking.\n${describeDays(data.days)}`;
  }

  if (name === 'show_contact_form') {
    const wanted = Array.isArray(input.fields) ? input.fields : [];
    const fields = FORM_FIELDS.filter(f => wanted.includes(f));
    ctx.form = { fields: fields.length ? fields : ['name', 'phone', 'email'] };
    ctx.quickReplies = [];
    return 'The form is now on the visitor\'s screen. Write one short sentence asking them to fill it in, then stop. Their details arrive as their next message.';
  }

  if (name === 'book_consultation') {
    const { status, data } = await jobs('book', {
      ipHash: ctx.ipHash,
      conversationId: ctx.conversationId,
      pagePath: ctx.pagePath,
      date: input.date,
      time: input.time,
      name: input.name,
      phone: input.phone,
      email: input.email,
      address: input.address,
      projectType: input.project_type,
      project: input.service,
      description: input.description,
      company: input.company,
    });
    if (!data) return 'The booking system did not respond. Apologize, and offer the phone number or have the team follow up with request_team_followup.';
    if (data.ok) {
      ctx.booked = { label: data.label };
      ctx.opportunityId = data.leadId;
      ctx.quickReplies = [];
      return `Booked for ${data.label}. The lead was created for the team. Tell the visitor the time and that someone will confirm by phone or email.`;
    }
    if (data.reason === 'missing_info') return `Not booked. Still needed: ${(data.missing || []).join(', ')}. Ask for it.`;
    if (data.reason === 'slot_unavailable') {
      if (data.days?.length) ctx.quickReplies = chipsFromDays(data.days);
      return `That time is no longer available. Not booked. Offer these instead:\n${describeDays(data.days || [])}`;
    }
    if (data.reason === 'already_booked') return `This email already has a consultation booked for ${data.label}. Not booked again. If they need a change, give the phone number.`;
    if (data.reason === 'booking_limit') return `Not booked: too many bookings from this visitor today. Give the phone number ${CHAT_PHONE}.`;
    if (data.reason === 'booking_off') return 'Online booking is turned off right now. Offer to have the team follow up.';
    if (status === 429) return `Not booked: too many requests. Give the phone number ${CHAT_PHONE}.`;
    return `The booking did not go through. Offer the phone number ${CHAT_PHONE} or have the team follow up.`;
  }

  if (name === 'request_team_followup') {
    const { data } = await jobs('lead', {
      ipHash: ctx.ipHash,
      conversationId: ctx.conversationId,
      pagePath: ctx.pagePath,
      name: input.name,
      phone: input.phone,
      email: input.email,
      reason: input.reason,
      summary: input.summary,
      projectType: input.project_type,
      address: input.address,
      company: input.company,
      project: input.service,
    });
    if (data?.ok) {
      ctx.handedOff = { reason: String(input.reason || '').slice(0, 300) };
      ctx.opportunityId = data.leadId;
      return 'Passed to the team. Tell the visitor a team member will follow up within one business day.';
    }
    if (data?.reason === 'missing_info') return `Not sent. Still needed: ${(data.missing || []).join(', ')}. Ask for it.`;
    return `That did not go through. Give the visitor ${CHAT_PHONE} and ${CHAT_EMAIL} instead.`;
  }

  return 'Unknown tool.';
}

// ── Model call ──────────────────────────────────────────────────────────

async function callModel(messages, pagePath) {
  const body = {
    model: MODEL,
    max_tokens: 700,
    system: [
      { type: 'text', text: STATIC_PROMPT, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: dynamicPrompt({ pagePath }) },
    ],
    tools: TOOLS,
    messages,
  };
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
    });
    if (res.ok) return res.json();
    if (attempt === 0 && (res.status === 429 || res.status === 529 || res.status >= 500)) {
      await new Promise(r => setTimeout(r, 900));
      continue;
    }
    throw new Error(`model_${res.status}`);
  }
  throw new Error('model_failed');
}

// Brand rule: no dashes used as punctuation, no markdown.
function tidy(text) {
  return String(text || '')
    .replace(/\s*[–—]\s*/g, ', ')
    .replace(/\*\*?|__|`{1,3}/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .trim();
}

// Accepts only plain user/assistant text from the browser and rebuilds a clean
// conversation that starts and ends with the visitor.
function cleanHistory(raw) {
  if (!Array.isArray(raw)) return null;
  let total = 0;
  const out = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') continue;
    const content = m.content.replace(/\r/g, '').trim().slice(0, MAX_MESSAGE_CHARS);
    if (!content) continue;
    if (out.length && out[out.length - 1].role === m.role) {
      out[out.length - 1].content += `\n${content}`; // keep strict alternation
    } else {
      out.push({ role: m.role, content });
    }
    total += content.length;
  }
  while (out.length && out[0].role !== 'user') out.shift();
  if (!out.length || out[out.length - 1].role !== 'user' || total > MAX_TOTAL_CHARS) return null;
  return out;
}

export async function GET() {
  return Response.json({ enabled: configured() }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

export async function POST(request) {
  const reply = (text, extra = {}, status = 200) =>
    Response.json({ reply: text, quickReplies: [], ...extra }, { status, headers: { 'Cache-Control': 'no-store' } });

  if (!configured()) return reply(CHAT_FALLBACK_REPLY, { fallback: true }, 503);
  if (!originAllowed(request)) return Response.json({ error: 'Not allowed.' }, { status: 403 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Bad request.' }, { status: 400 });
  }
  const history = cleanHistory(body?.messages);
  if (!history) {
    return reply('Sorry, that message was too long or could not be read. Could you shorten it and try again?', {}, 400);
  }

  const ctx = {
    ipHash: hashIp(clientIp(request)),
    pagePath: typeof body.pagePath === 'string' ? body.pagePath.slice(0, 200) : '',
    conversationId: null,
    quickReplies: [],
    booked: null,
    handedOff: null,
    opportunityId: null,
  };

  // Rate limit and open (or reuse) the saved transcript.
  const guard = await jobs('guard', {
    ipHash: ctx.ipHash,
    conversationId: body.conversationId,
    visitorId: body.visitorId,
    pagePath: ctx.pagePath,
  });
  if (guard.status === 429) {
    return reply(
      `You have sent a lot of messages in a short time. For anything else, please call ${CHAT_PHONE} or email ${CHAT_EMAIL}.`,
      { rateLimited: true },
      429,
    );
  }
  if (!guard.data?.ok) return reply(CHAT_FALLBACK_REPLY, { fallback: true }, 503);
  ctx.conversationId = guard.data.conversationId;

  let text = '';
  try {
    const messages = history.map(m => ({ role: m.role, content: m.content }));
    for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
      const result = await callModel(messages, ctx.pagePath);
      const toolCalls = (result.content || []).filter(block => block.type === 'tool_use');
      if (result.stop_reason !== 'tool_use' || !toolCalls.length) {
        text = (result.content || []).filter(block => block.type === 'text').map(block => block.text).join('\n');
        break;
      }
      messages.push({ role: 'assistant', content: result.content });
      const results = [];
      for (const call of toolCalls) {
        results.push({ type: 'tool_result', tool_use_id: call.id, content: await runTool(call.name, call.input, ctx) });
      }
      messages.push({ role: 'user', content: results });
    }
  } catch {
    return reply(CHAT_FALLBACK_REPLY, { fallback: true, conversationId: ctx.conversationId }, 502);
  }

  const finalText = tidy(text) || `I want to make sure you get a real answer. Please call ${CHAT_PHONE} or email ${CHAT_EMAIL}.`;

  await jobs(
    'log',
    {
      conversationId: ctx.conversationId,
      messages: [
        { role: 'user', content: history[history.length - 1].content },
        { role: 'assistant', content: finalText },
      ],
      escalated: Boolean(ctx.handedOff),
      escalationReason: ctx.handedOff?.reason,
      opportunityId: ctx.opportunityId,
    },
    4000,
  );

  return reply(finalText, {
    conversationId: ctx.conversationId,
    quickReplies: ctx.quickReplies,
    form: ctx.form || null,
    booked: ctx.booked,
    handedOff: Boolean(ctx.handedOff),
  });
}
