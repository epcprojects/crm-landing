"use client";

// Marks a block as "seen" once it scrolls into view. Children use the
// `.reveal` / `.draw` classes (CSS) or the useSeen() hook to start moving.

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SeenContext = createContext(false);

export function useSeen() {
  return useContext(SeenContext);
}

export default function RevealRoot({
  children,
  className = "",
  threshold = 0.25,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <SeenContext.Provider value={seen}>
      <div ref={ref} data-seen={seen} className={`reveal-root ${className}`}>
        {children}
      </div>
    </SeenContext.Provider>
  );
}
