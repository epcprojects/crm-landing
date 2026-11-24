// Small pieces copied in style from the Endpoint Leads dashboard, shared by
// the hero card stream and the product screens: the lead statuses and their
// colours, the stat card with its coloured edge, and the status pill.
// Every name, number and count shown with these is sample data.

import {
  CalendarBlank,
  ChatCircle,
  PaperPlaneTilt,
  PauseCircle,
  Phone,
  SealCheck,
  Trophy,
  UserPlus,
  Wallet,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";

export const statuses = {
  new: { label: "New Lead", color: "#12b76a", pill: "border-[#abefc6] bg-[#ecfdf3] text-[#067647]", icon: UserPlus },
  contacted: { label: "Contacted", color: "#0ba5ec", pill: "border-[#b9e6fe] bg-[#f0f9ff] text-[#026aa2]", icon: Phone },
  qualified: { label: "Qualified", color: "#d444f1", pill: "border-[#f6d0fe] bg-[#fdf4ff] text-[#9f1ab1]", icon: SealCheck },
  visit: { label: "Visit / Meeting Scheduled", color: "#7a5af8", pill: "border-[#d9d6fe] bg-[#f4f3ff] text-[#5925dc]", icon: CalendarBlank },
  quote: { label: "Quotation Sent", color: "#ee46bc", pill: "border-[#fcceee] bg-[#fdf2fa] text-[#c11574]", icon: PaperPlaneTilt },
  nego: { label: "Negotiation / Verbal Commitment", color: "#6172f3", pill: "border-[#c7d7fe] bg-[#eef4ff] text-[#3538cd]", icon: ChatCircle },
  hold: { label: "On-Hold", color: "#f79009", pill: "border-[#fedf89] bg-[#fffaeb] text-[#b54708]", icon: PauseCircle },
  token: { label: "Token Received", color: "#9e77ed", pill: "border-[#e9d7fe] bg-[#f9f5ff] text-[#6941c6]", icon: Wallet },
  won: { label: "Closed - Won", color: "#12b76a", pill: "border-[#abefc6] bg-[#ecfdf3] text-[#067647]", icon: Trophy },
  lost: { label: "Closed - Lost", color: "#f04438", pill: "border-[#fecdca] bg-[#fef3f2] text-[#b42318]", icon: XCircle },
} as const;

export type StatusKey = keyof typeof statuses;

/** The dashboard's stat card: coloured edge, icon, label and a count. */
export function StatCard({
  status,
  count,
  className = "",
}: {
  status: StatusKey;
  count: number;
  className?: string;
}) {
  const s = statuses[status];
  const Icon = s.icon;
  return (
    <div
      className={`relative flex min-w-0 items-center gap-1.5 rounded-lg border border-white/60 bg-white/90 py-2 pl-3 pr-2.5 text-[11px] text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] ${className}`}
    >
      <span
        className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-sm"
        style={{ backgroundColor: s.color }}
      />
      <Icon weight="regular" className="size-3.5 flex-none" style={{ color: s.color }} />
      <span className="min-w-0 flex-1 truncate">{s.label}</span>
      <span className="flex-none text-[12px] font-bold text-[#101828]">{count}</span>
    </div>
  );
}

/** The status pill used in the leads table. */
export function StatusPill({ status, short }: { status: StatusKey; short?: string }) {
  const s = statuses[status];
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium leading-tight ${s.pill}`}>
      {short ?? s.label}
    </span>
  );
}

/** Round initials avatar, as in the Agent and User columns. */
export function Initials({ text, tone = "bg-[#f2f4f7] text-[#344054]", size = "size-7" }: { text: string; tone?: string; size?: string }) {
  return (
    <span className={`grid flex-none place-items-center rounded-full text-[10px] font-semibold ${size} ${tone}`}>
      {text}
    </span>
  );
}
