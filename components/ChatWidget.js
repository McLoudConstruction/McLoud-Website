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
  // How far the visible screen bottom sits above the layout bottom. On phones this is
  // the height of the browser toolbar (or the keyboard), so the chat stays above it.
  const [inset, setInset] = useState(0);
  // The visible screen area and whether we are on a phone-sized screen. On a phone the
  // open chat fills exactly this area, so it stays full screen with the keyboard up.
  const [view, setView] = useState({ top: 0, height: 0 });
  const [phone, setPhone] = useState(false);

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
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open, phone]);

  // A small speech bubble pops up next to the button once per visit to say hello.
  // It never shows again after it is dismissed, clicked, or the chat has been used.
  useEffect(() => {
    if (!enabled || open) return undefined;
    let seen = false;
    try { seen = window.sessionStorage.getItem(TEASER_KEY) === '1'; } catch { /* storage blocked */ }
    if (seen || messages.length > 0) return undefined;
    const show = setTimeout(() => setTeaser(true), 3500);
    const hide = setTimeout(() => setTeaser(false), 3500 + 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [enabled, open, messages.length]);

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
      if (saved.open) setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!visitorId) return;
    writeSaved({ visitorId, conversationId, messages: messages.slice(-40), quickReplies, open });
  }, [visitorId, conversationId, messages, quickReplies, open]);

  useEffect(() => {
    const el = inputRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = `${Math.min(el.scrollHeight, 96)}px`; }
  }, [input, open]);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, sending, open, quickReplies]);

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
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', content: CHAT_FALLBACK_REPLY }]);
      } finally {
        setSending(false);
      }
    },
    [messages, sending, conversationId, visitorId, pathname],
  );

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
    <div className="print:hidden">
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
                className="absolute right-1.5 top-1.5 p-1 text-ink/50 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
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

      {/* Phones: a solid layer behind the chat so nothing from the page shows around the
          keyboard's own toolbar. */}
      {open && phone && <div aria-hidden="true" className="fixed inset-0 z-[59] bg-paper" />}

      {open && (
        <section
          role="dialog"
          aria-label="Chat with Magic, the McLoud Construction assistant"
          style={phone && view.height ? { top: `${view.top}px`, height: `${view.height}px` } : undefined}
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-paper shadow-2xl sm:inset-auto sm:bottom-0 sm:right-5 sm:h-[min(540px,calc(100dvh-1.25rem))] sm:w-[350px] sm:rounded-t-2xl sm:ring-1 sm:ring-ink/10"
        >
          <header className="flex items-center justify-between gap-3 bg-brass px-4 py-3 text-ink">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-lg font-extrabold leading-none text-paper">M</span>
              <div>
                <div className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">Magic</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/75">McLoud Construction</div>
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

            {!sending && (showStarters ? CHAT_STARTERS.map(s => ({ label: s, text: s })) : quickReplies).length > 0 && (
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
            className="border-t border-ink/10 bg-paper px-3.5 py-3"
          >
            <div className="flex items-end gap-2 rounded-[22px] border border-ink/20 bg-white py-1 pl-4 pr-1 focus-within:border-brass">
              <label htmlFor="chat-input" className="sr-only">Your message</label>
              <textarea
                id="chat-input"
                name="mcloud-chat-message"
                autoComplete="off"
                enterKeyHint="send"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                ref={inputRef}
                rows={1}
                maxLength={MAX_INPUT}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={sending}
                placeholder="Type your question"
                className="min-h-[36px] w-full resize-none bg-transparent py-2 font-body text-base leading-snug sm:text-sm text-ink placeholder:text-ink/65 focus:outline-none disabled:opacity-60"
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
