"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import { FormEvent, useState } from "react";

type WaitlistFormProps = {
  idPrefix: string;
  location: "hero" | "final";
  compact?: boolean;
};

type FormStatus = "idle" | "submitting" | "qualified" | "complete" | "error";

const revenueOptions = ["Under $50k / month", "$50k–$250k / month", "$250k–$1M / month", "$1M+ / month"];
const skuOptions = ["Under 25", "25–100", "101–500", "500+"];
const painOptions = ["Profit clarity", "Inventory planning", "Traffic & conversion", "Reconciling reports", "Other"];

function getAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    referrer: document.referrer || null,
  };
}

export function WaitlistForm({ idPrefix, location, compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [phase, setPhase] = useState<"email" | "qualification">("email");
  const [message, setMessage] = useState("");

  async function submit(payload: Record<string, unknown>) {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, email, location, ...getAttribution() }),
    });
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
  }

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = new FormData(event.currentTarget);
    if (form.get("companyWebsite")) {
      setStatus("complete");
      return;
    }
    try {
      await submit({ stage: "email" });
      track("waitlist_joined", { location });
      setPhase("qualification");
      setStatus("qualified");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  async function handleQualification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      await submit({
        stage: "qualification",
        revenueBand: form.get("revenueBand"),
        skuBand: form.get("skuBand"),
        primaryPain: form.get("primaryPain"),
        marketplaces: form.getAll("marketplaces"),
        currentTools: form.get("currentTools"),
      });
      track("qualification_completed", { location });
      setStatus("complete");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "complete") {
    return (
      <div className="signup-success" role="status">
        <span><Check aria-hidden="true" /></span>
        <div><b>You’re on the list.</b><p>We’ll reach out as private-beta capacity opens.</p></div>
      </div>
    );
  }

  if (phase === "qualification") {
    return (
      <form className="qualification-form" onSubmit={handleQualification}>
        <div className="qualification-head"><span><Check aria-hidden="true" /></span><div><b>Your spot is saved.</b><p>Four optional details help us prioritize the right beta sellers.</p></div></div>
        <div className="qualification-grid">
          <label htmlFor={`${idPrefix}-revenue`}>Monthly Amazon revenue<select id={`${idPrefix}-revenue`} name="revenueBand" defaultValue=""><option value="">Prefer not to say</option>{revenueOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label htmlFor={`${idPrefix}-skus`}>Active SKU count<select id={`${idPrefix}-skus`} name="skuBand" defaultValue=""><option value="">Prefer not to say</option>{skuOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label htmlFor={`${idPrefix}-pain`}>Biggest pain today<select id={`${idPrefix}-pain`} name="primaryPain" defaultValue=""><option value="">Choose one</option>{painOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label htmlFor={`${idPrefix}-tools`}>Tools you use now<input id={`${idPrefix}-tools`} name="currentTools" placeholder="Sellerboard, spreadsheets…" maxLength={160} /></label>
        </div>
        <fieldset><legend>Marketplaces</legend><label><input type="checkbox" name="marketplaces" value="US" /> US</label><label><input type="checkbox" name="marketplaces" value="CA" /> Canada</label><label><input type="checkbox" name="marketplaces" value="Other" /> Other</label></fieldset>
        <div className="qualification-actions"><button className="button" disabled={status === "submitting"} type="submit">{status === "submitting" ? <><LoaderCircle className="spin" /> Saving</> : <>Help shape SellerIQ <ArrowRight /></>}</button><button className="text-button" type="button" onClick={() => setStatus("complete")}>Skip for now</button></div>
        <p className="form-message" aria-live="polite">{message}</p>
      </form>
    );
  }

  return (
    <form className={compact ? "email-form compact" : "email-form"} onSubmit={handleEmail}>
      <label className="sr-only" htmlFor={`${idPrefix}-email`}>Work email</label>
      <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} />
      <label className="honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
      <button className="button" disabled={status === "submitting"} type="submit">{status === "submitting" ? <><LoaderCircle className="spin" /> Joining</> : <>Join the private beta <ArrowRight /></>}</button>
      <p className="form-message" aria-live="polite">{message}</p>
    </form>
  );
}
