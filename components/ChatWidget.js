'use client';
import { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import {
  CHAT_PHONE_HREF,
  CHAT_GREETING,
  CHAT_STARTERS,
  CHAT_FALLBACK_REPLY,
} from '@/lib/chatConfig';

// The chat assistant on every page: a button in the corner that opens a small
// chat window. It stays hidden until /api/chat reports it is configured, so the
// code can be deployed before the keys are added.
//
// The conversation lives in sessionStorage only, so it survives moving between
// pages but is gone when the visitor closes the tab. Only plain text goes to
// the server; the server decides everything else.

const STORAGE_KEY = 'mcloud_chat_v1';
const TEASER_KEY = 'mcloud_chat_teaser_v1';
const TEASER_TEXT = 'Questions? Magic can help!';
const MAX_INPUT = 1000;

function makeId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

function readSaved() {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.messages)) return saved;
  } catch {
    // Storage unavailable or corrupted: start fresh.
  }
  return null;
}

function writeSaved(value) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private browsing can block storage. The chat still works, it just will not persist.
  }
}

// Turns links, emails and our phone number in a reply into real links. Anything
// else stays plain text, so reply text is never treated as HTML.
const LINK_PATTERN =
  /(https?:\/\/[^\s]+|(?:www\.)?mcloudconstruction\.com(?:\/[^\s]*)?|jobs\.mcloudconstruction\.com(?:\/[^\s]*)?|[\w.+-]+@[\w-]+\.[\w.-]+|\(?816\)?[\s.-]?434[\s.-]?0517)/g;

