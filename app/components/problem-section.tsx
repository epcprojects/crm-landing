import { Brain, ChatCircleDots, EyeSlash, Hourglass } from "@phosphor-icons/react/dist/ssr";

const problems = [
  { title: "Clients wait for answers", line: "Nobody is sure whose job it is to reply.", icon: Hourglass },
  { title: "Follow-ups live in heads", line: "Next steps are scattered across chats and memory.", icon: Brain },
  { title: "Deals go quiet", line: "Interested buyers go cold before anyone notices.", icon: ChatCircleDots },
  { title: "No view of your agents", line: "You can’t see who is closing and who needs help.", icon: EyeSlash },
];

export default function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="scroll-mt-24 bg-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-5 py-16 sm:gap-14 sm:px-10 sm:py-24">
        <div className="flex max-w-[46rem] flex-col items-center gap-5 text-center">
          <p className="eyebrow">THE PROBLEM</p>
          <h2
            id="problem-heading"
            className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance"
          >
            Your office is busy.{" "}
            <span className="text-ink/40">Are your clients moving forward?</span>
          </h2>
        </div>
        <ul className="grid w-full gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <li
                key={problem.title}
                className="flex flex-col gap-10 rounded-[28px] border border-[#e7e7ef] bg-white p-6 sm:p-7"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-[#f2f0ff] text-brand">
                  <Icon aria-hidden="true" weight="duotone" className="size-6" />
                </span>
                <div>
                  <h3 className="text-[19px] font-extrabold leading-snug tracking-[-0.01em]">{problem.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{problem.line}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
