# CRM Landing Page — Progress

Reset on 2026-11-19: earlier strategy, visual direction and hero were rejected by the owner.

## Workflow (owner's rules)
1. Strategy -> STOP for approval
2. One premium visual direction -> STOP for approval
3. Per section: copy + visual concept -> approval -> implement only that section -> STOP for review
- One section at a time. No redesign of approved sections without permission. No invented features, stats, testimonials or integrations.
- No deploys or dependency installs without approval. Do not touch CRM app code.

## Status
- Step 1 Strategy: APPROVED
- Step 2 Visual direction ("The Site Office"): APPROVED, then re-skinned to the Endpoint Leads palette (owner's choice)
- Hero UX pass (owner asked for more UX/design polish): looser headline tracking; subhead + buttons stacked on the left, proof facts as a 2x2 list on the right (no strip under the frame); hero secondary link changed from "Sign in" to "See how it works" (anchors to the app frame; Sign in stays in the header); notification chips moved onto the toolbar's empty area (xl screens only); logo aligned to the content edge; ruler tied to its label.
- HERO v5 (owner: "needs changes" -> copy, layout, motion; look = LIGHT): hero is now light (pale surface #fafafe, ink text, indigo #4939d2 accents, official DARK logo, brand-indigo button). Copy tightened: eyebrow "CRM FOR REAL-ESTATE SALES TEAMS"; H1 unchanged; subhead "Assign every lead, schedule the next follow-up, and see your team's workload in one place." Motion made snappier (page fully visible < 1.2s, no infinite bobbing); typing indicator in the reply thread; infinite drift only on the soft background glow. Reversed logo no longer used by the hero.
- Hero inspiration pass (owner shared Pipedrive, Attio, monday CRM): centered composition; trust row directly under the buttons (Pipedrive); layered second window showing the open lead's Replies / Internal chat / Timeline over the board (Attio); brighter CTA token `--cta` #5a4bea for buttons on dark; chips removed. Task-chooser idea (monday) parked for the "How a lead moves" section.
- Hero: copy APPROVED. Built, then REDESIGNED after owner said the first layout "looks crap" (stacked headline, full-width app frame). APPROVED by owner (light v5) on 2026-11-19.
- Section 2 (Problem) v3: owner rejected the 3-column before/after vignettes ("don't like this one", "bring some creativity"). Rebuilt around one interactive board (`problem-demo.tsx`): 12 sample leads start scattered, cold-grey and dashed (annotations: whose turn is it? / when is the next step? / who is behind?); on first view, or via the Without/With toggle, they fly into SM/HA/AR owner lanes with due dates and workload bars (5/4/3). Below: 3 compact pain+answer lines. Light theme. v3.1: owner liked it but said "too boxes boxes" -> removed the stage frame, lane panels, per-lead card/badge/chips and pill toggle: now open fading grid, one soft pill per lead, dashed lane dividers, underline text toggle. APPROVED by owner on 2026-11-19.
- Section 3 (How a lead moves): copy + concept APPROVED; BUILT (`pipeline-section.tsx`, `pipeline-route.tsx`; route map, lead pill travels with scroll, 5 stations; section id=`pipeline`). Desktop verified; MOBILE check was interrupted and still pending. Not yet reviewed by owner. May be reworked after the ad-video content below.
- Sections 4-9: not started

## Brand and palette (owner decisions, 2026-11-19)
- Brand is ENDPOINT LEADS (not ELB Marketing). Official logo `public/endpoint-leads-dark.svg`; reversed copy `public/endpoint-leads-reversed.svg` (white wordmark, #7667EE mark) used on dark. Reversed logo still needs owner confirmation.
- Palette (whole page is LIGHT per owner; near-black only for small UI details): indigo + near-black. Tokens in `app/globals.css`: night #0e0e12, paper #f5f5f2, brand #4939d2, brand-hover #5b4be0, accent #8e82f5, mist #c7c8d1.
- Type: Plus Jakarta Sans + JetBrains Mono for drawing-sheet labels (`01 / PIPELINE`). Layout language: drawing-sheet details, mono labels, ruled rows, alternating dark/paper sections, no icon-card grids.
- Motion (Hero): fixed header that shrinks and blurs on scroll; headline lines slide up from a mask; hairline draw under "next step."; indigo aurora drifting behind; drawing grid lights up under the cursor (`hero-glow.tsx`); lead cards drop into columns one by one; owner avatar pulses; two floating notification chips (lead assigned, follow-up due); light sweep on the frame's top edge. All off under reduced motion.

## Hero files
- `app/components/{site-header,hero,hero-glow,app-frame}.tsx`, `app/site-config.ts` (demo + sign-in links), `app/page.tsx`.
- `app-frame.tsx` is a live-HTML SAMPLE of the leads screen (sample data). Replace with a real screenshot when available.

## Approved strategy
- Product: lead + project CRM (UI calls tickets "Leads"). Audience (default, unconfirmed): real-estate / project-based sales teams; secondary: agencies sharing projects with clients.
- One-liner: the lead desk where every lead has an owner, a next step, and a manager who can see it.
- Boundary: manages existing leads; does not generate them.
- Primary CTA: Book a demo. Secondary: Sign in. No pricing section. No testimonials/stats (none exist).
- Sections: 1 Hero · 2 Problem · 3 How a lead moves (pipeline) · 4 One team, one thread · 5 Owner control (analytics + permissions) · 6 Share projects with clients · 7 Everything else (index) · 8 Getting started · 9 FAQ + final CTA
- Verified proof points: custom statuses/priorities, kanban drag, owner + due date, replies + staff-only internal chat, mentions/reactions/voice notes, in-app/email/push alerts, analytics (workload, response time, lead aging, status trends, heatmap, project comparison), granular roles + "only my leads", client users (My Leads / My Projects), contacts with province/city, files, notes, calendar, CSV export, idle logout, mobile layout.

## Pre-launch blockers
- "Book a demo" destination: set `NEXT_PUBLIC_DEMO_URL` (WhatsApp / email / calendar link). Currently `#demo` (goes nowhere).
- Confirm the sign-in URL: `NEXT_PUBLIC_SIGN_IN_URL` defaults to https://endpointclients-crm.vercel.app/login (inherited from the rejected draft, unverified).
- Confirm audience and the reversed logo. Share image (OG) and favicon not done.

## Do NOT market (verified unfinished in CRM code)
Google Calendar sync, project roles, multi-tenant/organizations, CloudFront, contact import/export, offline mode, installable PWA, lead-capture forms, WhatsApp/telephony integrations.

## Style rules learned from owner feedback
- Whole page LIGHT. Avoid "boxes boxes": prefer open space, hairlines, soft pills and text over bordered cards and framed panels.
- Be creative and concrete: show the product doing the thing (sample data), not generic icon-card grids.
- Vague feedback ("needs improvement") -> pick a bolder direction and show it; don't just polish.

## Ad video content (owner shared 2026-11-20; use it to drive landing copy)
Owner: "we made these videos for the ads; make content from them, then landing sections accordingly." Video 2 still to come.

### Video 1 script (Hindi/Urdu, summarized)
- Hook (scene): 4 pm approaching; buyer on the line asks "should I leave to see the plot?"; you are asking your agent what time we gave him. A new lead from an ad is waiting for a payment plan. Whom do you follow up first?
- Insight: the decision is easy when every lead is in one place; open a name and see which agent promised what and whose reply is pending.
- Brand line: "EPC brings you Endpoint Leads." Open any client on the dashboard and the full chat with the agent is there.
- Example: Usman's chat - Ali sent the location but the 4 pm time still needs confirming. Now you know Ali must tell Usman the time and Maha must send Sara the payment plan.
- Proof: the same dashboard shows each agent's deals closed vs slipped away.
- "Works just like WhatsApp": manage all clients and agents in one place from your mobile.
- CTA: click Book Now and book a FREE meeting with the Endpoint Leads team.

### Mapping ideas (draft)
Hero hook = the 4 pm scene; Problem = the call + two pending follow-ups; new section "One chat per lead" (who promised what / what's pending); "Agent scorecard" (closed vs slipped); "From your phone"; final CTA "Book a free meeting". Sample names from the ad: Usman, Ali, Maha, Sara.

### Claims to verify against the CRM before use
- "Just like WhatsApp": there is NO WhatsApp integration; the CRM has chat-style replies per lead + staff-only internal chat. Say "chat-style", not "WhatsApp".
- "Deals closed vs slipped away": closed status + agent analytics exist, but there is no built-in "lost" status (statuses are custom).
- "Leads from ads": contacts have a source field; there is no ad integration or lead-capture form.
- Mobile: responsive layout exists; not an installable app/PWA.
- CTA: "Book Now -> free meeting" answers the open demo-CTA question; still need the booking destination (link / WhatsApp / email).

### Open decisions
- Page language: English (current) vs Roman Urdu/Urdu vs bilingual.
- Endorser branding "EPC brings Endpoint Leads"?

### Video 2 script (Hindi/Urdu, summarized; the ending was cut off at "book a free meeting with the EPC team")
- Hook: the real-estate office is busy, but are clients actually moving forward, or are only calls and messages piling up? Look at one day's updates.
- Agents say "contact made", but one client wants a payment plan and another asks "can I come to see the flat on Sunday?" Both were spoken to, but each now needs a DIFFERENT next job, and that next job can slip out of sight.
- When each client's conversation lives in a different agent's chat, you must keep asking "what did you reply, what's next?" By then the client may be gone.
- So manage all clients and agents from ONE place: every client's full information and what each agent said to each client, visible in ONE click.
- EPC brings Endpoint Leads for exactly this. Use it on computer AND mobile so every client update and every agent conversation is in front of you.
- CTA: book a free meeting with the EPC team.

### Core story across both videos
Busy is not moving. Contact made is not progress. The next step differs per client and gets lost in individual agents' chats. One place, one click: client info + what was said + what is pending. Computer and mobile. Free meeting.

### REVISED section plan (APPROVED by owner 2026-11-20; build one section at a time, copy+concept first)
1 Hero (approved; optional subhead tweak: "Every client, every agent, every conversation in one place, on your computer or phone.")
2 Problem (approved board; swap samples/copy to the ad scene: "contact made" is not progress; two clients, two different next steps; the answer is in someone else's chat)
3 NEW "One click, the whole story": open a client -> profile, thread of who said what (Usman / Ali / Maha / Sara), what is pending, owner, due time
4 NEW "Every agent, one view": workload, response time, closed vs slipped (scorecard)
5 "How a lead moves" (the built route map, moved down)
6 NEW "Computer or phone": responsive views
7 (optional) "Share with clients": client users see only their own projects
8 FAQ + final CTA "Book a free meeting"
Honesty note: only conversations logged on the lead appear in Endpoint Leads; WhatsApp/phone chats are not captured automatically.

### Build order status (after plan approval)
- DONE, APPROVED by owner 2026-11-20: new Section 3 "One click, the whole story" BUILT (`client-file-section.tsx`, `client-file.tsx`): click Usman / Sara / Bilal to open a client file (client, conversation incl. staff-only note, next step) + 3 numbered points + honesty note (only what is written on the lead; phone/WhatsApp not captured). Desktop + mobile verified. Page order now: Hero, Problem, Client file, Route map (renumbered 04).
- Then: new Section 4 (agent scorecard), move the built route map to Section 5, new Section 6 (computer or phone), optional Section 7, Section 8 (FAQ + final CTA). Problem/Hero copy tweaks to the ad scene come as separate small steps.
- Page order in `app/page.tsx` is currently Hero, Problem, Pipeline (route map); reorder when the new sections are built.

### Section 4 "Every agent, one view" - VERIFIED analytics facts (from dashboard-analytics.service.ts)
- Agent leaderboard returns per agent: leads assigned, closed count, close rate (closed / assigned, %), avg + median FIRST RESPONSE minutes (time to first reply); sorted by close rate. "Closed" = statuses the owner flags as closed (customizable).
- SLA/lead aging: open-lead age distribution + team OVERDUE count (open leads past their due date). No built-in "lost" status, so "slipped away" = overdue leads.
- Team views need the view_team_analytics permission; agents see only their own numbers. Filters: date range, project, agent.
- Section 4 copy + concept APPROVED and BUILT (`agent-scorecard-section.tsx`, `agent-scorecard.tsx`; awaiting owner review; desktop + mobile verified; page order now Hero, Problem, Client file, Agent view, Route map renumbered 05): lanes per agent (closed, close-rate bar, first reply), period toggle (This week / This month) that re-sorts the lanes, plus an "Overdue" list of open leads past due. Sample data only.

### Section 4 revision (owner: "needs changes" -> Copy + Visual idea; chose "Agent map")
- Replaced the lanes with an AGENT MAP: close rate (up) vs first-reply minutes (across); dots glide when toggling This week / This month; dashed ring + trail marks where each agent was in the other period; best area = top-left. Team OVERDUE list kept on the right.
- New copy (my pick): H2 "Who's closing? Who's slow to reply?"; sub "Every agent's close rate and first-reply speed on one map, and every lead already past its due date."; points "Who is closing / Who answers fast / What is slipping".
- Desktop + mobile verified. AWAITING OWNER REVIEW.

### Section 4 redesign v3 (owner: "we need to improve visually; currently everything is mixed up")
- The agent map was too cluttered (axes, rings, trails, tint, legend, overdue list, 3 points, notes, lots of tiny mono text). REDESIGNED for hierarchy: three big team numbers (leads closed, average first reply, open leads past due), then two plain columns: "Closed leads, by agent" (20-segment meter + "5 of 14" + first-reply minutes) and "Past their due date" (list). Week/Month toggle updates numbers and meters. Removed the repeated 3-point row; kept one honest note + sample-data line. Same H2 "Who's closing? Who's slow to reply?".
- Desktop (1440) + mobile (390) verified; 1024 checked on the previous version (no overlap). AWAITING OWNER REVIEW.
- Lesson: when the owner says "mixed up", reduce elements and strengthen hierarchy (big numbers first, plain-English headings, fewer mono micro-labels).

### Section 2 redesign (owner sent an annotated screenshot, 2026-11-20): "no tabs; user should understand visually, like a funnel"
- REMOVED the Without/With toggle demo (`problem-demo.tsx` deleted). NEW `problem-flow.tsx`: one static funnel. Left "Without Endpoint Leads": 6 scattered grey pills with "?" owners + two notes. Middle (lg+): SVG funnel narrowing into an "Endpoint Leads" gate and fanning to three rows, with animated dashed flow lines. Right "With Endpoint Leads": owner rows SM/HA/AR with lead counts (5/4/3), workload bars and dated pills (+N more); rows slide in once on view. Phones: stacked (scattered -> arrow -> gate -> arrow -> owner rows). The three pain/answer columns below are unchanged.
- Desktop + mobile verified. AWAITING OWNER REVIEW.

### Section 2 redesign v2 (owner: "looks so much crowded; redesign again, give wow effect")
- Stripped the funnel to its essence in `problem-flow.tsx`: 3 unowned grey pills (left) -> wide SVG funnel (288x380 canvas) with the real reversed logo as the gate -> 3 owner rows with one dated pill each (right). Tokens stream continuously along the paths (SVG animateMotion, hidden under reduced motion); the gate pulses and each owned pill lights up when a lead arrives. Removed: scattered notes, counts, bars, "+N more", the extra pills.
- The three pain lines below were shortened to one line each (no tags/rules): "Every lead gets a named owner." / "Every lead gets a due date." / "See workload, response time and lead aging."
- Desktop + mobile verified. AWAITING OWNER REVIEW.

### Urdu-script originals of both ad scripts (owner pasted 2026-11-20)
Same content as the Hindi-script versions summarized above. Useful Urdu terms: Endpoint Leads = اینڈ پوائنٹ لیڈز; EPC = ای پی سی; Book Now = بُک ناؤ; free meeting = فری میٹنگ; "one click" = ایک ہی کلک; "one place" = ایک ہی جگہ. The audience clearly reads Urdu -> an Urdu (RTL) or bilingual page is a real option. Decision pending (owner never answered the language question).

### Section 2 redesign v3 (owner: "needs changes" -> chose "Chaos to calm (before and after screens)"; problems: too abstract, still crowded)
- Replaced the funnel (SVG tokens etc.) with realistic BEFORE/AFTER SCREENS in `problem-flow.tsx`: LEFT "Without Endpoint Leads" = an agents' chat list (Ali, Usman, Maha, Sara with unread badges, e.g. "It's almost 4. Should I leave?"); CENTER = the Endpoint Leads logo gate (pulse ring, dashed line); RIGHT "With Endpoint Leads" = one clean list: client + next step + owner + due (Usman: Confirm 4 pm / Ali / Today; Sara: Send the payment plan / Maha / Today; Bilal: Confirm the Sunday visit / Ali / Saturday). On view, the right rows slide in and the left card dims. Phones: stacked with a small gate. Three one-line pain statements below (unchanged from v2).
- Desktop + mobile verified. AWAITING OWNER REVIEW.

### ui-ux-pro-max audit (owner asked to use this skill, 2026-11-20)
- Skill script path (the SKILL.md path is wrong, there is no `.claude` folder): `C:/Users/isome/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/rpm/c7614388/f5997a3b/plugin_01KrF8z3ZMp1jHvfpPvkvwiB/skills/ui-ux-pro-max/scripts/search.py`
- Design-system result: pattern "Product Demo + Features" (Hero > product mockup > feature breakdown > comparison optional > CTA) = what we have; style Flat Design (no heavy shadows/gradients, 150-200ms transitions); avoid excessive decoration. Brand colours (Endpoint indigo) kept by owner decision.
- Applied: muted text raised to >= ink/60 (4.5:1); mono labels/chips raised to 12px (avatar initials in small circles left small); all heavy decorative shadows removed (flat); constant animations removed (drifting glow, frame shine, avatar ping) so each view animates 1-2 key things; "before" chat card dimmed less (0.72); pointer cursor on every clickable element (Tailwind v4 default is arrow); reduced-motion already respected everywhere.
- Already compliant: next/font in the root layout, Image width/height, sequential headings, focus-visible ring, 44px touch targets, sticky header CTA.
- Still to build per the plan: "Computer or phone", optional "Share with clients", FAQ + final CTA (use the "Book a free meeting" destination once the owner provides it).

## NEW DIRECTION (owner sent 8 full-page design mockups, 2026-11-20): rebuild the page to match them
Owner answers: colours = **indigo and purple** (official logo palette; recolour the blue designs); process = **one section at a time, stop for approval**; accuracy = **follow the designs exactly** (Tasks/Deals menu items, Online status, property interest, "lost deals" etc. are copied even though they are not all real CRM features; I flagged this over-promises, owner accepted). Page stays LIGHT. Logo = the official Endpoint Leads SVG (mockup logos are AI-made). No photos: flat SVG illustration only.
Open questions (unanswered): "Book a free meeting" destination (`NEXT_PUBLIC_DEMO_URL`, currently `#demo`); page language (English / Urdu RTL / bilingual); sign-in URL (header no longer shows Sign in).

Mockup section order: 1 Hero + nav, 2 Problem ("Your office is busy. But are your clients moving forward?"), 3 Client file ("Open any client. See the full picture."), 4 Conversation ("Know what was discussed. Know what happens next."), 5 Agent performance ("See which agents are closing deals, and which aren't."), 6 Desktop and mobile, 7 How it works + FAQ, 8 Final dark CTA + footer.
Existing sections 2-5 (older concept) stay in the page for now and get replaced one by one as each mockup section is approved.

### Mockup Section 1: nav + hero (built, AWAITING OWNER REVIEW)
- `site-header.tsx`: floating white pill, official logo + "by EPC", links Platform / Features / Agent performance / How it works (anchors #product, #client-file, #agents, #pipeline; hidden under 1024px), indigo "Book a free meeting" button.
- `hero.tsx`: label "REAL ESTATE CLIENT & AGENT MANAGEMENT"; H1 "Every client. Every conversation. Every next step. In one place."; subhead as in the mockup; CTAs "Book a free meeting" + outlined "See how it works"; dot chips Client management / Agent conversations / Deal visibility; lavender wash; skyline of towers (`skyline.tsx`) under a white wave.
- `device-mockup.tsx`: live-HTML laptop (sidebar Dashboard/Clients/Conversations/Tasks/Deals/Agents, client list with statuses, selected client detail + next step) and phone (Usman conversation, Online, next step). All sample data, labelled "ILLUSTRATION USES SAMPLE DATA". Phone alone under 768px.
- Removed: `app-frame.tsx`, `hero-glow.tsx`, `.hero-surface/.aurora/.grid-lit/.header-bar` CSS. Fixed a bug: reduced-motion CSS used `display:none` on the animated hero elements (hid the text); it is now `animation: none`.
- Verified: lint + build pass; 1440 / 820 / 390 viewports, no horizontal overflow. No mobile menu (links hidden under 1024px, CTA stays).

### Mockup Section 1 motion pass (owner: "we need to make it move beautifully", 2026-11-20)
- Entrance: laptop rises and settles (3D-ish), phone springs in after it, laptop sidebar/list/detail rows stagger in, skyline towers grow up one after another.
- Story loop (`device-mockup.tsx`, ~13s): Usman asks "Should I leave to see the plot?" -> Ali typing -> "Checking with the site team." -> typing -> "Confirmed. See you at 4 pm." -> next-step card turns green "DONE" on phone AND laptop, Usman's status becomes "Visit confirmed", last message time updates; then fades and replays. Phone message area is fixed height (no jumping).
- Ambient: phone floats gently; devices follow the pointer and scroll slightly (parallax via CSS vars `--mx --my --sy`); skyline windows twinkle, waves breathe.
- Reduced motion: no animation/parallax, story shown in its final "done" state. Timers cleaned up on unmount.
- Verified: lint + build, loop restarts cleanly (3 cycles observed), 1440 and 390 no overflow.

### Mockup Section 1: APPROVED by owner (2026-11-20), incl. the motion pass.

### Mockup Section 2: problem (built, AWAITING OWNER REVIEW)
- `problem-section.tsx` replaces the old funnel/chat-before-after concept (`problem-flow.tsx` deleted). Centered label "THE PROBLEM"; H2 "Your office is busy. / But are your clients moving forward?"; amber warning pill "2 clients are waiting right now"; two tilted chat cards (Usman: plot enquiry, Sara: apartment) each ending in "No reply for 25 min" / "2 h 10 min" (sample data, labelled); three open columns with drawing icons: "Clients wait for answers" / "Nobody sees what's next" / "Deals quietly slip away"; closing line "Busy isn't the same as moving forward." + link to #client-file.
- Motion (on scroll into view, ~6s sequence): cards enter, messages appear one by one, waiting timers count up (`waiting-timer.tsx`), the warning pings, icons draw themselves, columns and closing line rise. Shared helper `reveal-root.tsx` (IntersectionObserver + `.reveal` / `.draw` CSS + `useSeen()`), reusable for later sections. Reduced motion: everything shown, no animation.
- Copy of the three problems and the closing line is my own wording (the mockup text was not re-read); owner to confirm. Verified desktop + mobile, lint + build pass.

### Mockup Section 2: APPROVED by owner (2026-11-20).

### Mockup Section 3: client file (built, AWAITING OWNER REVIEW)
- `client-file-section.tsx` + `client-file.tsx` rebuilt. Centered label "THE FULL PICTURE"; H2 "Open any client. / See the full picture."; sub "Details, conversations and next steps, all on one screen."
- An app window with a client list (Usman, Sara, Bilal, Hina) and the open client's file: 1 THE CLIENT (status, interested in, city, source, owner), 2 THE CONVERSATION (3 messages), 3 THE NEXT STEP (card + short history timeline). Three numbered points below: Who the client is / What was discussed / What happens next. Sample data, labelled.
- Motion: when in view, a demo cursor glides to the next client and clicks (ripple), the file rebuilds row by row, and it cycles every ~5.6s until the visitor clicks a client (then auto-play stops for good). Reduced motion: no cursor/cycling. Phones: client chips scroll sideways, no cursor.
- Removed the old "only what is written on the lead / WhatsApp not captured" honesty note (owner chose to follow the designs exactly). Verified desktop + mobile (fixed a mobile grid overflow), lint + build pass.

### Mockup Section 3: APPROVED by owner (2026-11-20).

### Mockup Section 4: conversation (built, AWAITING OWNER REVIEW)
- New `conversation-section.tsx` + `conversation-demo.tsx` (id `conversations`), placed after the client file. Label "EVERY CONVERSATION"; H2 "Know what was discussed. / Know what happens next."; sub "Every promise made in a conversation becomes a next step with an owner and a date."
- Two windows side by side: LEFT "Conversation · Sara" (payment plan / Saturday viewing chat), RIGHT "Next steps" (everything coming up). Story loop (~17s): Sara asks -> Maha typing -> answers -> "Next step added: Send the payment plan" pill -> the step slides into the right list and lights up -> second exchange adds "Confirm Saturday viewing" -> the first step ticks to Done (green, struck through, "N open" counter updates) -> fade and replay. Two static rows (Hina, Bilal) fill the list. Sample data, labelled.
- Honest note: "every promise becomes a next step automatically" is the mockup's concept; in the real CRM an agent sets the owner/due date on the lead, it is not auto-detected from chat. Flagged to owner.
- Reduced motion: final state shown. Verified desktop + mobile, loop restart, lint + build pass.
- The old Agent scorecard (04) and Pipeline route (05) sections are still the previous concept and are replaced next (mockup sections 5-8).

### Mockup Section 4: APPROVED by owner (2026-11-20).

### Mockup Section 5: agent performance (built, AWAITING OWNER REVIEW)
- `agent-scorecard-section.tsx` (id `agents`) + new `agent-performance.tsx` replace the old scorecard (`agent-scorecard.tsx` deleted). Label "AGENT PERFORMANCE"; H2 "See which agents are closing deals / and which aren't."; sub "Closed and lost deals and first-reply time for every agent, so you know who needs help."
- One window: This week / This month toggle; three big numbers (deals closed, deals lost, average first reply, weighted by assigned); ranked agent rows (Maha, Ali, Zoya, Hamza) with a close-rate bar, "N of M closed - X%", Lost count, First reply minutes. Status per agent: "Closing well" (indigo bar, green label) vs "Slow to reply"/"Needs attention" (amber row: first reply > 30 min or close rate < 30%). Sample data, labelled.
- Motion: numbers count up and bars fill when in view; toggling the period re-sorts, recounts and re-fills.
- Honest note: the CRM has no built-in "lost" status (closed = statuses flagged closed; lost would need a custom status flagged closed or a lost flag). "Deals lost" follows the mockup; flagged to owner. Verified desktop + mobile, lint + build pass.
- Remaining old section: Pipeline route (05 / HOW A LEAD MOVES) = to be replaced by mockup sections 6-8.

### Mockup Section 5: APPROVED by owner (2026-11-20).

### Mockup Section 6: desktop and mobile (built, AWAITING OWNER REVIEW)
- New `devices-section.tsx` + `device-sync.tsx` (id `devices`), after Agent performance. Label "DESKTOP AND MOBILE"; H2 "At the desk or on site. / Everyone sees the same thing."; sub "Use it on a computer or a phone. Every update shows up for the whole team."
- Visual: manager's laptop ("Team next steps", 4 rows, "N open") <-> a "LIVE/SYNCED" link <-> agent's phone (Usman chat + next step with "Mark as done"). Loop (~12s): a finger taps "Mark as done" on the phone -> card turns DONE -> a dot travels across the link -> the laptop row ticks, counter drops, toast "Ali marked this done" -> fade, replay. Phones/tablets: stacked vertically with a vertical link. Three short points below: On the desktop / On the phone / Always in sync. Sample data, labelled.
- Honest note: the CRM web app is responsive, but there is no separate native mobile app; "phone" here means the web app in a phone browser. Flagged to owner. Reduced motion: final state shown. Verified desktop + mobile, lint + build pass.
- Remaining old section: Pipeline route (05 / HOW A LEAD MOVES) -> replaced by mockup sections 7 (how it works + FAQ) and 8 (final CTA + footer).

### Mockup Section 6: APPROVED by owner (2026-11-20).

### Mockup Section 7: how it works + FAQ (built, AWAITING OWNER REVIEW)
- New `how-it-works-section.tsx` (id `how-it-works`, bg-surface) + `faq.tsx`. The old Pipeline route section (`pipeline-section.tsx`, `pipeline-route.tsx`, route CSS) is DELETED; hero "See how it works" and the nav "How it works" now point to `#how-it-works`.
- How it works: label "HOW IT WORKS"; H2 "Simple to start. / Clear from day one."; three numbered steps joined by a line that draws itself (vertical rail on phones): 1 Add your clients, 2 Keep every conversation together, 3 Always know what's next, each with a small chip.
- FAQ ("Questions, answered." + "Book a free meeting" button) with an accessible animated accordion (first item open): Who is it for / Can agents use it on phones (browser, nothing to install) / Can I see how each agent is doing / Can my team talk privately about a client (staff-only internal chat; clients see only their own projects) / How do we get started (free meeting, pricing and setup discussed in the meeting). Answers kept to verified facts; no pricing or integration claims.
- Reduced motion: line shown, no animation. Verified desktop + mobile, accordion toggles, lint + build pass.
- Left: mockup section 8 (final dark CTA + footer). Some unused legacy CSS (card-in, window-in, row-line, cell-in, gate-ring) can be pruned in the final polish pass.

### Mockup Section 7: APPROVED by owner (2026-11-20).

### Mockup Section 8: final dark CTA + footer (built, AWAITING OWNER REVIEW). ALL 8 MOCKUP SECTIONS NOW BUILT.
- New `final-cta-section.tsx` (id `demo`, night background with an indigo glow) and `site-footer.tsx`. Label "READY WHEN YOU ARE"; H2 "See every client, every conversation, every next step. In one place."; sub "Book a free meeting and we will show you how Endpoint Leads fits your real estate team."; white "Book a free meeting" button with a soft breathing ring; three reassurance dots (short free meeting / shown with your own team in mind / pricing and setup explained); a dark skyline whose towers grow up when scrolled into view and windows twinkle (`Skyline` got `dark` and `onView` props).
- Footer: reversed logo + "by EPC", nav links, Sign in (URL still unconfirmed), "(c) 2026 Endpoint Leads by EPC".
- `demoHref` is still `#demo`, so all "Book a free meeting" buttons currently scroll to this section. Set `NEXT_PUBLIC_DEMO_URL` (WhatsApp/calendar/email link) to make them real.
- Page metadata (title/description) updated to the new messaging. Verified desktop + mobile, lint + build pass.

### Final page order
Hero -> Problem -> Client file -> Conversation -> Agent performance -> Desktop and mobile -> How it works + FAQ -> Final CTA -> Footer.
### Still open before launch
Meeting link (NEXT_PUBLIC_DEMO_URL), page language (English/Urdu RTL/bilingual), sign-in URL, OG image/favicon, mobile nav menu (links hidden under 1024px), real accessibility/Lighthouse pass, prune unused legacy CSS, and nothing in this repo is committed or deployed.

### Mockup Section 8: APPROVED by owner (2026-11-20). ALL 8 SECTIONS APPROVED. Page build complete pending the launch checklist above (meeting link, language, sign-in URL, OG image/favicon, mobile menu, a11y/Lighthouse pass, CSS prune, commit/deploy on owner's go-ahead).
- Removed all 'ILLUSTRATION USES SAMPLE DATA' captions at owner's request (2026-11-20). Sample data is still sample; no on-page disclaimer now.
