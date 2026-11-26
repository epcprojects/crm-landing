"use client";

// Option 2's "reach us" form: every question on one premium card instead of
// six steps. A glass frame with a soft sky edge, fields with icons and a black
// gradient button. Submissions are saved through the same server-side Google
// Sheets webhook as the home page's step form.
//
// Each field is checked before sending: a missing or wrong answer turns the
// field red with a short note under it, and the cursor jumps to the first one.
// Once sent, the form clears and the result shows in its own popup: a green
// tick when the request is in, an orange alert when we already have it.

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Buildings,
  EnvelopeSimple,
  Phone,
  User,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { siteConfig } from "../site-config";
import DemoResultPopup, { type DemoResult } from "./demo-result";

const teamSizes = ["5–10", "10–25", "25–50", "50+"];

type Answers = { businessName: string; teamSize: string; challenge: string; fullName: string; phone: string; email: string };
type Checked = "businessName" | "fullName" | "phone" | "email" | "challenge";
type Errors = Partial<Record<Checked, string>>;

// the order the cursor visits fields with a problem
const order: Checked[] = ["businessName", "fullName", "phone", "email", "challenge"];

/** What is wrong with each answer, in plain words. Empty when it is fine. */
function check(a: Answers): Errors {
  const e: Errors = {};
  const business = a.businessName.trim();
  if (!business) e.businessName = "Please enter your business name.";
  else if (business.length < 2) e.businessName = "Your business name looks too short.";

  const name = a.fullName.trim();
  if (!name) e.fullName = "Please enter your full name.";
  else if (name.length < 2 || !/\p{L}/u.test(name)) e.fullName = "Please enter your real name.";

  const phone = a.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) e.phone = "Please enter your phone number.";
  else if (/[^\d\s+()-]/.test(phone) || digits.length < 10 || digits.length > 13)
    e.phone = "Enter a valid number, like 0300 1234567.";

  const email = a.email.trim();
  if (!email) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Enter a valid email, like you@office.com.";

  const challenge = a.challenge.trim();
  if (!challenge) e.challenge = "Tell us your biggest challenge, so we can shape your demo.";
  else if (challenge.length < 5) e.challenge = "Add a few more words so we know what to show you.";

  return e;
}

const inputBase =
  "h-12 [@media(min-width:1024px)_and_(max-height:700px)]:!h-11 w-full rounded-2xl border bg-[#f7f8fa] pl-11 pr-4 text-[14px] text-[#111113] transition-[border-color,background-color,box-shadow] placeholder:text-[#111113]/35 focus:bg-white focus:outline-none focus-visible:outline-none";
const fine = "border-black/[0.06] hover:border-black/[0.1] focus:border-[#111113]";
const wrong = "border-[#e5484d] bg-[#fff7f7] shadow-[0_0_0_3px_rgba(229,72,77,0.12)] focus:border-[#e5484d]";

/** The short red note under a field. */
function Problem({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <span id={id} role="alert" className="flex items-center gap-1.5 text-[12px] font-medium text-[#c8323a]">
      <WarningCircle weight="fill" className="size-3.5 flex-none" />
      {text}
    </span>
  );
}

