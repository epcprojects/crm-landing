"use client";

// Option 2's users screen, used by a scripted pointer (an arrow on computers,
// a fingertip on phones): it searches for an agent, filters by role from a
// dropdown, and invites a new user, after which Pending Invites goes up by
// one. Rows that are filtered out keep their space, so the card never changes
// height. The shared dashboard screen (home page) is left as it is. Every
// name and email is sample data.

import { useEffect, useRef, useState } from "react";
import { CheckCircle, DotsThreeVertical, EnvelopeSimple, PaperPlaneTilt, Plus, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { Initials } from "../components/dashboard-parts";
import { prefersStill, useHand, useOnScreen, wait } from "./live-demo";
import { BannerStat, DemoSelect, ProjectPill, SearchBox, banner, ghostBtn, initialsOf, primaryBtn, tableCard, th } from "./live-screen-parts";

type Role = "All Roles" | "Agents" | "Viewer";
const roles: Role[] = ["All Roles", "Agents", "Viewer"];

const users: { name: string; email: string; tone: string; role: Exclude<Role, "All Roles">; projects: string[] }[] = [
  { name: "Ali Raza", email: "ali.raza@example.com", tone: "bg-[#e0f2fe] text-[#026aa2]", role: "Agents", projects: ["Bahria Town (Plots)", "Phase 7 Shops"] },
  { name: "Maha Khan", email: "maha.khan@example.com", tone: "bg-[#fce7f6] text-[#c11574]", role: "Agents", projects: ["City Rentals"] },
  { name: "Zoya Ahmed", email: "zoya.ahmed@example.com", tone: "bg-[#d1fadf] text-[#067647]", role: "Agents", projects: ["Tower B (Sales)", "City Rentals"] },
  { name: "Hamza Sheikh", email: "hamza.sheikh@example.com", tone: "bg-[#fef0c7] text-[#b54708]", role: "Agents", projects: ["City Rentals", "Phase 7 Shops"] },
  { name: "Sana Iqbal", email: "sana.iqbal@example.com", tone: "bg-[#ebe9fe] text-[#5925dc]", role: "Viewer", projects: ["Bahria Town (Plots)", "Tower B (Sales)"] },
  { name: "Omar Farooq", email: "omar.farooq@example.com", tone: "bg-[#e0f2fe] text-[#026aa2]", role: "Agents", projects: ["Construction"] },
];

const cols =
  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[minmax(0,1.5fr)_72px_auto] lg:grid-cols-[minmax(0,1.5fr)_72px_minmax(0,2fr)_auto]";
const newEmail = "bilal.ahmed@example.com";

function RolePill({ role }: { role: Exclude<Role, "All Roles"> }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
        role === "Viewer" ? "border-[#99f6e0] bg-[#f0fdf9] text-[#107569]" : "border-[#d9d6fe] bg-[#f4f3ff] text-[#5925dc]"
      }`}
    >
      {role}
    </span>
  );
}

export default function LiveUsersScreen() {
  const root = useRef<HTMLDivElement>(null);
  const running = useOnScreen(root);
  const { make, reset, layer } = useHand();

  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role>("All Roles");
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState<Role | null>(null);
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(1);

  const searchRef = useRef<HTMLSpanElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<Partial<Record<Role, HTMLSpanElement | null>>>({});
  const addRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);

  // the script: search, filter by role, invite someone, repeat
  useEffect(() => {
    const box = root.current;
    if (!box || !running || prefersStill()) return;
    let stop = false;
    const hand = make(box, () => !stop);

    const pick = async (r: Role) => {
      await hand.go(roleRef.current);
      await hand.click();
      if (stop) return;
      setMenu(true);
      await wait(450);
      await hand.go(optionRefs.current[r], 600);
      setHover(r);
      await hand.click();
      if (stop) return;
      setRole(r);
      setMenu(false);
      setHover(null);
    };

    (async () => {
      hand.start();
      await wait(800);
      while (!stop) {
        setPending(1);
        // 1. search for an agent, letter by letter, then clear it
        await hand.go(searchRef.current);
        await hand.click();
        for (const ch of "Maha") {
          if (stop) return;
          setQuery((q) => q + ch);
          await wait(180);
        }
        await wait(1500);
        await hand.go(clearRef.current, 700);
        await hand.click();
        setQuery("");
        await wait(900);

        // 2. show only the viewers, then every role again
        await pick("Viewer");
        await wait(1800);
        await pick("All Roles");
        await wait(900);

        // 3. invite a new agent: type the email and send it
        await hand.go(addRef.current);
        await hand.click();
        if (stop) return;
        setInvite(true);
        await wait(500);
        await hand.go(emailRef.current, 600);
        await hand.click();
        for (let i = 1; i <= newEmail.length; i += 2) {
          if (stop) return;
          setEmail(newEmail.slice(0, i));
          await wait(70);
        }
        setEmail(newEmail);
        await wait(600);
        await hand.go(sendRef.current, 700);
        await hand.click();
        if (stop) return;
        setInvite(false);
        setEmail("");
        setPending(2);
        await wait(2600);
      }
    })();

    return () => {
      stop = true;
      setQuery("");
      setRole("All Roles");
      setMenu(false);
      setHover(null);
      setInvite(false);
      setEmail("");
      setPending(1);
      reset();
    };
  }, [running, make, reset]);

  const rows = users.filter((u) => (!query || u.name.toLowerCase().includes(query.toLowerCase())) && (role === "All Roles" || u.role === role));
  // every user keeps a row; the hidden ones stay below as blank space
  const ordered = [...rows, ...users.filter((u) => !rows.includes(u))];

  return (
    <div ref={root} className="relative flex min-w-0 flex-1 flex-col gap-2">
      <div className={`${banner} flex flex-wrap items-center gap-3`}>
        <span className="grid size-9 flex-none place-items-center rounded-full bg-white text-[#344054] shadow-[0_1px_3px_rgba(16,24,40,0.15)]">
          <UsersThree weight="fill" className="size-4.5" />
        </span>
        <p className="mr-auto text-[18px] text-[#101828]">Users</p>
        <span className="flex flex-wrap gap-1.5">
          <BannerStat label="Total Users" count={12} color="#f04438" />
          <BannerStat label="Active Users" count={11} color="#f79009" />
          <BannerStat label="Pending Invites" count={pending} color="#12b76a" lit={pending > 1} />
          <span className="hidden sm:inline-flex">
            <BannerStat label="External Users" count={0} color="#7a5af8" />
          </span>
        </span>
      </div>

      <div className={tableCard}>
        <div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-[#eaecf0] px-3 py-2">
          <SearchBox query={query} boxRef={searchRef} clearRef={clearRef} className="w-full sm:w-36" />
          <span className="ml-auto hidden items-center gap-1.5 md:flex">
            {["All Invitations", "All Projects"].map((f) => (
              <span key={f} className={`${ghostBtn} w-28 justify-between border-[#d0d5dd]`}>
                {f} <span className="text-[#98a2b3]">⌄</span>
              </span>
            ))}
          </span>
          <DemoSelect
            label="All Roles"
            options={roles}
            value={role}
            open={menu}
            hover={hover}
            buttonRef={roleRef}
            optionRef={(o, el) => {
              optionRefs.current[o] = el;
            }}
            className="w-[92px] flex-none sm:ml-auto md:ml-0"
          />
          <span ref={addRef} className={`${primaryBtn} max-sm:ml-auto`}>
            <Plus weight="bold" className="size-3" />
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add User</span>
          </span>
        </div>
        <div className={`${cols} border-b border-[#eaecf0] bg-[#f9fafb] px-3 py-2 ${th}`}>
          <span>User</span>
          <span className="hidden sm:block">Role</span>
          <span className="hidden lg:block">Assigned Projects</span>
          <span className="text-right">Invitation Status</span>
        </div>
        {ordered.map((u) => {
          const shown = rows.includes(u);
          return (
            <div
              key={u.email}
              aria-hidden={!shown}
              className={`${cols} border-b border-[#f2f4f7] px-3 py-2 text-[11px] last:border-0 ${shown ? "animate-[demo-toast_300ms_ease-out]" : "invisible"}`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Initials text={initialsOf(u.name)} tone={u.tone} size="size-7" />
                <span className="min-w-0">
                  <span className="block truncate font-medium text-[#101828]">{u.name}</span>
                  <span className="block truncate text-[10px] text-[#667085]">{u.email}</span>
                </span>
              </span>
              <span className="hidden sm:block">
                <RolePill role={u.role} />
              </span>
              <span className="hidden min-w-0 flex-wrap gap-1 lg:flex">
                {u.projects.map((p) => (
                  <ProjectPill key={p} name={p} />
                ))}
              </span>
              <span className="flex items-center justify-end gap-2 text-[10px]">
                <span className="hidden items-center gap-1 text-[#12b76a] sm:flex">
                  <CheckCircle className="size-3.5" /> Invite Accepted
                </span>
                <span className="rounded-full border border-[#abefc6] bg-[#ecfdf3] px-2 py-0.5 font-medium text-[#067647]">Active</span>
                <DotsThreeVertical weight="bold" className="size-3.5 text-[#98a2b3]" />
              </span>
            </div>
          );
        })}
      </div>

      {/* the invite form, over a soft backdrop */}
      <div aria-hidden="true" className={`absolute inset-0 z-20 grid place-items-center rounded-xl bg-[#101828]/20 p-3 transition-opacity duration-300 ${invite ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className={`flex w-full max-w-[300px] flex-col gap-2.5 rounded-2xl bg-white p-4 shadow-[0_24px_48px_-16px_rgba(16,24,40,0.45)] transition-[scale,translate] duration-300 ${invite ? "translate-y-0 scale-100" : "translate-y-2 scale-95"}`}>
          <p className="text-[14px] font-semibold text-[#101828]">Invite a user</p>
          <span className="text-[10px] font-medium text-[#344054]">Email</span>
          <span
            ref={emailRef}
            className={`-mt-1.5 flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] ${email ? "border-[#7a5af8] text-[#101828] shadow-[0_0_0_3px_rgba(122,90,248,0.15)]" : "border-[#d0d5dd] text-[#98a2b3]"}`}
          >
            <EnvelopeSimple className="size-3.5 flex-none" />
            <span className="truncate">{email || "name@office.com"}</span>
            {email && <span className="-ml-1 h-3 w-px animate-pulse bg-[#101828]" />}
          </span>
          <span className="flex items-center justify-between text-[11px] text-[#475467]">
            Role <RolePill role="Agents" />
          </span>
          <span ref={sendRef} className={`${primaryBtn} justify-center`}>
            <PaperPlaneTilt weight="fill" className="size-3" /> Send invite
          </span>
        </div>
      </div>

      {/* the arrow on computers, the fingertip on phones */}
      {layer}
    </div>
  );
}