function linkify(text) {
  const parts = [];
  let last = 0;
  let match;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    let value = match[0];
    // Keep sentence punctuation out of the link.
    const trail = value.match(/[.,;:!?)]+$/);
    if (trail) value = value.slice(0, -trail[0].length);
    if (match.index > last) parts.push(text.slice(last, match.index));
    let href;
    if (/^https?:/.test(value)) href = value;
    else if (value.includes('@')) href = `mailto:${value}`;
    else if (/^\(?816/.test(value)) href = CHAT_PHONE_HREF;
    else href = `https://${value}`;
    parts.push(
      <a key={`${match.index}-${value}`} href={href} className="text-brass underline underline-offset-2 break-words" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {value}
      </a>,
    );
    last = match.index + value.length;
    LINK_PATTERN.lastIndex = last;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// A small form the assistant can ask for instead of typing answers one by one. Each field
// uses the right input type, so a phone shows the number pad for the phone number, the
// email keyboard for the email, and offers to autofill the visitor's saved details.
const FORM_FIELDS = {
  name: { label: 'Full name', type: 'text', autoComplete: 'name', autoCapitalize: 'words', inputMode: 'text', required: true },
  phone: { label: 'Phone number', type: 'tel', autoComplete: 'tel', inputMode: 'tel', required: true, placeholder: '(816) 555-0123' },
  email: { label: 'Email', type: 'email', autoComplete: 'email', inputMode: 'email', autoCapitalize: 'none', required: true },
  address: { label: 'Property address (street and city)', type: 'text', autoComplete: 'street-address', autoCapitalize: 'words', inputMode: 'text', required: true },
  project: { label: 'What would you like done?', type: 'textarea', autoComplete: 'off', required: true, max: 400 },
  company: { label: 'Company', type: 'text', autoComplete: 'organization', autoCapitalize: 'words', inputMode: 'text', required: true },
};

function fieldError(key, value) {
  const v = value.trim();
  if (!v) return 'Required';
  if (key === 'phone' && v.replace(/\D/g, '').length < 10) return 'Enter a 10 digit phone number';
  if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email';
  return '';
}

function ContactForm({ fields, onSubmit, onSkip }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const keys = fields.filter(k => FORM_FIELDS[k]);

  function submit(e) {
    e.preventDefault();
    const found = {};
    for (const k of keys) {
      const err = fieldError(k, values[k] || '');
      if (err) found[k] = err;
    }
    setErrors(found);
    if (Object.keys(found).length) {
      const first = keys.find(k => found[k]);
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    const line = { name: 'Name', phone: 'Phone', email: 'Email', address: 'Property address', project: 'Project', company: 'Company' };
    onSubmit(['Here are my details.', ...keys.map(k => `${line[k]}: ${(values[k] || '').trim()}`)].join('\n'));
  }

  const inputClass = 'w-full rounded-xl border bg-white px-3 py-2.5 font-body text-base leading-snug text-ink placeholder:text-ink/70 focus:border-brass focus:outline-none';

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-ink/10 bg-white p-3.5 shadow-sm">
      <div className="space-y-3">
        {keys.map(k => {
          const f = FORM_FIELDS[k];
          const common = {
            id: `cf-${k}`,
            name: k,
            value: values[k] || '',
            onChange: e => setValues(v => ({ ...v, [k]: f.max ? e.target.value.slice(0, f.max) : e.target.value })),
            autoComplete: f.autoComplete,
            placeholder: f.placeholder,
            'aria-invalid': errors[k] ? 'true' : 'false',
            'aria-describedby': errors[k] ? `cf-${k}-err` : undefined,
            className: `${inputClass} ${errors[k] ? 'border-red-700/70' : 'border-ink/20'}`,
          };
          return (
            <div key={k}>
              <label htmlFor={`cf-${k}`} className="mb-1 block font-body text-sm font-semibold text-ink">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea {...common} rows={3} className={`${common.className} resize-none`} />
              ) : (
                <input {...common} type={f.type} inputMode={f.inputMode} autoCapitalize={f.autoCapitalize} enterKeyHint="next" />
              )}
              {errors[k] && <div id={`cf-${k}-err`} className="mt-1 font-body text-xs text-red-800">{errors[k]}</div>}
            </div>
          );
        })}
      </div>
      <button type="submit" className="mt-3.5 w-full rounded-full bg-brass px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink">
        Send details
      </button>
      <button type="button" onClick={onSkip} className="mt-2 block w-full py-1 text-center font-body text-xs text-ink/75 underline underline-offset-2 hover:text-ink">
        I would rather type it
      </button>
    </form>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { role, content, local? }
  const [quickReplies, setQuickReplies] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [visitorId, setVisitorId] = useState(null);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [teaser, setTeaser] = useState(false);
  const [form, setForm] = useState(null); // { fields: [...] } while the assistant is asking for details
  // How far the visible screen bottom sits above the layout bottom. On phones this is
  // the height of the browser toolbar (or the keyboard), so the chat stays above it.
  const [inset, setInset] = useState(0);
  // The visible screen area and whether we are on a phone-sized screen. On a phone the
  // open chat fills exactly this area, so it stays full screen with the keyboard up.
  const [view, setView] = useState({ top: 0, height: 0 });
  const [phone, setPhone] = useState(false);
  const tallest = useRef(0);

  // Only show the widget when the server says chat is switched on.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/chat')
      .then(r => (r.ok ? r.json() : { enabled: false }))
      .then(d => { if (!cancelled) setEnabled(Boolean(d.enabled)); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const gap = Math.round(window.innerHeight - vv.height - vv.offsetTop);
        setInset(Math.max(0, Math.min(gap, 400)));
        if (vv.height > tallest.current || Math.abs(window.innerWidth - (tallest.w || 0)) > 50) { tallest.current = vv.height; tallest.w = window.innerWidth; }
        setView({ top: Math.round(vv.offsetTop), height: Math.round(vv.height) });
      });
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // While the full screen chat is open on a phone, the page behind it must not scroll.
  useEffect(() => {
    if (!open || !phone) return undefined;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.dataset.chatOpen = 'true';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      delete document.documentElement.dataset.chatOpen;
    };
  }, [open, phone]);

  // The home page hides the button while its hero buttons are on screen. Hold the
  // greeting until the button is showing, so it isn't used up unseen.
  const [held, setHeld] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setHeld(root.hasAttribute('data-hero-actions'));
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(root, { attributes: true, attributeFilter: ['data-hero-actions'] });
    return () => watch.disconnect();
  }, []);

  // A small speech bubble pops up next to the button once per visit to say hello.
  // It never shows again after it is dismissed, clicked, or the chat has been used.
  useEffect(() => {
    if (!enabled || open || held) return undefined;
    let seen = false;
    try { seen = window.sessionStorage.getItem(TEASER_KEY) === '1'; } catch { /* storage blocked */ }
    if (seen || messages.length > 0) return undefined;
    const show = setTimeout(() => setTeaser(true), 3500);
    const hide = setTimeout(() => setTeaser(false), 3500 + 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [enabled, open, held, messages.length]);

  function dismissTeaser() {
    setTeaser(false);
    try { window.sessionStorage.setItem(TEASER_KEY, '1'); } catch { /* storage blocked */ }
  }

  // Restore the conversation after a page change.
  useEffect(() => {
    const saved = readSaved();
    const id = saved?.visitorId || makeId();
    setVisitorId(id);
    if (saved) {
      setMessages(saved.messages);
      setConversationId(saved.conversationId || null);
      setQuickReplies(saved.quickReplies || []);
      setForm(saved.form && Array.isArray(saved.form.fields) ? saved.form : null);
      if (saved.open) setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!visitorId) return;
    writeSaved({ visitorId, conversationId, messages: messages.slice(-40), quickReplies, form, open });
  }, [visitorId, conversationId, messages, quickReplies, form, open]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    if (!sending && el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
    if (input === '' && el.innerText !== '') el.innerText = '';
  }, [input, open, sending]);

  const keyboardUp = phone && view.height > 0 && tallest.current - view.height > 150;

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, sending, open, quickReplies, form, view.height]);

  useEffect(() => {
    // On phones, focusing here would throw the keyboard up the moment the chat opens.
    if (open && !window.matchMedia('(pointer: coarse)').matches) inputRef.current?.focus();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const send = useCallback(
    async rawText => {
      const text = String(rawText || '').trim().slice(0, MAX_INPUT);
      if (!text || sending) return;
      const next = [...messages, { role: 'user', content: text }];
      setMessages(next);
      setInput('');
      setQuickReplies([]);
      setForm(null);
      setSending(true);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: next.filter(m => !m.local).slice(-20).map(m => ({ role: m.role, content: m.content })),
            conversationId,
            visitorId,
            pagePath: pathname,
          }),
        });
        let data = null;
        try { data = await res.json(); } catch { /* not JSON */ }
        const replyText = data?.reply || CHAT_FALLBACK_REPLY;
        if (data?.conversationId) setConversationId(data.conversationId);
        setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
        setQuickReplies(Array.isArray(data?.quickReplies) ? data.quickReplies.slice(0, 6) : []);
        const wanted = Array.isArray(data?.form?.fields) ? data.form.fields.filter(k => FORM_FIELDS[k]).slice(0, 6) : [];
        setForm(wanted.length ? { fields: wanted } : null);
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', content: CHAT_FALLBACK_REPLY }]);
      } finally {
        setSending(false);
      }
    },
    [messages, sending, conversationId, visitorId, pathname],
  );

  // The message box is a plain editable box rather than a text field, so phone browsers
  // do not attach their autofill toolbar (passwords, cards, addresses) above the keyboard.
  function onInputBox(e) {
    const el = e.currentTarget;
    let text = el.innerText.replace(/\u00a0/g, ' ');
    if (!text.trim()) {
      // Browsers leave a stray line break behind once the box is emptied; clear it so the placeholder returns.
      if (el.innerHTML !== '') el.innerHTML = '';
      setInput('');
      return;
    }
    if (text.length > MAX_INPUT) {
      text = text.slice(0, MAX_INPUT);
      el.innerText = text;
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    setInput(text);
  }

  function onPasteBox(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  if (!enabled) return null;

  const shown = [{ role: 'assistant', content: CHAT_GREETING, local: true }, ...messages];
  const showStarters = messages.length === 0;

  return (
    <div className="chat-root print:hidden">
      {!open && (
        <div className="chat-launcher fixed right-5 z-[60] flex flex-col items-end gap-3" style={{ bottom: `calc(1.25rem + ${inset}px)` }}>
          {teaser && (
            <div className="chat-teaser relative max-w-[240px] border border-ink/15 bg-paper py-3 pl-4 pr-9 text-sm font-medium text-ink shadow-xl">
              <button
                type="button"
                onClick={() => { dismissTeaser(); setOpen(true); }}
                className="text-left focus:outline-none focus-visible:underline"
              >
                {TEASER_TEXT}
              </button>
              <button
                type="button"
                onClick={dismissTeaser}
                aria-label="Dismiss"
                className="absolute right-1.5 top-1.5 p-1 text-ink/75 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <span aria-hidden="true" className="absolute -bottom-[7px] right-[22px] h-3 w-3 rotate-45 border-b border-r border-ink/15 bg-paper" />
            </div>
          )}
          <span className="chat-nudge relative block">
            <span aria-hidden="true" className="chat-ring absolute inset-0 rounded-full bg-brass" />
            <button
              ref={buttonRef}
              type="button"
              onClick={() => { dismissTeaser(); setOpen(true); }}
              aria-label="Chat with Magic, the McLoud Construction assistant"
              title="Ask Magic"
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-lg ring-2 ring-paper/80 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-ink"
            >
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </span>
        </div>
      )}

      {open && (
        <section
          role="dialog"
          aria-label="Chat with Magic, the McLoud Construction assistant"
          style={phone && view.height ? { top: `${view.top}px`, height: `${view.height}px` } : undefined}
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-paper shadow-2xl sm:inset-auto sm:bottom-0 sm:right-5 sm:h-[min(540px,calc(100dvh-1.25rem))] sm:w-[350px] sm:rounded-t-2xl sm:ring-1 sm:ring-ink/10"
        >
          <header className={`flex items-center justify-between gap-3 bg-brass px-4 text-ink ${keyboardUp ? 'py-1.5' : 'py-3'}`}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className={`flex items-center justify-center rounded-full bg-ink font-display font-extrabold leading-none text-paper ${keyboardUp ? 'h-7 w-7 text-sm' : 'h-9 w-9 text-lg'}`}>M</span>
              <div>
                <div className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">Magic</div>
                {!keyboardUp && <div className="font-mono text-xs uppercase tracking-[0.1em] text-ink">McLoud Construction</div>}
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="-mr-1 rounded-full p-1.5 text-ink/75 hover:bg-ink/10 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-3.5 py-3.5" aria-live="polite" aria-relevant="additions">
            {shown.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[88%] whitespace-pre-wrap break-words px-3 py-2 font-body text-sm leading-snug ${
                    m.role === 'user' ? 'rounded-2xl rounded-br-md bg-ink text-paper' : 'rounded-2xl rounded-bl-md border border-ink/10 bg-white text-ink shadow-sm'
                  }`}
                >
                  {m.role === 'user' ? m.content : linkify(m.content).map((part, j) => <Fragment key={j}>{part}</Fragment>)}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start" role="status" aria-label="The assistant is typing">
                <div className="rounded-2xl rounded-bl-md border border-ink/10 bg-white px-3.5 py-3 shadow-sm">
                  <span className="inline-flex gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}

            {!sending && form && (
              <ContactForm
                key={form.fields.join(',')}
                fields={form.fields}
                onSubmit={text => send(text)}
                onSkip={() => setForm(null)}
              />
            )}

            {!sending && !form && (showStarters ? CHAT_STARTERS.map(s => ({ label: s, text: s })) : quickReplies).length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(showStarters ? CHAT_STARTERS.map(s => ({ label: s, text: s })) : quickReplies).map(chip => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => send(chip.text)}
                    className="rounded-full border border-brass bg-transparent px-3 py-1.5 font-body text-[13px] text-ink transition-colors hover:bg-brass hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            autoComplete="off"
            onSubmit={e => { e.preventDefault(); send(input); }}
            className={`border-t border-ink/10 bg-paper px-3.5 ${keyboardUp ? 'py-2' : 'py-3'}`}
          >
            <div className="flex items-end gap-2 rounded-[22px] border border-ink/20 bg-white py-1 pl-4 pr-1 focus-within:border-brass">
              <label htmlFor="chat-input" className="sr-only">Your message</label>
              <div
                id="chat-input"
                ref={inputRef}
                role="textbox"
                aria-multiline="true"
                aria-label="Your message"
                aria-disabled={sending}
                contentEditable={sending ? 'false' : 'plaintext-only'}
                suppressContentEditableWarning
                spellCheck
                autoCapitalize="sentences"
                enterKeyHint="send"
                data-placeholder="Type your question"
                onInput={onInputBox}
                onPaste={onPasteBox}
                onKeyDown={onKeyDown}
                className="chat-input max-h-24 min-h-[36px] w-full overflow-y-auto whitespace-pre-wrap break-words bg-transparent py-2 font-body text-base leading-snug text-ink focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass text-ink transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:opacity-40"
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
