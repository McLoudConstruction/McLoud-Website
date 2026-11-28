'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HERO_SCENES } from '@/lib/heroScenes';
import { TAGLINE_COLORS } from '@/components/Tagline';

// Full screen opening section of the home page.
//
// - Stays pinned under the header while the visitor scrolls: the drawing zooms
//   and fills with color, the headline gives way to the tagline, then the rest
//   of the page (.hh-sheet in app/page.js) slides up over it. Scrolling is never
//   taken over; everything just follows the scroll position.
// - A different drawing and headline each time the page is loaded.
// - Reduced motion and very short screens get a still version (app/globals.css).
// - While the two buttons are on screen, <html data-hero-actions> is set so the
//   chat button stays out of their way (components/ChatWidget.js).
const STORAGE_KEY = 'mcloud_hero_scene';
const STILL = '(prefers-reduced-motion: reduce), (max-height: 500px)';

const clamp = v => Math.max(0, Math.min(1, v));
const ease = v => v * v * (3 - 2 * v);
const span = (p, a, b) => ease(clamp((p - a) / (b - a)));
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// ?room=<key> wins (and leaves the rotation alone); otherwise take the next one.
function pickScene() {
  const asked = new URLSearchParams(window.location.search).get('room');
  const wanted = HERO_SCENES.findIndex(s => s.key === (asked === 'commercial' ? 'apartment' : asked));
  if (wanted >= 0) return wanted;
  let next = 0;
  try {
    const last = HERO_SCENES.findIndex(s => s.key === window.localStorage.getItem(STORAGE_KEY));
    next = (last + 1) % HERO_SCENES.length;
    window.localStorage.setItem(STORAGE_KEY, HERO_SCENES[next].key);
  } catch {
    // Storage blocked: always show the first one.
  }
  return next;
}

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const picked = useRef(null);
  const track = useRef(null);
  const scene = HERO_SCENES[index];

  useBrowserLayoutEffect(() => {
    if (picked.current === null) picked.current = pickScene(); // once, even in strict mode
    setIndex(picked.current);
    setReady(true);
  }, []);

  useEffect(() => {
    const root = track.current;
    if (!ready || !root) return undefined;
    const q = sel => root.querySelector(sel);
    const stage = q('.hh-stage');
    const copy = q('.hh-copy');
    const room = q('.hh-room');
    const grid = q('.hh-grid');
    const actions = q('.hh-actions');
    const cue = q('.hh-cue');
    const words = root.querySelectorAll('.hh-tag span');
    const layers = [...root.querySelectorAll('.hh-room g[data-z]')];
    const sheet = document.querySelector('.hh-sheet');
    const header = document.querySelector('header');
    const still = window.matchMedia(STILL);
    let raf = 0;

    // The drawing takes whatever space is left under the words.
    const fit = () => {
      if (header) root.style.setProperty('--hh-header', `${header.offsetHeight}px`);
      room.style.top = window.innerWidth >= 900 ? '' : `${copy.offsetTop + copy.offsetHeight + 14}px`;
    };

    const frame = () => {
      raf = 0;
      const top = header ? header.offsetHeight : 0;
      const box = actions.getBoundingClientRect();
      const covered = !still.matches && sheet && sheet.getBoundingClientRect().top < box.top - 20;
      document.documentElement.toggleAttribute('data-hero-actions', !covered && box.bottom > top);

      if (still.matches) {
        [copy, room, grid, ...words].forEach(el => { el.style.opacity = ''; el.style.transform = ''; });
        copy.style.visibility = '';
        layers.forEach(g => {
          g.removeAttribute('transform');
          g.querySelectorAll('.hh-fill').forEach(f => { f.style.opacity = 1; });
        });
        return;
      }

      const h = stage.offsetHeight;
      const scrolled = top - root.getBoundingClientRect().top;
      const run = root.offsetHeight - 2 * h; // scroll distance for the drawing
      const p = clamp(scrolled / run);
      const cover = clamp((scrolled - run) / h); // next section sliding over
      const out = clamp(p / 0.35);
      const zoom = clamp(p / 0.9);
      const wide = window.innerWidth >= 900;

      copy.style.opacity = 1 - out;
      copy.style.transform = `translateY(${-out * 28}px)`;
      copy.style.visibility = out > 0.99 ? 'hidden' : '';
      grid.style.transform = `translateY(${-p * 50}px) scale(${1 + p * 0.08})`;
      room.style.transform = `translateY(${-zoom * (wide ? 2 : 6) - cover * 60}px) scale(${1 + (wide ? 0 : zoom * 0.07) - cover * 0.08})`;
      layers.forEach((g, i) => {
        const z = Number(g.dataset.z);
        const k = 1 + zoom * z * (wide ? 0.28 : 0.34);
        g.setAttribute('transform', `translate(200 235) scale(${k}) translate(-200 -235) translate(0 ${zoom * z * 14})`);
        g.querySelectorAll('.hh-fill').forEach(f => { f.style.opacity = span(p, 0.02 + i * 0.08, 0.3 + i * 0.12); });
      });
      [[0.22, 0.45], [0.42, 0.68]].forEach(([a, b], i) => {
        const v = span(p, a, b);
        words[i].style.opacity = v;
        words[i].style.transform = `translateX(${(v - 1) * 60}px)`;
      });
      cue.style.visibility = p > 0.03 ? 'hidden' : '';
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onResize = () => { fit(); onScroll(); };
    fit();
    frame();
    document.fonts?.ready.then(onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    still.addEventListener('change', onResize);

    // Accessibility cards rise into place. Hidden only once this script runs.
    let seen;
    if (!still.matches && 'IntersectionObserver' in window) {
      seen = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('hh-in'); seen.unobserve(e.target); }
        }),
        { threshold: 0.2 },
      );
      document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('hh-reveal'); seen.observe(el); });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      still.removeEventListener('change', onResize);
      seen?.disconnect();
      document.documentElement.removeAttribute('data-hero-actions');
    };
  }, [ready, index]);

  const rise = delay => ({ className: 'hh-rise', style: { animationDelay: `${delay}s` } });

  return (
    <section ref={track} className="hh-track" data-ready={ready ? 'true' : 'false'}>
      <div className="hh-stage bg-ink text-paper">
        <div className="hh-grid" aria-hidden="true" />

        <div className="hh-copy">
          <div className="hh-rise" style={{ animationDelay: '.1s' }}>
            <div className="field-stamp text-brass">Kansas City Metro · MO &amp; KS</div>
          </div>
          <h1 className="hh-title font-display font-extrabold uppercase">
            <span {...rise(0.25)} className="hh-rise block">Kansas City&rsquo;s </span>
            <span {...rise(0.37)} className="hh-rise block">{scene.headline[0]} </span>
            <span {...rise(0.49)} className="hh-rise block">{scene.headline[1]}</span>
          </h1>
          <p {...rise(0.7)} className="hh-rise hh-sub font-body text-paper/85">{scene.sub}</p>
        </div>

        <div className="hh-tag font-display font-extrabold uppercase" aria-hidden="true">
          <span className={TAGLINE_COLORS.dark.first}>Built<br />Right.</span>
          <span className={TAGLINE_COLORS.dark.second}>Told<br />Straight.</span>
        </div>

        <div className="hh-room" aria-hidden="true">
          {ready && (
            <svg key={scene.key} viewBox="0 20 400 405" preserveAspectRatio="xMidYMax meet">
              {scene.layers.map((layer, i) => (
                <g key={i} data-z={layer.z}>
                  {layer.s.map(([d, fill, ink, width], j) => (
                    <g key={j} className="hh-shape">
                      {fill && <path d={d} className="hh-fill" style={{ fill }} />}
                      {d.split(/(?=M)/).map((part, n) => (
                        <path
                          key={n}
                          d={part}
                          pathLength="1"
                          className="hh-line"
                          style={{ animationDelay: `${layer.d + j * 0.05 + n * 0.03}s`, stroke: ink, strokeWidth: width }}
                        />
                      ))}
                    </g>
                  ))}
                </g>
              ))}
            </svg>
          )}
        </div>

        <div className="hh-cue" aria-hidden="true" />

        <div {...rise(0.9)} className="hh-rise hh-actions">
          <Link
            href={scene.estimate}
            className="hh-btn hh-btn-main bg-brass font-mono uppercase text-ink transition-opacity hover:opacity-90"
          >
            Request a Free Estimate
          </Link>
          <a
            href={scene.services}
            className="hh-btn border border-paper/35 bg-ink/75 font-mono uppercase text-paper transition-colors hover:border-brass hover:text-brass"
          >
            Services
          </a>
        </div>
      </div>
    </section>
  );
}
