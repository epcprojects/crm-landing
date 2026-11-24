"use client";

// A list of sticky cards that stack: each new card slides up over the one
// before it, and the covered card shrinks and dims a little. A card is
// "active" (class "is-in") while it is on screen and not covered by the next
// card, so the animation of the picture inside it plays again each time the
// visitor comes back to it, from above or below.

import { useEffect, useRef, type ReactNode } from "react";

export default function StackList({ children, className = "" }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      cards.forEach((card) => card.classList.add("is-in"));
      return;
    }

    const wide = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        const rect = card.getBoundingClientRect();
        let covered = 0;
        if (wide.matches && next) {
          const gap = next.getBoundingClientRect().top - rect.top;
          covered = Math.min(1, Math.max(0, 1 - gap / (card.offsetHeight + 20)));
          card.style.transform = `scale(${1 - covered * 0.06})`;
          card.style.filter = `brightness(${1 - covered * 0.04})`;
        } else {
          card.style.transform = "";
          card.style.filter = "";
        }
        // on screen (enough of it showing) and not covered by the next card
        const onScreen = rect.top < window.innerHeight * 0.7 && rect.bottom > 160;
        const active = onScreen && covered < 0.35;
        if (active) card.classList.add("is-in");
        else if (!onScreen || covered > 0.6) card.classList.remove("is-in");
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className={className}>
      {children}
    </ol>
  );
}
