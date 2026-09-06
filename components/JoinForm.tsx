"use client";

import { useState, type FormEvent } from "react";
import type { CampaignContent } from "@/content";
import { CampaignIcon } from "./CampaignIcon";

export function JoinForm({ copy }: { copy: CampaignContent }) {
  const [submitted, setSubmitted] = useState(false);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/supporters', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), phone: data.get('phone') || '', region: data.get('region'), role: data.get('role'), message: data.get('message') || '', consent: data.get('consent') === 'on', locale: copy.lang, website: data.get('website') || '' }),
      });
      if (!response.ok) throw new Error('Registration failed');
      setSubmitted(true);
      form.reset();
    } catch { setError(copy.participation.signupError); }
    finally { setPending(false); }
  }

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <label className="signup-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-grid">
        <label>
          <span>{copy.join.fields.name}</span>
          <input maxLength={120} required name="name" autoComplete="name" />
        </label>
        <label>
          <span>{copy.join.fields.email}</span>
          <input maxLength={254} required name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>{copy.join.fields.phone}</span>
          <input maxLength={40} name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>{copy.join.fields.region}</span>
          <input maxLength={120} required name="region" autoComplete="country-name" />
        </label>
      </div>
      <label>
        <span>{copy.join.fields.role}</span>
        <select required name="role" defaultValue="">
          <option value="" disabled>{copy.lang === "so" ? "Dooro" : "Select one"}</option>
          <option>{copy.lang === "so" ? "Taageero" : "Support the campaign"}</option>
          <option>{copy.lang === "so" ? "Hawlo & munaasabado" : "Activities & events"}</option>
          <option>{copy.lang === "so" ? "Khibrad xirfadeed" : "Professional expertise"}</option>
          <option>{copy.lang === "so" ? "Warbaahin" : "Media enquiry"}</option>
        </select>
      </label>
      <label>
        <span>{copy.join.fields.message}</span>
        <textarea name="message" maxLength={3000} rows={5} />
      </label>
      <label className="consent-row">
        <input required type="checkbox" name="consent" />
        <span>{copy.join.fields.consent}</span>
      </label>
      <button className="button button-yellow form-submit" type="submit" disabled={pending || submitted}>
        {pending ? copy.participation.signupPending : copy.join.fields.submit}
        <CampaignIcon name="arrow" size={18} />
      </button>
      <p className="form-privacy">{copy.participation.privacy}</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      {submitted ? <p className="form-success" role="status">{copy.join.fields.success}</p> : null}
    </form>
  );
}
