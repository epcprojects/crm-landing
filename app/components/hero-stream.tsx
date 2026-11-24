// The hero picture: three tilted rows of cards drifting left to right across
// a vertical brand beam. Left of the beam a card is a blank grey placeholder
// (a client nobody is tracking); as it crosses the beam it becomes a tidy
// client card with a next step and a stage. All names are sample data.
//
// How the change at the beam works: every row is drawn twice, in step. One
// copy shows the blank cards and is clipped to the left half; the other shows
// the real cards and is clipped to the right half.

import { Buildings } from "@phosphor-icons/react/dist/ssr";

type Client = { name: string; note: string; stage: string; tone: string; next: string; avatar: string };

const stageTone = {
  visit: "border-[#cfc8ff] bg-[#f2f0ff] text-[#3a2bbd]",
  fresh: "border-[#dfe1e8] bg-[#f4f5f8] text-[#4b4c58]",
  talk: "border-[#ffd9a8] bg-[#fff5e6] text-[#9a4a00]",
  closed: "border-[#b9e6cb] bg-[#eefaf3] text-[#1d7a52]",
};
const violet = "bg-[#e4e0ff] text-[#2f2496]";

const clients: Client[] = [
  { name: "Usman Tariq", note: "10 marla plot", stage: "Site visit", tone: stageTone.visit, next: "Sat, 11:00", avatar: violet },
  { name: "Sara Khan", note: "Apartment, Tower B", stage: "Negotiating", tone: stageTone.talk, next: "Send price list", avatar: "bg-[#fff1de] text-[#9a4a00]" },
  { name: "Ayesha Malik", note: "Shop, Phase 7", stage: "Site visit", tone: stageTone.visit, next: "Mon, 4:00", avatar: "bg-[#ffe9e6] text-[#b3261e]" },
  { name: "Hina Raza", note: "5 marla house", stage: "New", tone: stageTone.fresh, next: "First call today", avatar: "bg-[#e8f7ee] text-[#1d7a52]" },
  { name: "Bilal Ahmed", note: "Shop, Tower B", stage: "Closed", tone: stageTone.closed, next: "Hand over keys", avatar: violet },
  { name: "Zain Ali", note: "New enquiry", stage: "New", tone: stageTone.fresh, next: "Reply due 6 pm", avatar: violet },
];

/** Each row shows the same six clients starting from a different one. */
const order = (start: number) => clients.map((_, i) => clients[(i + start) % clients.length]);

const rows = [
  { tilt: "-rotate-[5deg]", clients: order(0), delay: "-9s" },
  { tilt: "", clients: order(2), delay: "-27s" },
  { tilt: "rotate-[5deg]", clients: order(4), delay: "-16s" },
];

const shell =
  "flex h-[76px] w-[350px] items-center gap-3 rounded-[18px] border border-[#eceef4] bg-white px-3 shadow-[0_14px_28px_-20px_rgba(21,21,27,0.4)]";

/** A client with no owner and no next step. */
function Blank() {
  return (
    <div className={`${shell} opacity-70`}>
      <span className="size-[52px] flex-none rounded-xl bg-[#eeeff3]" />
      <span className="flex flex-1 flex-col gap-2.5">
        <span className="h-3 w-4/5 rounded-full bg-[#eeeff3]" />
        <span className="h-3 w-1/2 rounded-full bg-[#eeeff3]" />
      </span>
      <span className="flex h-10 w-[96px] flex-none flex-col justify-center gap-2.5 border-l border-[#eceef4] pl-3">
        <span className="h-3 w-full rounded-full bg-[#eeeff3]" />
        <span className="h-3 w-2/3 rounded-full bg-[#eeeff3]" />
      </span>
    </div>
  );
}

function ClientCard({ c }: { c: Client }) {
  return (
    <div className={shell}>
      <span className={`grid size-[52px] flex-none place-items-center rounded-xl text-[18px] font-semibold ${c.avatar}`}>
        {c.name[0]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">{c.name}</span>
        <span className="block truncate text-[12px] text-body">{c.note}</span>
      </span>
      <span className="flex h-10 flex-none flex-col items-end justify-center gap-1.5 border-l border-[#eceef4] pl-3">
        <span className="text-[15px] font-semibold leading-none tracking-[-0.01em] text-brand">{c.next}</span>
        <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold leading-none ${c.tone}`}>{c.stage}</span>
      </span>
    </div>
  );
}

/** The three rows. `blank` draws every card as a placeholder. */
function Rows({ blank }: { blank?: boolean }) {
  return (
    <div className="absolute inset-x-0 top-6 flex flex-col gap-10 sm:top-7 sm:gap-11">
      {rows.map((row, i) => (
        <div key={i} className={`relative h-[76px] ${row.tilt}`}>
          {/* the list is laid out four times; the track slides by half its width and loops */}
          <div className="stream-track absolute left-0 top-0 flex w-max" style={{ animationDelay: row.delay }}>
            {[0, 1, 2, 3].flatMap((copy) =>
              row.clients.map((c) => (
                <div key={`${copy}-${c.name}`} className="pr-5">
                  {blank ? <Blank /> : <ClientCard c={c} />}
                </div>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroStream() {
  return (
    <div aria-hidden="true" className="relative mt-6 h-[400px] w-full overflow-hidden sm:mt-8 sm:h-[450px]">
      {/* a soft grey field behind the cards: centred low and faded out at the
          top and bottom so it has no edge where it meets the white hero */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_58%,#f1f2f7_0%,rgba(241,242,247,0)_100%)] [mask-image:linear-gradient(180deg,transparent_0%,#000_38%,#000_78%,transparent_100%)]" />

      {/* blank cards, left of the beam only */}
      <div className="absolute inset-0 [clip-path:inset(0_50%_0_0)]">
        <Rows blank />
      </div>
      {/* the same cards filled in, right of the beam only */}
      <div className="absolute inset-0 [clip-path:inset(0_0_0_50%)]">
        <Rows />
      </div>

      {/* fade both edges into the page */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0)_18%,rgba(255,255,255,0)_84%,#fff_100%)]" />
      {/* fade the top into the white hero and the bottom into the lavender of the next section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#f1efff]" />

      {/* the beam: fades in at the top and runs straight into the next section */}
      {/* its width follows the same rule as the neck of the dome in the next
          section (16px, growing with the window past 1440px), so the two meet
          with no step */}
      <div className="absolute left-1/2 top-0 h-full w-[max(16px,1.1111vw)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(102,87,240,0)_0%,#6657f0_22%,#4333cc_100%)]" />

      {/* the product, in the middle of it all */}
      <div className="absolute left-1/2 top-[178px] grid size-[92px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[26px] bg-gradient-to-b from-[#8274f7] to-[#4333cc] text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.14),0_26px_44px_-18px_rgba(73,57,210,0.85)] sm:top-[186px] sm:size-[108px]">
        <Buildings weight="fill" className="size-12 sm:size-14" />
      </div>
    </div>
  );
}
