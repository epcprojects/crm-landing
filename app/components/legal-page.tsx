import type { ReactNode } from "react";
import Link from "next/link";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import type { LegalDocument } from "../legal-content";

const legalPages = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Automation terms", href: "/policy-for-automation" },
  { label: "Data deletion", href: "/user-data-deletion-request" },
];

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

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g);

  return tokens.filter(Boolean).map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-bold text-ink">{token.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(token)) {
      const punctuation = token.match(/[.,;:]$/)?.[0] ?? "";
      const href = punctuation ? token.slice(0, -1) : token;
      return <span key={index}><a href={href} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">{href}</a>{punctuation}</span>;
    }
    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(token)) {
      return <a key={index} href={`mailto:${token}`} className="break-all font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">{token}</a>;
    }
    return <span key={index}>{token}</span>;
  });
}

function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={index}>
      {index > 0 && <br />}
      {renderInline(line)}
    </span>
  ));
}

export default function LegalPage({
  document,
  currentPath,
}: {
  document: LegalDocument;
  currentPath: string;
}) {
  const { title, lastUpdated, blocks } = parseDocument(document.markdown);
  const sections = blocks.filter(
    (block): block is Extract<ContentBlock, { type: "heading" }> =>
      block.type === "heading" && block.level === 2,
  );

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen overflow-x-clip bg-surface">
        <section className="border-b border-black/[0.08] px-5 pb-10 pt-44 sm:px-10 sm:pb-12 sm:pt-48">
          <div className="mx-auto grid w-full max-w-5xl xl:grid-cols-[minmax(0,46rem)_13rem] xl:gap-12">
            <div>
              <p className="font-label text-[11px] font-medium uppercase tracking-[0.18em] text-brand">Legal documents</p>
              <h1 className="mt-4 max-w-3xl text-balance text-[clamp(2.4rem,5vw,4.25rem)] font-bold leading-[1] tracking-[-0.05em] text-ink">
                {title}
              </h1>
              {lastUpdated && <p className="mt-5 text-[14px] font-semibold text-body">Last updated {lastUpdated}</p>}
            </div>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-10 sm:px-10 sm:py-14 xl:grid-cols-[minmax(0,46rem)_13rem] xl:gap-12 xl:py-16">
          <div className="grid gap-3 sm:grid-cols-2 xl:hidden">
            <details className="group border-y border-black/10 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-bold text-ink marker:content-none">
                Legal documents
                <span aria-hidden="true" className="text-brand transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-3 space-y-1 border-l border-black/10 pl-3">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} aria-current={page.href === currentPath ? "page" : undefined} className={`block py-1.5 text-[14px] font-semibold ${page.href === currentPath ? "text-brand" : "text-body hover:text-ink"}`}>
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <details className="group border-y border-black/10 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-bold text-ink marker:content-none">
                On this page
                <span aria-hidden="true" className="text-brand transition-transform group-open:rotate-45">+</span>
              </summary>
              <ol className="mt-3 max-h-64 space-y-1 overflow-y-auto border-l border-black/10 pl-3">
                {sections.map((section) => (
                  <li key={section.text}>
                    <a href={`#${slugify(section.text)}`} className="block py-1.5 text-[13px] font-semibold leading-snug text-body hover:text-brand">
                      {section.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          <article className="min-w-0 xl:col-start-1">
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
                  <List key={index} className={`my-5 space-y-2.5 pl-6 text-[15px] leading-[1.75] text-body sm:text-[16px] ${block.ordered ? "list-decimal" : "list-disc marker:text-brand"}`}>
                    {block.items.map((item) => <li key={item} className="pl-1"><RichText text={item} /></li>)}
                  </List>
                );
              }
              if (block.type === "rule") {
                return <hr key={index} className="my-10 border-black/[0.08]" />;
              }
              return (
                <p key={index} className="my-4 text-[15px] leading-[1.78] text-body sm:text-[16px]">
                  <RichText text={block.text} />
                </p>
              );
            })}
          </article>

          <aside className="hidden xl:block xl:col-start-2">
            <nav aria-label="On this page" className="legal-toc sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
              <p className="font-label text-[11px] font-medium uppercase tracking-[0.18em] text-ink/45">On this page</p>
              <ol className="mt-4 space-y-2 border-l border-black/10 pl-3">
                {sections.map((section) => (
                  <li key={section.text}>
                    <a href={`#${slugify(section.text)}`} className="block text-[12px] font-semibold leading-snug text-body transition-colors hover:text-brand">
                      {section.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
