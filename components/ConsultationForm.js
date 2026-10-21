'use client';
import { useState, useRef, useEffect } from 'react';
import { readAttribution } from '@/components/AttributionTracker';
import { VERTICALS, VERTICAL_BY_KEY } from '@/lib/verticals';
import { phoneDisplay, phoneHref } from '@/lib/siteConfig';

const API_URL = 'https://jobs.mcloudconstruction.com/api/public/consultation-request';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Commercial-only details. They are folded into the message text below, so the
// jobs platform keeps receiving exactly the fields it already expects.
const PROPERTY_TYPES = [...VERTICALS.map(v => v.label), 'Other'];
const TIMELINES = ['As soon as possible', 'Within 3 months', '3 to 6 months', '6+ months / planning ahead', 'Not sure yet'];

function formatPhone(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    company: '',
    propertyType: '',
    size: '',
    timeline: '',
    project: '',
    message: '',
    website: '',
  });
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | invalid
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef(null);

  // A visitor who arrived from an industry page is almost certainly a
  // commercial lead, so start the form on Commercial and preselect that
  // industry. Residential is the default for everyone else. Attribution
  // itself is read again at submit.
  useEffect(() => {
    const { vertical } = readAttribution();
    if (vertical && vertical !== 'residential') {
      const label = VERTICAL_BY_KEY[vertical]?.label || '';
      setForm(prev =>
        prev.projectType === 'Residential'
          ? { ...prev, projectType: 'Commercial', propertyType: prev.propertyType || label }
          : prev
      );
    }
  }, []);

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear that field's error (and the general banner) as soon as the
    // visitor starts fixing it, rather than leaving stale errors up until
    // the next submit attempt.
    setFieldErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (status === 'invalid') setStatus('idle');
  }

  function updatePhone(value) {
    update('phone', formatPhone(value));
  }

  function updatePhotos(fileList) {
    setPhotos(Array.from(fileList || []));
  }

  function validate() {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required.';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) errors.phone = 'Enter a valid 10-digit phone number.';
    if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email address (e.g. name@example.com).';
    if (form.projectType === 'Commercial' && !form.company.trim()) errors.company = 'Company is required.';
    if (!form.project.trim()) errors.project = 'This field is required.';
    if (!form.message.trim()) errors.message = 'Please tell us a bit about your project.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      // Native HTML5 validation is turned off on this form (see noValidate
      // below) so these styled, always-shown errors are what the visitor
      // actually sees — the browser's own validation popup used to fire
      // first and swallow the submit before this ran, so an invalid email
      // never showed any message at all.
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      // Commercial details ride along inside the message text.
      let message = form.message.trim();
      if (form.projectType === 'Commercial') {
        const details = [
          form.propertyType && `Property type: ${form.propertyType}`,
          form.size.trim() && `Size / scale: ${form.size.trim()}`,
          form.timeline && `Target timeline: ${form.timeline}`,
        ].filter(Boolean);
        if (details.length) message += `\n\n--- Property details ---\n${details.join('\n')}`;
      }

      const { propertyType, size, timeline, ...core } = form;
      const data = new FormData();
      Object.entries({ ...core, message }).forEach(([key, value]) => data.append(key, value));
      // Where the lead came from. The jobs platform validates and stores these.
      const attribution = readAttribution();
      ['vertical', 'utm_source', 'utm_medium', 'utm_campaign', 'landing_path', 'referrer'].forEach(key => {
        if (attribution[key]) data.append(key, attribution[key]);
      });
      photos.forEach(file => data.append('photos', file));

      // No explicit Content-Type header — the browser sets the multipart
      // boundary itself. Setting it manually here would break the parse
      // on the receiving end.
      const res = await fetch(API_URL, { method: 'POST', body: data });
      if (!res.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'mt-1.5 w-full border border-ink/20 bg-transparent px-4 py-3 font-body text-ink placeholder:text-ink/30 focus:border-brass focus:outline-none';
  const labelClass = 'block font-mono text-xs uppercase tracking-[0.15em] text-concrete';
  const errorClass = 'mt-1.5 font-body text-xs text-rust';
  const isCommercial = form.projectType === 'Commercial';
  const phone = phoneDisplay();

  if (status === 'sent') {
    return (
      <div className="border border-brass/40 bg-paper p-8 text-center">
        <div className="font-display text-2xl font-extrabold uppercase tracking-tight">Request Sent</div>
        <p className="mt-3 font-body text-ink/70">
          Thanks, {form.name.split(' ')[0] || 'there'}. We&rsquo;ll follow up soon to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    // noValidate turns off the browser's own popup-based validation —
    // with it on, an invalid field silently blocked the submit and our
    // own styled error messages below never got a chance to run.
    <form onSubmit={handleSubmit} className="relative" noValidate>
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => update('website', e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name *</label>
          <input id="cf-name" autoComplete="name" className={inputClass} value={form.name} onChange={e => update('name', e.target.value)} />
          {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Phone *</label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            placeholder="(xxx) xxx-xxxx"
            className={inputClass}
            value={form.phone}
            onChange={e => updatePhone(e.target.value)}
          />
          {fieldErrors.phone && <p className={errorClass}>{fieldErrors.phone}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="cf-email" className={labelClass}>Email *</label>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={form.email}
          onChange={e => update('email', e.target.value)}
        />
        {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="cf-type" className={labelClass}>Project Type *</label>
        <select id="cf-type" className={inputClass} value={form.projectType} onChange={e => update('projectType', e.target.value)}>
          <option>Residential</option>
          <option>Commercial</option>
        </select>
      </div>

      {isCommercial && (
        <>
          <div className="mt-6">
            <label htmlFor="cf-company" className={labelClass}>Company *</label>
            <input id="cf-company" autoComplete="organization" className={inputClass} value={form.company} onChange={e => update('company', e.target.value)} />
            {fieldErrors.company && <p className={errorClass}>{fieldErrors.company}</p>}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-property" className={labelClass}>Property Type</label>
              <select id="cf-property" className={inputClass} value={form.propertyType} onChange={e => update('propertyType', e.target.value)}>
                <option value="">Select one</option>
                {PROPERTY_TYPES.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cf-timeline" className={labelClass}>Target Timeline</label>
              <select id="cf-timeline" className={inputClass} value={form.timeline} onChange={e => update('timeline', e.target.value)}>
                <option value="">Select one</option>
                {TIMELINES.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="cf-size" className={labelClass}>Size of Property or Scope</label>
            <input
              id="cf-size"
              className={inputClass}
              placeholder="e.g. 120 units, 4 buildings, or 8,000 sq ft"
              value={form.size}
              onChange={e => update('size', e.target.value)}
            />
          </div>
        </>
      )}

      <div className="mt-6">
        <label htmlFor="cf-project" className={labelClass}>What Are You Working On? *</label>
        <input
          id="cf-project"
          className={inputClass}
          placeholder={isCommercial ? 'e.g. Exterior repaint and rot repair' : 'e.g. Kitchen remodel'}
          value={form.project}
          onChange={e => update('project', e.target.value)}
        />
        {fieldErrors.project && <p className={errorClass}>{fieldErrors.project}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="cf-message" className={labelClass}>Tell Us About Your Project *</label>
        <textarea id="cf-message" rows={5} className={inputClass} value={form.message} onChange={e => update('message', e.target.value)} />
        {fieldErrors.message && <p className={errorClass}>{fieldErrors.message}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="cf-photos" className={labelClass}>Upload Photos</label>
        <input
          id="cf-photos"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={e => updatePhotos(e.target.files)}
          className="mt-1.5 w-full border border-ink/20 bg-transparent px-4 py-3 font-body text-sm text-ink file:mr-4 file:border-0 file:bg-brass file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-[0.15em] file:text-ink"
        />
        {photos.length > 0 && (
          <p className="mt-1.5 font-body text-xs text-ink/60">
            {photos.length} photo{photos.length === 1 ? '' : 's'} selected
          </p>
        )}
      </div>

      {status === 'invalid' && (
        <p className="mt-4 font-body text-sm text-rust">
          Please fix the highlighted fields above before sending.
        </p>
      )}

      {status === 'error' && (
        <p className="mt-4 font-body text-sm text-rust">
          Something went wrong sending your request. Please try again
          {phone ? (
            <>
              , or call us at <a href={phoneHref()} className="underline">{phone}</a>.
            </>
          ) : (
            ', or email info@mcloudconstruction.com.'
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-8 w-full bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send Request'}
      </button>
    </form>
  );
}
