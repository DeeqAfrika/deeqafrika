"use client";

import { useState, type FormEvent } from "react";
import type { CampaignContent } from "@/content";
import { CampaignIcon } from "./CampaignIcon";

export function JoinForm({ copy }: { copy: CampaignContent }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = copy.lang === "so" ? "Ku biirista ololaha" : "Campaign involvement";
    const body = [
      `${copy.join.fields.name}: ${data.get("name")}`,
      `${copy.join.fields.email}: ${data.get("email")}`,
      `${copy.join.fields.phone}: ${data.get("phone") || "—"}`,
      `${copy.join.fields.region}: ${data.get("region")}`,
      `${copy.join.fields.role}: ${data.get("role")}`,
      "",
      `${copy.join.fields.message}:`,
      `${data.get("message")}`,
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:campaign@deeqafrika.so?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>{copy.join.fields.name}</span>
          <input required name="name" autoComplete="name" />
        </label>
        <label>
          <span>{copy.join.fields.email}</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>{copy.join.fields.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>{copy.join.fields.region}</span>
          <input required name="region" autoComplete="country-name" />
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
        <textarea required name="message" rows={5} />
      </label>
      <label className="consent-row">
        <input required type="checkbox" name="consent" />
        <span>{copy.join.fields.consent}</span>
      </label>
      <button className="button button-yellow form-submit" type="submit">
        {copy.join.fields.submit}
        <CampaignIcon name="arrow" size={18} />
      </button>
      {submitted ? <p className="form-success" role="status">{copy.join.fields.success}</p> : null}
    </form>
  );
}
