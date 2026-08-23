'use client';
import { useState } from 'react';

const API_URL = 'https://jobs.mcloudconstruction.com/api/public/consultation-request';

export default function ConsultationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'Residential', company: '', project: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'mt-1.5 w-full border border-ink/20 bg-transparent px-4 py-3 font-body text-ink placeholder:text-ink/30 focus:border-brass focus:outline-none';
  const labelClass = 'font-mono text-xs uppercase tracking-[0.15em] text-concrete';

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
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input className={inputClass} value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass}>Email *</label>
        <input required type="email" className={inputClass} value={form.email} onChange={e => update('email', e.target.value)} />
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
