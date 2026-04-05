// components/details.tsx
"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Details({
  title,
  children,
  defaultOpen = false,
  className,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const content = contentRef.current;
    if (!content) return;

    if (open) {
      content.animate(
        [
          { height: `${content.scrollHeight}px`, opacity: 1 },
          { height: "0px", opacity: 0 },
        ],
        { duration: 200, easing: "ease-out", fill: "both" }
      ).onfinish = () => setOpen(false);
    } else {
      setOpen(true);
      requestAnimationFrame(() => {
        content.animate(
          [
            { height: "0px", opacity: 0 },
            { height: `${content.scrollHeight}px`, opacity: 1 },
          ],
          { duration: 200, easing: "ease-out", fill: "both" }
        );
      });
    }
  };

  return (
    <div className={cn(className)}>
      <button
        onClick={toggle}
        className="flex w-full items-center gap-2 py-2.5 text-sm font-medium text-light-100 hover:text-accent-alt transition-colors cursor-pointer"
      >
        <ChevronRight
          className={cn(
            "size-4 text-light-600 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
        <span>{title}</span>
      </button>
      <div
        ref={contentRef}
        className={cn("overflow-hidden", !open && "h-0 opacity-0")}
      >
        <div className="pb-3 pl-6 text-sm text-light-800">{children}</div>
      </div>
    </div>
  );
}