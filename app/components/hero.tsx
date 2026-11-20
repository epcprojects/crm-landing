import {
  ArrowRight,
  ChartLineUp,
  ChatCircleDots,
  PlayCircle,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";
import DeviceMockup from "./device-mockup";
import Skyline from "./skyline";

const chips = [
  { label: "Client management", Icon: Users },
  { label: "Agent conversations", Icon: ChatCircleDots },
  { label: "Deal visibility", Icon: ChartLineUp },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-wash relative flex flex-col justify-center overflow-hidden pb-36 pt-36 text-ink sm:pb-40 sm:pt-40 lg:min-h-[900px] lg:pb-52 lg:pt-48"
    >
      <Skyline />
      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] items-center gap-16 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 xl:gap-14">
        <div>
          <p className="rise font-label text-xs font-medium tracking-[0.2em] text-brand">
            REAL ESTATE CLIENT &amp; AGENT MANAGEMENT
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[clamp(2.05rem,4.1vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em]"
          >
            {["Every client.", "Every conversation.", "Every next step."].map(
              (line, index) => (
                <span key={line} className="line-mask">
                  <span
                    className="line-in text-ink/90"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ),
            )}
            <span className="line-mask">
              <span className="line-in" style={{ animationDelay: "210ms" }}>
                <span className="underline-draw text-brand">In one place.</span>
              </span>
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-[31rem] text-[17px] leading-[1.75] text-body sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            Manage your real estate clients and agents from one workspace. See{" "}
            <strong className="font-semibold text-ink">
              who spoke to each client
            </strong>
            ,{" "}
            <strong className="font-semibold text-ink">
              what was discussed
            </strong>
            , and{" "}
            <strong className="font-semibold text-ink">
              what needs attention next
            </strong>
            &mdash;without chasing updates.
          </p>

          <div
            className="rise mt-10 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href={siteConfig.demoHref}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#5848e6] to-[#4030c9] py-2 pl-8 pr-2.5 text-[16px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(73,57,210,0.65),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_rgba(73,57,210,0.7),inset_0_1px_0_rgba(255,255,255,0.28)] active:translate-y-0"
            >
              Book a free meeting
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white/30"
              >
                <ArrowRight weight="bold" className="size-[18px]" />
              </span>
            </a>
            <a
              href="#how-it-works"
              className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-black/10 bg-white px-7 text-[16px] font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand active:translate-y-0"
            >
              <PlayCircle
                aria-hidden="true"
                weight="fill"
                className="size-6 text-brand"
              />
              See how it works
            </a>
          </div>

          <ul
            className="rise mt-10 grid max-w-[31rem] grid-cols-3 gap-4 border-t border-black/10 pt-7 text-[14px] font-semibold leading-snug text-ink/80 sm:gap-6"
            style={{ animationDelay: "240ms" }}
          >
            {chips.map(({ label, Icon }) => (
              <li key={label} className="flex flex-col items-start gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
                  <Icon aria-hidden="true" weight="bold" className="size-5" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div id="product" className="scroll-mt-28 lg:-mr-6 xl:-mr-12">
          <DeviceMockup />
        </div>
      </div>
    </section>
  );
}
