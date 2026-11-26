import type { ReactNode } from "react";
import Link from "next/link";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import type { LegalDocument } from "../legal-content";
import LegalToc from "./legal-toc";
import BackToTop from "./back-to-top";
import ContactProvider from "./contact";

const legalPages = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Automation terms", href: "/policy-for-automation" },
  { label: "Data deletion", href: "/user-data-deletion-request" },
];

type Look = "home" | "option-2";

/** Colours for each landing page's look. */
const looks = {
  home: {
    accent: "text-brand",
    marker: "marker:text-brand",
    link: "text-brand decoration-brand/30 hover:decoration-brand",
    hoverAccent: "hover:text-brand",
    activeBg: "bg-brand/[0.07]",
    bar: "var(--brand)",
  },
  "option-2": {
    accent: "text-brand",
    marker: "marker:text-[#16a34a]",
    link: "text-brand decoration-brand/30 hover:decoration-brand",
    hoverAccent: "hover:text-[#111113]",
    activeBg: "bg-brand/[0.07]",
    bar: "var(--brand)",
  },
} as const;

type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "rule" };

function parseDocument(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let title = "";
  let lastUpdated = "";
  let paragraph: string[] = [];
  let list: Extract<ContentBlock, { type: "list" }> | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join("\n") });
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    blocks.push(list);
    list = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    if (!title && trimmed.startsWith("# ")) {
      title = trimmed.slice(2).trim();
      continue;
    }
    if (!lastUpdated && /^\*\*Last Updated:\*\*/i.test(trimmed)) {
      lastUpdated = trimmed.replace(/^\*\*Last Updated:\*\*/i, "").trim();
      continue;
    }
    if (trimmed === "---") {
      flushParagraph();
      flushList();
      blocks.push({ type: "rule" });
      continue;
    }
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      const level = trimmed.startsWith("### ") ? 3 : 2;
      blocks.push({ type: "heading", level, text: trimmed.slice(level + 1).trim() });
      continue;
    }

    const unordered = trimmed.match(/^[-*] (.+)$/);
    const ordered = trimmed.match(/^\d+\. (.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      if (list && list.ordered !== isOrdered) flushList();
      list ??= { type: "list", ordered: isOrdered, items: [] };
      list.items.push((unordered ?? ordered)![1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return { title, lastUpdated, blocks };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(text: string, link: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g);

  return tokens.filter(Boolean).map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-bold text-ink">{token.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(token)) {
      const punctuation = token.match(/[.,;:]$/)?.[0] ?? "";
      const href = punctuation ? token.slice(0, -1) : token;
      return <span key={index}><a href={href} target="_blank" rel="noopener noreferrer" className={`break-all font-semibold underline underline-offset-4 ${link}`}>{href}</a>{punctuation}</span>;
    }
    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(token)) {
      return <a key={index} href={`mailto:${token}`} className={`break-all font-semibold underline underline-offset-4 ${link}`}>{token}</a>;
    }
    return <span key={index}>{token}</span>;
  });
}

function RichText({ text, link }: { text: string; link: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={index}>
      {index > 0 && <br />}
      {renderInline(line, link)}
    </span>
  ));
}

