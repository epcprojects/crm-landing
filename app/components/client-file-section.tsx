import type { CSSProperties } from "react";
import ClientFile from "./client-file";
import RevealRoot from "./reveal-root";

const points = [
  {
    title: "Who the client is",
    line: "Name, city, source, what they want and who owns the lead.",
  },
  {
    title: "What was discussed",
    line: "Every message with the client, with who wrote it and when.",
  },
  {
    title: "What happens next",
    line: "The next step, who owns it and when it is due, so nothing is a guess.",
  },
];

export default function ClientFileSection() {
  return (
    <section
      id="client-file"
      aria-labelledby="client-file-heading"
      className="relative scroll-mt-16 border-t border-black/10 bg-surface py-12 text-ink sm:py-24 lg:py-28"
    >
      <RevealRoot
        className="mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.15}
      >
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            THE FULL PICTURE
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="client-file-heading"
            className="mx-auto mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance"
          >
            <span className="block">Open any client.</span>
            <span className="block text-brand">See the full picture.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-base leading-7 text-body sm:text-lg sm:leading-8">
            Details, conversations and next steps, all on one screen.
          </p>
        </div>

        <ClientFile />

        <ol className="mt-8 grid gap-5 sm:mt-14 sm:gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="reveal"
              style={{ "--d": `${0.5 + index * 0.15}s` } as CSSProperties}
            >
              <p className="flex items-center gap-2.5 text-lg font-extrabold tracking-[-0.015em]">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand font-label text-xs font-medium text-white">
                  {index + 1}
                </span>
                {point.title}
              </p>
              <p className="mt-2 pl-[1.875rem] text-base leading-7 text-body">
                {point.line}
              </p>
            </li>
          ))}
        </ol>
      </RevealRoot>
    </section>
  );
}
