// components/shortcut.tsx
import { Anchor } from "nextra/components";
import { ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Shortcut({
  path,
  href,
  icon: Icon = ArrowRight,
  className,
}: {
  path: string[];
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <Anchor
      href={href}
      className={cn(
        "inline-flex items-center gap-2 group",
        className
      )}
    >
      {path.map((segment, i) => {
        const isLast = i === path.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="size-4 text-light-800" />}
            <span className={isLast ? "text-accent-alt" : "text-light-800"}>
              {segment}
            </span>
          </span>
        );
      })}
      <Icon className="size-4 text-accent-alt" />
    </Anchor>
  );
}