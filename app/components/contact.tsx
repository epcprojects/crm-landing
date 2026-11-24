"use client";

// Everything that turns a visitor into a conversation:
// - ContactProvider: lets any section open the talk-to-us sheet
// - ContactSheet: two optional questions, then a WhatsApp message with the answers
// - WhatsAppFloat: the button that stays in the corner while you scroll

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CalendarBlank,
  ChatCircle,
  Check,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig, whatsappLink } from "../site-config";

type ContactApi = { openSheet: (phone?: string) => void };

const ContactContext = createContext<ContactApi>({ openSheet: () => {} });

export function useContact() {
  return useContext(ContactContext);
}

const sizes = ["1–5", "6–15", "16–40", "40+"];
const topics = [
  "Client follow-ups",
  "Agent performance",
  "WhatsApp conversations",
  "Moving our data in",
];

function ContactSheet({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);
  const [size, setSize] = useState(1);
  const [picked, setPicked] = useState<number[]>([0]);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const interests = picked.map((i) => topics[i].toLowerCase());
  const message = [
    "Hi Endpoint Leads, I would like a demo.",
    phone ? `My WhatsApp: +92 ${phone}` : "",
    `Team size: ${sizes[size]} agents`,
    interests.length ? `Interested in: ${interests.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const send = () => {
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(event) => event.stopPropagation()}
        className="sheet-in w-full max-w-[560px] rounded-t-[28px] bg-white p-6 text-ink sm:rounded-[28px] sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e4e0ff] text-[13px] font-extrabold text-[#2f2496]">
            EL
          </span>
          <p className="flex-1 text-[14px] text-body">
            {done ? "Sent to our team" : "Our team is preparing your demo"}
          </p>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border border-black/10 text-ink/70 transition-colors hover:text-ink"
          >
            <X aria-hidden="true" weight="bold" className="size-4" />
          </button>
        </div>

        {!done ? (
          <div className="mt-6 flex flex-col gap-6">
            <h2
              id="sheet-title"
              className="text-[26px] font-extrabold leading-tight tracking-[-0.02em]"
            >
              Two taps to a better demo?
            </h2>
            <fieldset className="flex flex-col gap-2.5">
              <legend className="mb-2.5 text-[14px] font-bold">
                Agents on your team
              </legend>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={i === size}
                    onClick={() => setSize(i)}
                    className={`min-h-12 rounded-xl text-[15px] font-bold transition-colors ${
                      i === size
                        ? "border-2 border-brand bg-[#f2f0ff] text-[#2f2496]"
                        : "border border-black/12 bg-white text-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="flex flex-col">
              <legend className="mb-2.5 text-[14px] font-bold">
                What should we show you?{" "}
                <span className="font-medium text-ink/60">Pick any</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((label, i) => {
                  const on = picked.includes(i);
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setPicked(on ? picked.filter((x) => x !== i) : [...picked, i])
                      }
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[14px] font-semibold transition-colors ${
                        on
                          ? "border-2 border-brand bg-[#f2f0ff] text-[#2f2496]"
                          : "border border-black/12 bg-white text-ink"
                      }`}
                    >
                      {on && <Check aria-hidden="true" weight="bold" className="size-3.5" />}
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={send}
                className="min-h-11 px-2 text-[14px] font-bold text-ink/60 hover:text-ink"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={send}
                className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#25a35a] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#1f8c4d]"
              >
                <WhatsappLogo aria-hidden="true" weight="fill" className="size-5" />
                Send on WhatsApp
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#e8f7ee] text-[#1d7a52]">
                <Check aria-hidden="true" weight="bold" className="size-7" />
              </span>
              <div>
                <h2
                  id="sheet-title"
                  className="text-[26px] font-extrabold leading-tight tracking-[-0.02em]"
                >
                  Got it. We&rsquo;ll be in touch.
                </h2>
                <p className="mt-1 text-[15px] text-body">
                  We usually reply within {siteConfig.replyTime} in working
                  hours.
                </p>
              </div>
            </div>
            <p className="rounded-2xl bg-surface p-4 text-[15px] leading-relaxed">
              <strong>Your demo will cover:</strong>{" "}
              {interests.length ? interests.join(", ") : "a full walkthrough"},
              for a team of {sizes[size]} agents.
            </p>
            <p className="text-[12px] font-extrabold tracking-[0.12em] text-ink/60">
              WHILE YOU WAIT
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="#start"
                onClick={onClose}
                className="flex flex-col gap-2 rounded-2xl border border-black/10 p-4 transition-colors hover:border-brand/40"
              >
                <CalendarBlank aria-hidden="true" weight="bold" className="size-6 text-brand" />
                <strong className="text-[15px]">Pick an exact time</strong>
                <span className="text-[13px] text-body">Skip the back-and-forth.</span>
              </a>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 rounded-2xl border border-black/10 p-4 transition-colors hover:border-[#25a35a]/50"
              >
                <ChatCircle aria-hidden="true" weight="bold" className="size-6 text-[#1d7a52]" />
                <strong className="text-[15px]">Open WhatsApp again</strong>
                <span className="text-[13px] text-body">If the chat didn&rsquo;t open.</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi Endpoint Leads, I have a question.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[#25a35a] py-2 pl-2 pr-5 text-[15px] font-bold text-white shadow-[0_16px_32px_-12px_rgba(37,163,90,0.7)] transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <span className="grid size-10 place-items-center rounded-full bg-white/20">
        <WhatsappLogo aria-hidden="true" weight="fill" className="size-6" />
      </span>
      <span className="hidden sm:inline">WhatsApp us</span>
      <span className="sm:hidden">Chat</span>
    </a>
  );
}

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [sheet, setSheet] = useState<{ phone: string } | null>(null);
  const openSheet = useCallback((phone = "") => setSheet({ phone }), []);
  const close = useCallback(() => setSheet(null), []);

  return (
    <ContactContext.Provider value={{ openSheet }}>
      {children}
      <WhatsAppFloat />
      {sheet && <ContactSheet phone={sheet.phone} onClose={close} />}
    </ContactContext.Provider>
  );
}

/** The +92 number field with a button, used in the hero and the 60-second check. */
export function PhoneCapture({
  cta,
  tone = "light",
}: {
  cta: string;
  tone?: "light" | "dark";
}) {
  const { openSheet } = useContact();
  const [phone, setPhone] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        openSheet(phone.trim());
      }}
      className={`flex w-full flex-col gap-2 rounded-2xl border p-1.5 sm:flex-row ${
        tone === "dark"
          ? "border-black/10 bg-white"
          : "border-black/10 bg-white shadow-[0_20px_40px_-24px_rgba(40,30,120,0.35)]"
      }`}
    >
      <label className="flex min-h-13 flex-1 items-center gap-2 px-4 text-[16px]">
        <span className="font-bold text-ink">+92</span>
        <span className="sr-only">Your WhatsApp number</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="3XX XXXXXXX"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink/40"
        />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover"
      >
        {cta}
      </button>
    </form>
  );
}