/** The document (hero, contents and text) in either landing page's look. */
export function LegalBody({
  document,
  currentPath,
  variant = "home",
  pageBase = "",
  icon,
}: {
  document: LegalDocument;
  currentPath: string;
  variant?: Look;
  /** prefix for the legal page links, e.g. "/option-2" */
  pageBase?: string;
  /** a clay icon shown on the right of the Option 2 header */
  icon?: string;
}) {
  const look = looks[variant];
  const { title, lastUpdated, blocks } = parseDocument(document.markdown);
  // "Privacy Policy — EndPoint Clients CRM": the main title, then the product
  const [mainTitle, subTitle] = title.split(/\s+[—–]\s+/);
  const sections = blocks.filter(
    (block): block is Extract<ContentBlock, { type: "heading" }> =>
      block.type === "heading" && block.level === 2,
  );

  return (
    <main className={`min-h-screen overflow-x-clip ${variant === "home" ? "bg-surface" : "bg-white text-[#111113]"}`}>
        {variant === "home" ? (
          // home look: the soft hero wash, a label pill and a serif accent
          <section className="hero-wash border-b border-black/[0.06] px-5 pb-12 pt-44 sm:px-10 sm:pb-14 sm:pt-48">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5">
              <p className="eyebrow">Legal documents</p>
              <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,4.6vw,3.5rem)] !font-medium leading-[1.1] tracking-[-0.035em] text-ink">
                {mainTitle}
                {subTitle && (
                  <>
                    {" "}
                    <span className="serif">{subTitle}</span>
                  </>
                )}
              </h1>
              {lastUpdated && <p className="text-[14px] text-body">Last updated {lastUpdated}</p>}
            </div>
          </section>
        ) : (
          // Option 2 look: a sky wash, a white pill and a green underline
          <section className="relative overflow-hidden bg-[linear-gradient(180deg,#cfe2f5_0%,#e6f0fa_45%,#ffffff_100%)] px-5 pb-12 pt-36 sm:px-10 sm:pb-16 sm:pt-44">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8">
            <div className="flex min-w-0 flex-col items-start gap-5">
              <span className="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-[#111113] shadow-[0_1px_2px_rgba(17,17,19,0.05)]">Legal documents</span>
              <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111113]">
                <span className="relative inline-block">
                  {mainTitle}
                  <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                    <defs>
                      <linearGradient id="legal-underline" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor="#4ade80" />
                        <stop offset="1" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                    <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke="url(#legal-underline)" strokeWidth="6" strokeLinecap="round" className="underline-draw" />
                  </svg>
                </span>
                {subTitle && <span className="mt-4 block text-[0.5em] font-medium tracking-[-0.02em] text-[#5b5b63]">{subTitle}</span>}
              </h1>
              {lastUpdated && <p className="text-[14px] text-[#5b5b63]">Last updated {lastUpdated}</p>}
            </div>
            {icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={icon}
                alt=""
                width={320}
                height={320}
                className="pw-float hidden size-40 flex-none mix-blend-multiply sm:block lg:size-52"
              />
            )}
            </div>
          </section>
        )}

        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14 lg:py-16">
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            <details className="group border-y border-black/10 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-bold text-ink marker:content-none">
                Legal documents
                <span aria-hidden="true" className={`${look.accent} transition-transform group-open:rotate-45`}>+</span>
              </summary>
              <ul className="mt-3 space-y-1 border-l border-black/10 pl-3">
                {legalPages.map(({ label, href }) => ({ label, path: href, href: pageBase + href })).map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} aria-current={page.path === currentPath ? "page" : undefined} className={`block py-1.5 text-[14px] font-semibold ${page.path === currentPath ? look.accent : "text-body hover:text-ink"}`}>
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <details className="group border-y border-black/10 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-bold text-ink marker:content-none">
                On this page
                <span aria-hidden="true" className={`${look.accent} transition-transform group-open:rotate-45`}>+</span>
              </summary>
              <ol className="mt-3 max-h-64 space-y-1 overflow-y-auto border-l border-black/10 pl-3">
                {sections.map((section) => (
                  <li key={section.text}>
                    <a href={`#${slugify(section.text)}`} className={`block py-1.5 text-[13px] font-semibold leading-snug text-body ${look.hoverAccent}`}>
                      {section.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          <article className="min-w-0 max-w-[46rem] lg:col-start-1 lg:row-start-1">
            {blocks.map((block, index) => {
              if (block.type === "heading") {
                const id = slugify(block.text);
                return block.level === 2 ? (
                  <h2 key={index} id={id} className="scroll-mt-32 border-t border-black/[0.08] pt-12 text-[clamp(1.55rem,3vw,2.1rem)] font-bold leading-tight tracking-[-0.035em] text-ink first:border-t-0 first:pt-0 [&+*]:mt-5">
                    {block.text}
                  </h2>
                ) : (
                  <h3 key={index} id={id} className="scroll-mt-32 text-[1.12rem] font-bold leading-snug tracking-[-0.015em] text-ink [&:not(:first-child)]:mt-8 [&+*]:mt-3">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "list") {
                const List = block.ordered ? "ol" : "ul";
                return (
                  <List key={index} className={`my-5 space-y-2.5 pl-6 text-[15px] leading-[1.75] text-body sm:text-[16px] ${block.ordered ? "list-decimal" : `list-disc ${look.marker}`}`}>
                    {block.items.map((item) => <li key={item} className="pl-1"><RichText text={item} link={look.link} /></li>)}
                  </List>
                );
              }
              if (block.type === "rule") {
                return <hr key={index} className="my-10 border-black/[0.08]" />;
              }
              return (
                <p key={index} className="my-4 text-[15px] leading-[1.78] text-body sm:text-[16px]">
                  <RichText text={block.text} link={look.link} />
                </p>
              );
            })}
          </article>

          <aside className="hidden self-stretch lg:col-start-2 lg:row-start-1 lg:block">
            <LegalToc
              sections={sections.map((section) => ({ id: slugify(section.text), text: section.text }))}
              accent={look.accent}
              activeBg={look.activeBg}
              bar={look.bar}
            />
          </aside>
        </div>
    </main>
  );
}

export default function LegalPage({ document, currentPath }: { document: LegalDocument; currentPath: string }) {
  return (
    <ContactProvider>
      <SiteHeader />
      <LegalBody document={document} currentPath={currentPath} />
      <SiteFooter />
      <BackToTop />
    </ContactProvider>
  );
}
