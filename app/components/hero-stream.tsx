// The hero picture: three tilted rows of cards drifting left to right across
// a vertical brand beam. Left of the beam a card is a blank grey placeholder
// (a lead nobody is tracking); as it crosses the beam it becomes one of the
// dashboard's own cards: a lead with its project, agent and status, or a
// status count. Everything shown is sample data.
//
// How the change at the beam works: every row is drawn twice, in step. One
// copy shows the blank cards and is clipped to the left half; the other shows
// the real cards and is clipped to the right half.

import { Buildings } from "@phosphor-icons/react/dist/ssr";
import { Initials, StatusPill, statuses, type StatusKey } from "./dashboard-parts";

type Lead = { kind: "lead"; ref: string; title: string; project: string; agent: string; status: StatusKey; short?: string };
type Stat = { kind: "stat"; status: StatusKey; count: number };
type Item = Lead | Stat;

const rows: { tilt: string; delay: string; items: Item[] }[] = [
  {
    tilt: "-rotate-[5deg]",
    delay: "-9s",
    items: [
      { kind: "lead", ref: "EL-1847", title: "10 marla plot, G block", project: "Bahria Town (Plots)", agent: "AR", status: "new" },
      { kind: "stat", status: "contacted", count: 368 },
      { kind: "lead", ref: "EL-1846", title: "Shop for rent, F-10", project: "City Rentals", agent: "MK", status: "visit", short: "Visit Scheduled" },
      { kind: "lead", ref: "EL-1845", title: "2 bed apartment on loan", project: "Tower B (Sales)", agent: "ZA", status: "quote" },
      { kind: "stat", status: "won", count: 12 },
      { kind: "lead", ref: "EL-1844", title: "Studio apartment for rent", project: "City Rentals", agent: "HS", status: "contacted" },
    ],
  },
  {
    tilt: "",
    delay: "-27s",
    items: [
      { kind: "stat", status: "new", count: 36 },
      { kind: "lead", ref: "EL-1843", title: "Commercial space, F-10", project: "City Rentals", agent: "MK", status: "nego", short: "Negotiation" },
      { kind: "lead", ref: "EL-1842", title: "5 marla house", project: "Bahria Town (Plots)", agent: "AR", status: "qualified" },
      { kind: "stat", status: "visit", count: 91 },
      { kind: "lead", ref: "EL-1841", title: "Apartment details, E-11", project: "Tower B (Sales)", agent: "ZA", status: "token" },
      { kind: "lead", ref: "EL-1840", title: "Corner shop, Phase 7", project: "Phase 7 Shops", agent: "HS", status: "won" },
    ],
  },
  {
    tilt: "rotate-[5deg]",
    delay: "-16s",
    items: [
      { kind: "lead", ref: "EL-1839", title: "1 kanal plot", project: "Bahria Town (Plots)", agent: "AR", status: "contacted" },
      { kind: "lead", ref: "EL-1838", title: "Office floor for rent", project: "City Rentals", agent: "MK", status: "hold" },
      { kind: "stat", status: "quote", count: 202 },
      { kind: "lead", ref: "EL-1837", title: "3 bed apartment", project: "Tower B (Sales)", agent: "ZA", status: "new" },
      { kind: "stat", status: "token", count: 4 },
      { kind: "lead", ref: "EL-1836", title: "Shop, ground floor", project: "Phase 7 Shops", agent: "HS", status: "visit", short: "Visit Scheduled" },
    ],
  },
];

const shell =
  "relative flex h-[76px] items-center gap-3 overflow-hidden rounded-[14px] border border-[#eaecf0] bg-white pl-4 pr-3.5 shadow-[0_14px_28px_-20px_rgba(16,24,40,0.45)]";
const widthOf = (item: Item) => (item.kind === "lead" ? "w-[360px]" : "w-[230px]");

/** A lead with no owner and no status yet. */
function Blank({ item }: { item: Item }) {
  return (
    <div className={`${shell} ${widthOf(item)} opacity-70`}>
      <span className="size-10 flex-none rounded-full bg-[#eeeff3]" />
      <span className="flex flex-1 flex-col gap-2.5">
        <span className="h-3 w-4/5 rounded-full bg-[#eeeff3]" />
        <span className="h-3 w-1/2 rounded-full bg-[#eeeff3]" />
      </span>
      {item.kind === "lead" && <span className="h-5 w-[72px] flex-none rounded-full bg-[#eeeff3]" />}
    </div>
  );
}

/** One lead, as a row of the Recent Leads table folded into a card. */
function LeadCard({ lead }: { lead: Lead }) {
  const s = statuses[lead.status];
  return (
    <div className={`${shell} ${widthOf(lead)}`}>
      <span className="absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-r-sm" style={{ backgroundColor: s.color }} />
      <Initials text={lead.agent} size="size-10" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium tracking-[-0.01em] text-[#101828]">{lead.title}</span>
        <span className="block truncate text-[12px] text-[#667085]">
          {lead.ref} · {lead.project}
        </span>
      </span>
      <StatusPill status={lead.status} short={lead.short} />
    </div>
  );
}

/** One status count, as on the dashboard's top panel. */
function StatTile({ stat }: { stat: Stat }) {
  const s = statuses[stat.status];
  const Icon = s.icon;
  return (
    <div className={`${shell} ${widthOf(stat)}`}>
      <span className="absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-r-sm" style={{ backgroundColor: s.color }} />
      <Icon weight="regular" className="size-5 flex-none" style={{ color: s.color }} />
      <span className="min-w-0 flex-1 truncate text-[14px] text-[#344054]">{s.label}</span>
      <span className="flex-none text-[20px] font-bold tracking-[-0.02em] text-[#101828]">{stat.count}</span>
    </div>
  );
}

/** The three rows. `blank` draws every card as a placeholder. */
function Rows({ blank }: { blank?: boolean }) {
  return (
    <div className="absolute inset-x-0 top-[76px] flex flex-col gap-8">
      {rows.map((row, i) => (
        <div key={i} className={`relative h-[76px] ${row.tilt}`}>
          {/* the list is laid out four times; the track slides by half its width and loops */}
          <div className="stream-track absolute left-0 top-0 flex w-max" style={{ animationDelay: row.delay }}>
            {[0, 1, 2, 3].flatMap((copy) =>
              row.items.map((item, n) => (
                <div key={`${copy}-${n}`} className="pr-5">
                  {blank ? <Blank item={item} /> : item.kind === "lead" ? <LeadCard lead={item} /> : <StatTile stat={item} />}
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
    <div aria-hidden="true" className="relative mt-6 h-[390px] w-full overflow-hidden sm:mt-8 sm:h-[445px]">
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

      {/* fade the bottom into the lavender of the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#f1efff]" />

      {/* the beam: fades in at the top and runs straight into the next section.
          Its width follows the same rule as the neck of the dome in the next
          section (16px, growing with the window past 1440px), so the two meet
          with no step */}
      <div className="absolute left-1/2 top-0 h-full w-[max(16px,1.1111vw)] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(102,87,240,0)_0%,#6657f0_22%,#4333cc_100%)]" />

      {/* the product, in the middle of it all */}
      <div className="absolute left-1/2 top-[222px] grid size-[92px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[26px] bg-gradient-to-b from-[#8274f7] to-[#4333cc] text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.14),0_26px_44px_-18px_rgba(73,57,210,0.85)] sm:top-[222px] sm:size-[108px]">
        <Buildings weight="fill" className="size-12 sm:size-14" />
      </div>
    </div>
  );
}
