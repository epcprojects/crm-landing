"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "../site-config";

const teamSizes = ["2–10", "11–25", "25–50", "50+"];
const totalSteps = 6;

type Answers = {
  businessName: string;
  teamSize: string;
  challenge: string;
  fullName: string;
  phone: string;
  email: string;
};

const initialAnswers: Answers = {
  businessName: "",
  teamSize: "",
  challenge: "",
  fullName: "",
  phone: "",
  email: "",
};

const inputClass =
  "min-h-11 w-full rounded-xl border border-[#dcd8f5] bg-white/85 px-4 text-[14px] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink/35 focus:border-brand/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(73,57,210,0.08)]";

const stepContent = [
  { title: "What is the name of your real estate business?", hint: "This helps us personalise your demo from the start." },
  { title: "How many people handle client enquiries?", hint: "Choose the option that best matches your current team." },
  { title: "What is your biggest business challenge?", hint: "Tell us where managing your real estate business feels hardest." },
  { title: "What is your full name?", hint: "So our team knows who to ask for." },
  { title: "What is the best phone number to reach you?", hint: "We’ll use this number to arrange your free demo." },
  { title: "Lastly, what is your email address?", hint: "We’ll send your demo details and confirmation here." },
];

export default function DemoEnquiryForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [website, setWebsite] = useState("");
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState("");
  const requestIdRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const progress = ((step + 1) / totalSteps) * 100;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      questionRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  const update = (field: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setSubmitError("");
    setSubmittedWhatsAppUrl("");
    requestIdRef.current = "";
  };

  const next = () => {
    if (!formRef.current?.reportValidity()) return;
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < totalSteps - 1) {
      next();
      return;
    }
    if (!formRef.current?.reportValidity()) return;

    const message = [
      "Hi Endpoint Leads, I would like a free demo.",
      "",
      `Real estate business: ${answers.businessName.trim()}`,
      `People handling enquiries: ${answers.teamSize}`,
      `Biggest challenge: ${answers.challenge.trim()}`,
      "",
      `Full name: ${answers.fullName.trim()}`,
      `Phone number: ${answers.phone.trim()}`,
      `Email address: ${answers.email.trim()}`,
    ].join("\n");

    const whatsAppUrl = whatsappLink(message);
    const requestId = requestIdRef.current || crypto.randomUUID();
    requestIdRef.current = requestId;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/demo-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          website,
          requestId,
        }),
      });

      if (!response.ok) {
        throw new Error("The request could not be saved.");
      }

      setSubmittedWhatsAppUrl(whatsAppUrl);
      setSubmitted(true);
      window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    } catch {
      setSubmitError("We couldn’t save your request. Please try again, or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="demo-enquiry"
      className="rise relative z-10 mt-12 w-full max-w-[680px] scroll-mt-28 rounded-[20px] bg-gradient-to-b from-white/80 to-white/0 p-[5px] text-left"
      style={{ animationDelay: "240ms" }}
    >
      <div className="relative rounded-[16px] bg-gradient-to-b from-[#f0e8fc] to-[#f0e8fc]/0 p-4 backdrop-blur sm:p-6">
        <form ref={formRef} onSubmit={submit}>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </label>
          </div>
          <div key={step} ref={questionRef} className="rise">
            <h2 className="max-w-3xl text-[clamp(1.35rem,2.7vw,1.75rem)] leading-[1.18] tracking-[-0.025em] text-ink">{stepContent[step].title}</h2>
            <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-body sm:text-[14px]">{stepContent[step].hint}</p>

            <div className="mt-4">
              {step === 0 && (
                <label className="block">
                  <span className="sr-only">Real estate business name</span>
                  <input type="text" required autoComplete="organization" placeholder="Enter your business name" value={answers.businessName} onChange={(event) => update("businessName", event.target.value)} className={inputClass} />
                </label>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="sr-only">People handling client enquiries</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {teamSizes.map((size) => (
                      <label key={size} className="relative">
                        <input type="radio" name="teamSize" value={size} required checked={answers.teamSize === size} onChange={(event) => update("teamSize", event.target.value)} className="peer sr-only" />
                        <span className="flex min-h-11 items-center justify-center rounded-full border border-[#dcd8f5] bg-white/85 px-3 text-[13px] font-semibold text-ink transition-[border-color,background-color,color,box-shadow] peer-checked:border-brand peer-checked:bg-[#eae6ff] peer-checked:text-brand peer-checked:shadow-[0_0_0_1px_#4939d2] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">{size}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <label className="block">
                  <span className="sr-only">Biggest real estate business challenge</span>
                  <textarea required rows={3} placeholder="Tell us about your biggest challenge" value={answers.challenge} onChange={(event) => update("challenge", event.target.value)} className={`${inputClass} resize-y py-3`} />
                </label>
              )}

              {step === 3 && (
                <label className="block">
                  <span className="sr-only">Full name</span>
                  <input type="text" required autoComplete="name" placeholder="Enter your full name" value={answers.fullName} onChange={(event) => update("fullName", event.target.value)} className={inputClass} />
                </label>
              )}

              {step === 4 && (
                <label className="block">
                  <span className="sr-only">Phone number</span>
                  <input type="tel" required autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" value={answers.phone} onChange={(event) => update("phone", event.target.value)} className={inputClass} />
                </label>
              )}

              {step === 5 && (
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <input type="email" required autoComplete="email" placeholder="you@company.com" value={answers.email} onChange={(event) => update("email", event.target.value)} className={inputClass} />
                </label>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4 border-t border-black/[0.08] pt-4">
            <div className="min-w-0 flex-1 sm:max-w-[260px]">
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button type="button" disabled={submitting} onClick={() => setStep((current) => Math.max(0, current - 1))} className="inline-flex min-h-8 items-center justify-center gap-1 rounded-full px-2 text-[12px] font-bold text-body transition-colors hover:bg-white/70 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50">
                    <ArrowLeft aria-hidden="true" weight="bold" className="size-3.5" /> Back
                  </button>
                )}
                <p className="rounded-full bg-[#eae6ff] px-3 py-1 text-[11px] font-bold text-brand">Step {step + 1} of {totalSteps}</p>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#dedee6]" role="progressbar" aria-label="Form progress" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={step + 1}>
                <span className="block h-full rounded-full bg-gradient-to-r from-[#7667f5] to-brand transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[13px] font-bold text-white shadow-[0_10px_24px_-14px_rgba(73,57,210,0.8)] transition-colors hover:bg-brand-hover disabled:cursor-wait disabled:opacity-65">
              {submitting ? "Saving request…" : step === totalSteps - 1 ? "Send my demo request" : "Continue"}
              <ArrowRight aria-hidden="true" weight="bold" className="size-4" />
            </button>
          </div>

          {submitted && (
            <p role="status" className="mt-5 flex items-center gap-2 rounded-xl bg-[#e9f8ef] px-4 py-3 text-[14px] font-semibold text-[#187347]">
              <CheckCircle aria-hidden="true" weight="fill" className="size-5" />
              <span>
                Your request is saved. WhatsApp should open next. If it doesn’t, {" "}
                <a className="underline underline-offset-2" href={submittedWhatsAppUrl} target="_blank" rel="noreferrer">continue to WhatsApp</a>.
              </span>
            </p>
          )}

          {submitError && (
            <p role="alert" className="mt-5 rounded-xl bg-[#fff1f1] px-4 py-3 text-[14px] font-semibold text-[#9b2c2c]">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
