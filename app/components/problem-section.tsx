const problems = [
  { title: "Clients wait for answers", line: "Nobody is sure whose job it is to reply." },
  { title: "Follow-ups live in heads", line: "Next steps are scattered across chats and memory." },
  { title: "Deals go quiet", line: "Interested buyers go cold before anyone notices." },
  { title: "No view of your agents", line: "You can’t see who is closing and who needs help." },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="scroll-mt-24 border-t border-black/[0.06] bg-white"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:px-10 sm:py-24 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-4 lg:w-[38%]">
          <p className="font-label text-xs font-medium tracking-[0.2em] text-brand">
            THE PROBLEM
          </p>
          <h2
            id="problem-heading"
            className="text-[clamp(1.9rem,3.6vw,2.75rem)] font-extrabold leading-[1.07] tracking-[-0.03em] text-balance"
          >
            Your office is busy. Are your clients moving forward?
          </h2>
        </div>
        <ul className="grid flex-1 gap-4 sm:grid-cols-2">
          {problems.map((problem) => (
            <li
              key={problem.title}
              className="rounded-2xl border border-black/[0.06] bg-surface p-6"
            >
              <h3 className="text-[18px] font-extrabold">{problem.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                {problem.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
