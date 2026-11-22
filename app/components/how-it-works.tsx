const steps = [
  { n: "01", title: "Talk", line: "A short call or WhatsApp chat about how your office works today." },
  { n: "02", title: "Set up", line: "We add your team and help move your existing clients in." },
  { n: "03", title: "Run", line: "Your agents work every client from one place, on desktop or phone." },
];

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="scroll-mt-24 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:px-10 sm:py-24">
        <div className="flex flex-col gap-3">
          <p className="font-label text-xs font-medium tracking-[0.2em] text-brand">HOW IT WORKS</p>
          <h2 id="how-heading" className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            From first call to running in days.
          </h2>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-3 rounded-3xl border border-black/[0.07] bg-surface p-7">
              <span className="font-label text-[13px] font-medium text-brand">{s.n}</span>
              <h3 className="text-[22px] font-extrabold">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{s.line}</p>
            </li>
          ))}
        </ol>
        <a
          href="#start"
          className="inline-flex min-h-13 items-center self-start rounded-full bg-brand px-7 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover"
        >
          Book a demo
        </a>
      </div>
    </section>
  );
}
