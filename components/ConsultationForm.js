'use client';
import { useState, useRef, useEffect } from 'react';
import { readAttribution } from '@/components/AttributionTracker';
import { VERTICALS, VERTICAL_BY_KEY } from '@/lib/verticals';
import { phoneDisplay, phoneHref } from '@/lib/siteConfig';
import {
  PROJECT_OPTIONS,
  PROJECT_BY_VALUE,
  COMMERCIAL_PROJECTS,
  AUDIENCE_OPTIONS,
  AUDIENCE_BY_VALUE,
} from '@/lib/projectOptions';

const API_URL = 'https://jobs.mcloudconstruction.com/api/public/consultation-request';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Commercial-only details, plus "What's the project?" and "Who is it for?".
// They are folded into the existing `project` and `message` fields below, so
// the jobs platform keeps receiving exactly the fields it already expects and
// no database change is needed.
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
    service: '',
    audience: '',
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

  // Preselect the form from where the visitor came from: an explicit
  // ?service= / ?for= on the link they clicked wins, then the service page
  // they last looked at, then the industry page (which means a commercial
  // lead). The URL is read here directly because this effect runs before the
  // tracker's. Attribution itself is read again at submit.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const attribution = readAttribution();
    const fromParam = params.get('service');
    const service = PROJECT_BY_VALUE[fromParam] ? fromParam : PROJECT_BY_VALUE[attribution.service] ? attribution.service : '';
    const forParam = params.get('for');
    const audience = AUDIENCE_BY_VALUE[forParam] ? forParam : '';
    const vertical = params.get('vertical') || attribution.vertical;
    const industryLabel = vertical && vertical !== 'residential' ? VERTICAL_BY_KEY[vertical]?.label || '' : '';

    setForm(prev => {
      if (prev.service) return prev; // the visitor already chose
      const next = { ...prev, audience: prev.audience || audience };
      if (service) {
        next.service = service;
        next.projectType = COMMERCIAL_PROJECTS.includes(service) ? 'Commercial' : 'Residential';
      } else if (industryLabel) {
        next.service = 'commercial';
        next.projectType = 'Commercial';
      }
      if (next.projectType === 'Commercial' && industryLabel && !next.propertyType) next.propertyType = industryLabel;
      return next;
    });
  }, []);

  function updateService(value) {
    setForm(prev => ({
      ...prev,
      service: value,
      // "Something else" keeps whatever Residential/Commercial choice is showing.
      projectType:
        value === 'other' ? prev.projectType : COMMERCIAL_PROJECTS.includes(value) ? 'Commercial' : 'Residential',
    }));
    setFieldErrors(prev => {
      if (!prev.service && !prev.project) return prev;
      const next = { ...prev };
      delete next.service;
      delete next.project;
      return next;
    });
    if (status === 'invalid') setStatus('idle');
  }

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
    if (!form.service) errors.service = 'Choose the closest match.';
    if (form.service === 'other' && !form.project.trim()) errors.project = 'Tell us in a few words what the project is.';
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
      // The project choice goes in the existing `project` field ("Something
      // else" sends what the visitor typed). Who it's for and the commercial
      // details ride along inside the message text.
      const choice = PROJECT_BY_VALUE[form.service];
      const isCommercialLead = form.projectType === 'Commercial';
      // Commercial leads can add a few words of scope, kept with the choice.
      // The text box only shows for commercial and "Something else".
      const scope = isCommercialLead || form.service === 'other' ? form.project.trim() : '';
      const project =
        form.service === 'other' ? scope : choice && scope ? `${choice.label}: ${scope}` : choice?.label || scope;

      let message = form.message.trim();
      const projectDetails = [
        choice && `Project: ${choice.label}${scope ? ` (${scope})` : ''}`,
        !isCommercialLead && form.audience && `Who it's for: ${AUDIENCE_BY_VALUE[form.audience]?.label || form.audience}`,
      ].filter(Boolean);
      if (projectDetails.length) message += `\n\n--- Project details ---\n${projectDetails.join('\n')}`;
      if (isCommercialLead) {
        const details = [
          form.propertyType && `Property type: ${form.propertyType}`,
          form.size.trim() && `Size / scale: ${form.size.trim()}`,
          form.timeline && `Target timeline: ${form.timeline}`,
        ].filter(Boolean);
        if (details.length) message += `\n\n--- Property details ---\n${details.join('\n')}`;
      }

      // Only the fields the jobs platform already accepts are sent.
      const { propertyType, size, timeline, service, audience, ...core } = form;
      const data = new FormData();
      Object.entries({ ...core, project, message }).forEach(([key, value]) => data.append(key, value));
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
    'mt-1.5 w-full border border-ink/50 bg-transparent px-4 py-3 font-body text-ink placeholder:text-ink/70 focus:border-brass focus:outline-none';
  const labelClass = 'block font-body text-base font-semibold text-ink';
  const errorClass = 'mt-1.5 font-body text-sm font-semibold text-red-800';
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
        <label htmlFor="cf-service" className={labelClass}>What&rsquo;s the Project? *</label>
        <select id="cf-service" className={inputClass} value={form.service} onChange={e => updateService(e.target.value)}>
          <option value="">Select one</option>
          {PROJECT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {fieldErrors.service && <p className={errorClass}>{fieldErrors.service}</p>}
      </div>

      {isCommercial && form.service !== 'other' && (
        <div className="mt-6">
          <label htmlFor="cf-project" className={labelClass}>Scope in a Few Words</label>
          <input
            id="cf-project"
            className={inputClass}
            placeholder="e.g. Exterior repaint and rot repair"
            value={form.project}
            onChange={e => update('project', e.target.value)}
          />
        </div>
      )}

      {form.service === 'other' && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-project" className={labelClass}>What Is It? *</label>
            <input
              id="cf-project"
              className={inputClass}
              placeholder="e.g. Deck repair"
              value={form.project}
              onChange={e => update('project', e.target.value)}
            />
            {fieldErrors.project && <p className={errorClass}>{fieldErrors.project}</p>}
          </div>
          <div>
            <label htmlFor="cf-type" className={labelClass}>Home or Business? *</label>
            <select id="cf-type" className={inputClass} value={form.projectType} onChange={e => update('projectType', e.target.value)}>
              {/* The values are what the jobs platform expects; only the labels changed. */}
              <option value="Residential">My home (homeowner)</option>
              <option value="Commercial">A property I manage or own, or a business</option>
            </select>
          </div>
        </div>
      )}

      {!isCommercial && (
        <div className="mt-6">
          <label htmlFor="cf-audience" className={labelClass}>Who Is It For?</label>
          <select id="cf-audience" className={inputClass} value={form.audience} onChange={e => update('audience', e.target.value)}>
            <option value="">Select one</option>
            {AUDIENCE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      )}

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
          className="mt-1.5 w-full border border-ink/50 bg-transparent px-4 py-3 font-body text-sm text-ink file:mr-4 file:border-0 file:bg-brass file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-[0.1em] file:text-ink"
        />
        {photos.length > 0 && (
          <p className="mt-1.5 font-body text-xs text-ink/75">
            {photos.length} photo{photos.length === 1 ? '' : 's'} selected
          </p>
        )}
      </div>

      {status === 'invalid' && (
        <p className="mt-4 font-body text-sm text-brass">
          Please fix the highlighted fields above before sending.
        </p>
      )}

      {status === 'error' && (
        <p className="mt-4 font-body text-sm text-brass">
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
        className="mt-8 w-full bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send Request'}
      </button>
    </form>
  );
}
