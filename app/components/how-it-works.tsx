const steps = [
  { n: "01", title: "Talk", line: "A short call or WhatsApp chat about how your office works today." },
  { n: "02", title: "Set up", line: "We add your team and help move your existing clients in." },
  { n: "03", title: "Run", line: "Your agents work every client from one place, on desktop or phone." },
];

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="scroll-mt-24 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-5">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2
              id="how-heading"
              className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance"
            >
              From first call to running in days.
            </h2>
          </div>
          <a
            href="#start"
            className="inline-flex min-h-13 flex-none items-center self-start rounded-full bg-brand px-7 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover sm:self-auto"
          >
            Book a demo
          </a>
        </div>
        <ol className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={s.n}
                className={`flex flex-col gap-3 rounded-[28px] border p-7 sm:p-8 ${
                  last ? "border-brand bg-brand text-white" : "border-[#e7e7ef] bg-surface"
                }`}
              >
                {/* the step number, large and quiet */}
                <span
                  className={`mb-8 self-end text-[80px] font-extrabold leading-none tracking-[-0.05em] sm:mb-12 ${
                    last ? "text-white/25" : "text-brand/[0.14]"
                  }`}
                >
                  {s.n}
                </span>
                <h3 className="text-[24px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                <p className={`text-[15px] leading-relaxed sm:text-[16px] ${last ? "text-white/85" : "text-body"}`}>
                  {s.line}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
