'use client';
import { useState, useRef } from 'react';

const API_URL = 'https://jobs.mcloudconstruction.com/api/public/consultation-request';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatPhone(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ConsultationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'Residential', company: '', project: '', message: '', website: '' });
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef(null);

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
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
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
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
  const labelClass = 'font-mono text-xs uppercase tracking-[0.15em] text-concrete';
  const errorClass = 'mt-1.5 font-body text-xs text-rust';

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
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => update('website', e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input required className={inputClass} value={form.name} onChange={e => update('name', e.target.value)} />
          {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            required
            type="tel"
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
        <label className={labelClass}>Email *</label>
        <input
          required
          type="email"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          className={inputClass}
          value={form.email}
          onChange={e => update('email', e.target.value)}
        />
        {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
      </div>

      <div className="mt-6">
        <label className={labelClass}>Project Type</label>
        <select className={inputClass} value={form.projectType} onChange={e => update('projectType', e.target.value)}>
          <option>Residential</option>
          <option>Commercial</option>
        </select>
      </div>

      {form.projectType === 'Commercial' && (
        <div className="mt-6">
          <label className={labelClass}>Company</label>
          <input className={inputClass} value={form.company} onChange={e => update('company', e.target.value)} />
        </div>
      )}

      <div className="mt-6">
        <label className={labelClass}>Project (a few words)</label>
        <input className={inputClass} placeholder="e.g. Kitchen remodel" value={form.project} onChange={e => update('project', e.target.value)} />
      </div>

      <div className="mt-6">
        <label className={labelClass}>Tell Us About Your Project</label>
        <textarea rows={5} className={inputClass} value={form.message} onChange={e => update('message', e.target.value)} />
      </div>

      <div className="mt-6">
        <label className={labelClass}>Upload Photos</label>
        <input
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

      {status === 'error' && (
        <p className="mt-4 font-body text-sm text-rust">
          Something went wrong sending your request. Please try again, or call us directly.
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