function Field({ label, icon, error, errorId, children }: { label: string; icon: ReactNode; error?: string; errorId: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 [@media(min-width:1024px)_and_(max-height:700px)]:!gap-1 text-[12.5px] font-medium text-[#3d3d44]">
      {label}
      <span className="relative">
        <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${error ? "text-[#e5484d]" : "text-[#8a8a93]"}`}>{icon}</span>
        {children}
      </span>
      <Problem id={errorId} text={error} />
    </label>
  );
}

export default function ReachUsForm({
  id = "demo-enquiry",
  framed = true,
  onClose,
  onResult,
}: {
  /** the form's id; the hero copy keeps "demo-enquiry" */
  id?: string;
  /** false in the popup, where the popup itself is the frame */
  framed?: boolean;
  /** shows a close button in the header (popup only) */
  onClose?: () => void;
  /** the popup passes this to show the result itself; otherwise the form opens its own result popup */
  onResult?: (result: DemoResult) => void;
} = {}) {
  const [a, setA] = useState<Answers>({ businessName: "", teamSize: "5–10", challenge: "", fullName: "", phone: "", email: "" });
  const [result, setResult] = useState<DemoResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [tried, setTried] = useState(false); // after the first send, problems update as you type
  const [errors, setErrors] = useState<Errors>({});
  const [website, setWebsite] = useState("");
  const requestIdRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  /** Clears the form for another request. */
  const startAgain = () => {
    setA({ businessName: "", teamSize: "5–10", challenge: "", fullName: "", phone: "", email: "" });
    setErrors({});
    setTried(false);
    requestIdRef.current = "";
  };

  const set = (k: keyof Answers, v: string) => {
    const next = { ...a, [k]: v };
    setA(next);
    if (tried) setErrors(check(next));
    setSubmitError("");
    requestIdRef.current = "";
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const problems = check(a);
    setTried(true);
    setErrors(problems);
    const first = order.find((k) => problems[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const requestId = requestIdRef.current || crypto.randomUUID();
    requestIdRef.current = requestId;
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/demo-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...a, website, requestId }),
      });
      if (!response.ok) throw new Error("The request could not be saved.");
      const reply = (await response.json()) as { duplicate?: boolean };
      const done: DemoResult = {
        kind: reply.duplicate ? "duplicate" : "saved",
        firstName: a.fullName.trim().split(/\s+/)[0] || "there",
        phone: a.phone.trim(),
        email: a.email.trim(),
      };
      startAgain();
      if (onResult) onResult(done);
      else setResult(done);
    } catch {
      setSubmitError(`We couldn’t send your request just now. Please check your connection and try again, or email us at ${siteConfig.email}.`);
    } finally {
      setSubmitting(false);
    }
  };


  const fieldClass = (k: Checked) => `${inputBase} ${errors[k] ? wrong : fine}`;
  const described = (k: Checked) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${id}-${k}-error` } : {});

  const header = (title: string, line: string, showIcon: boolean) => (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-3.5">
        {/* the clay calendar, in the popup only; above the title on phones */}
        {showIcon && !framed && (
          <Image src="/option-2/demo-calendar.webp" alt="" width={112} height={112} className="size-11 flex-none select-none drop-shadow-[0_8px_12px_rgba(17,17,19,0.18)] sm:size-[52px]" />
        )}
        <div>
          <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.025em] text-[#111113] sm:text-[24px]">{title}</h2>
          <p className="mt-1 text-[13.5px] text-[#5b5b63]">{line}</p>
          {/* on phones the "free" pill sits under the line, so the title keeps the full width */}
          <span className="mt-2.5 inline-flex whitespace-nowrap rounded-full border border-[#c7ecd6] bg-[#effaf3] px-2.5 py-1 text-[11px] font-semibold text-[#1d7a52] sm:hidden">Free · 20 min</span>
        </div>
      </div>
      <span className="flex flex-none items-center gap-2">
        <span className="hidden whitespace-nowrap rounded-full border border-[#c7ecd6] bg-[#effaf3] px-2.5 py-1 text-[11px] font-semibold text-[#1d7a52] sm:inline-flex">Free · 20 min</span>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full border border-black/10 text-[#3d3d44] transition-colors hover:border-[#111113] hover:text-[#111113]"
          >
            <X weight="bold" className="size-4" />
          </button>
        )}
      </span>
    </div>
  );

  const form = (
        <form
          ref={formRef}
          id={id}
          onSubmit={submit}
          noValidate
          className="reach-form flex scroll-mt-28 flex-col gap-5 rounded-[22px] bg-white p-5 shadow-[0_1px_2px_rgba(17,17,19,0.06)] sm:p-7 [@media(min-width:1024px)_and_(min-height:701px)_and_(max-height:820px)]:!gap-4 [@media(min-width:1024px)_and_(max-height:700px)]:!gap-2.5 [@media(min-width:1024px)_and_(max-height:700px)]:!p-5 [@media(min-width:1024px)_and_(min-height:701px)_and_(max-height:820px)]:!p-6"
        >
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </label>
          </div>
          {/* header: who you will talk to */}
          {header("Book your free demo", "A real person from our team will set it up with you.", true)}

          <div className="h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

          {/* a short summary when something needs fixing */}
          {tried && Object.keys(errors).length > 0 && (
            <p className="-my-1 flex items-center gap-2 rounded-xl bg-[#fff1f1] px-3.5 py-2.5 text-[12.5px] font-medium text-[#9b2c2c]">
              <WarningCircle weight="fill" className="size-4 flex-none" />
              {Object.keys(errors).length === 1 ? "One field needs your attention." : `${Object.keys(errors).length} fields need your attention.`} Please check the red fields below.
            </p>
          )}

          <div className="grid gap-3.5 [@media(min-width:1024px)_and_(max-height:700px)]:!gap-2.5 sm:grid-cols-2">
            <Field label="Business name" icon={<Buildings className="size-[18px]" />} error={errors.businessName} errorId={`${id}-businessName-error`}>
              <input name="businessName" autoComplete="organization" value={a.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Skyline Estates" className={fieldClass("businessName")} {...described("businessName")} />
            </Field>
            <Field label="Full name" icon={<User className="size-[18px]" />} error={errors.fullName} errorId={`${id}-fullName-error`}>
              <input name="fullName" autoComplete="name" value={a.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your name" className={fieldClass("fullName")} {...described("fullName")} />
            </Field>
            <Field label="Phone number" icon={<Phone className="size-[18px]" />} error={errors.phone} errorId={`${id}-phone-error`}>
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={a.phone} onChange={(e) => set("phone", e.target.value)} placeholder="03xx xxxxxxx" className={fieldClass("phone")} {...described("phone")} />
            </Field>
            <Field label="Email address" icon={<EnvelopeSimple className="size-[18px]" />} error={errors.email} errorId={`${id}-email-error`}>
              <input name="email" type="email" inputMode="email" autoComplete="email" value={a.email} onChange={(e) => set("email", e.target.value)} placeholder="you@office.com" className={fieldClass("email")} {...described("email")} />
            </Field>
          </div>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="mb-1.5 text-[12.5px] font-medium text-[#3d3d44]">How many people handle client enquiries in your business?</legend>
            <div className="grid grid-cols-4 gap-1 rounded-2xl border border-black/[0.06] bg-[#f7f8fa] p-1">
              {teamSizes.map((size) => (
                <label key={size} className="relative">
                  <input type="radio" name="teamSize" value={size} checked={a.teamSize === size} onChange={(e) => set("teamSize", e.target.value)} className="peer sr-only" />
                  <span className="flex h-10 [@media(min-width:1024px)_and_(max-height:700px)]:!h-9 cursor-pointer items-center justify-center rounded-xl text-[13px] font-medium text-[#3d3d44] transition-all hover:text-[#111113] peer-checked:bg-white peer-checked:text-[#111113] peer-checked:shadow-[0_1px_2px_rgba(17,17,19,0.08),0_6px_14px_-8px_rgba(17,17,19,0.35)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5 text-[12.5px] font-medium text-[#3d3d44]">
            What is your biggest challenge with managing your Real-Estate Business?
            <textarea
              name="challenge"
              rows={3}
              value={a.challenge}
              onChange={(e) => set("challenge", e.target.value)}
              placeholder="Follow-ups get missed, agents reply late…"
              {...described("challenge")}
              className={`w-full resize-none rounded-2xl [@media(min-width:1024px)_and_(min-height:701px)_and_(max-height:820px)]:!h-[64px] [@media(min-width:1024px)_and_(max-height:700px)]:!h-[46px] border bg-[#f7f8fa] px-4 py-3 text-[14px] text-[#111113] transition-[border-color,background-color,box-shadow] placeholder:text-[#111113]/35 focus:bg-white focus:outline-none focus-visible:outline-none ${errors.challenge ? wrong : fine}`}
            />
            <Problem id={`${id}-challenge-error`} text={errors.challenge} />
          </label>

          {/* the send button, on the right */}
          <div className="mt-1 flex justify-center sm:justify-end [@media(min-width:1024px)_and_(max-height:700px)]:!mt-0">
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-[52px] [@media(min-width:1024px)_and_(max-height:700px)]:!h-12 flex-none items-center gap-4 whitespace-nowrap rounded-full bg-gradient-to-b from-[#3a3a44] to-[#0a0a0d] pl-5 pr-1.5 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_28px_-14px_rgba(10,10,13,0.75)] transition-[filter,opacity] hover:brightness-125 disabled:cursor-wait disabled:opacity-65"
            >
              {submitting ? "Sending your request…" : "Book my demo"}
              <span className="grid size-10 place-items-center rounded-full bg-white/12 transition-transform group-hover:translate-x-0.5">
                <ArrowRight weight="bold" className={`size-4 ${submitting ? "motion-safe:animate-pulse" : ""}`} />
              </span>
            </button>
          </div>

          {submitError && (
            <p role="alert" className="flex items-start gap-2 rounded-xl bg-[#fff1f1] px-4 py-3 text-[13px] font-medium leading-snug text-[#9b2c2c]">
              <WarningCircle weight="fill" className="mt-px size-4 flex-none" />
              {submitError}
            </p>
          )}
        </form>
  );

  // the result of a send, in its own popup
  const popup = result && <DemoResultPopup result={result} onClose={() => setResult(null)} />;

  if (!framed)
    return (
      <>
        {form}
        {popup}
      </>
    );
  return (
    // a soft sky-to-white edge around a frosted frame
    <div className="rounded-[30px] bg-[linear-gradient(160deg,rgba(255,255,255,0.95)_0%,rgba(190,218,246,0.9)_45%,rgba(255,255,255,0.7)_100%)] p-[1.5px] shadow-[0_40px_80px_-44px_rgba(25,55,100,0.28),0_16px_32px_-28px_rgba(25,55,100,0.18)]">
      <div className="rounded-[28.5px] bg-white/55 p-2 backdrop-blur-xl">{form}</div>
      {popup}
    </div>
  );
}
