import Image from "next/image";

const problems = [
  { title: "Clients wait for answers", line: "Nobody is sure whose job it is to reply.", image: "waiting" },
  { title: "Follow-ups live in heads", line: "Next steps are scattered across chats and memory.", image: "notes" },
  { title: "Deals go quiet", line: "Interested buyers go cold before anyone notices.", image: "cold" },
  { title: "No view of your agents", line: "You can’t see who is closing and who needs help.", image: "hidden" },
];

// Two-up cards: the claim at the top, a large illustration underneath
// (generated artwork in /public/illustrations, on white so it blends in).
export default function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24">
        <div className="flex max-w-[44rem] flex-col gap-4">
          <p className="eyebrow">THE PROBLEM</p>
          <h2 id="problem-heading" className="text-[clamp(1.9rem,3.4vw,2.5rem)] leading-[1.3] text-balance">
            Your office is busy.{" "}
            <span className="text-ink/45">Are your clients moving forward?</span>
          </h2>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {problems.map((problem) => (
            <li key={problem.title} className="ds-card flex flex-col overflow-hidden">
              <div className="px-7 pt-8 sm:px-12 sm:pt-12">
                <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] sm:text-[32px]">
                  {problem.title}
                </h3>
                <p className="mt-3 max-w-[26rem] text-[16px] leading-relaxed text-ink/80">{problem.line}</p>
              </div>
              <div className="mt-auto flex justify-center px-6 pb-6 pt-4">
                <Image
                  src={`/illustrations/${problem.image}.png`}
                  alt=""
                  width={1024}
                  height={1024}
                  sizes="(min-width: 768px) 320px, 70vw"
                  className="h-auto w-[260px] mix-blend-multiply [mask-image:radial-gradient(closest-side,#000_80%,transparent)] sm:w-[320px]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
