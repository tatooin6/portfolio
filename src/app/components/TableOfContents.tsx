"use client";

import { useEffect, useState } from "react";

export type TableOfContentsHeading = {
  id: string;
  title: string;
  level: 2 | 3;
};

interface Props {
  headings: TableOfContentsHeading[];
}

const TableOfContents = ({ headings }: Props) => {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => !!element);

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur dark:bg-white/5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
        On this page
      </p>
      <ul className="mt-4 space-y-2">
        {headings.map((heading) => {
          const isLevelThree = heading.level === 3;
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={`text-sm leading-snug ${
                isLevelThree ? "pl-5" : "-ml-1"
              }`}
            >
              <a
                href={`#${heading.id}`}
                className={`block rounded-lg ${
                  isLevelThree ? "px-3" : "px-2"
                } py-1 text-sm transition-colors ${
                  isActive
                    ? "bg-violet-500/20 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
