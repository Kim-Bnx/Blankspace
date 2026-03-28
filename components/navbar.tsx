"use client";

import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import TinyLogo from "@/app/tiny-logo";
import {
    ChevronDown,
    ArrowUpRight,
    Search,
    BookMarked,
    Upload,
    RefreshCw,
    HelpCircle,
    Puzzle,
    Palette,
    LayoutTemplate,
    Package,
    Plug,
    Github,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { NavbarBlob } from "./navbar-blob";

// ── Rich panel content keyed by nav item title ────────────────────────────────
// Dissocie le contenu visuel des menus du pageMap Nextra.
// Ajoute ou modifie les entrées ici pour chaque item qui doit avoir un panel.
const NAV_PANEL_CONTENT: Record<
    string,
    {
        sections: {
            label: string;
            items: {
                icon?: FC<{ className?: string }>;
                title: string;
                desc: string;
                href?: string;
            }[];
        }[];
        featured: { emoji: string; title: string; desc: string; href?: string };
    }
> = {
    Thème: {
        sections: [
            {
                label: "L'essentiel",
                items: [
                    {
                        icon: BookMarked,
                        title: "Introduction",
                        desc: "Présentation du thème",
                    },
                    {
                        icon: Upload,
                        title: "Installation",
                        desc: "Installation automatique",
                    },
                    {
                        icon: RefreshCw,
                        title: "Vitrine",
                        desc: "Forums créés avec le Blank",
                    },
                    {
                        icon: HelpCircle,
                        title: "FAQ et support",
                        desc: "Questions/réponses",
                    },
                ],
            },
            {
                label: "Pas-à-pas",
                items: [
                    {
                        title: "Configuration le forum",
                        desc: "Présentation du thème",
                    },
                    {
                        title: "Modifier les templates",
                        desc: "Présentation du thème",
                    },
                    { title: "Ajouter le CSS", desc: "Présentation du thème" },
                    {
                        title: "Ajouter le Javascript",
                        desc: "Présentation du thème",
                    },
                ],
            },
        ],
        featured: {
            emoji: "📋",
            title: "Mise à jour 4.1",
            desc: "Installation étape par étape, pour découvrir le fonctionnement du thème.",
        },
    },
    Forumactif: {
        sections: [
            {
                label: "Modules",
                items: [
                    {
                        icon: Puzzle,
                        title: "HTML & Javascript",
                        desc: "Gestion des codes",
                    },
                    {
                        icon: Palette,
                        title: "CSS avancé",
                        desc: "Personnalisation fine",
                    },
                    {
                        icon: LayoutTemplate,
                        title: "Mise en page",
                        desc: "Layouts & templates",
                    },
                ],
            },
            {
                label: "Ressources",
                items: [
                    { title: "Icônes & SVG", desc: "Bibliothèque d'icônes" },
                    { title: "Couleurs", desc: "Palettes et variables" },
                    { title: "Typographie", desc: "Polices recommandées" },
                ],
            },
        ],
        featured: {
            emoji: "🚀",
            title: "Guide démarrage",
            desc: "Tout ce qu'il faut savoir pour créer votre premier forum.",
        },
    },
    Ressources: {
        sections: [
            {
                label: "Téléchargements",
                items: [
                    {
                        icon: Package,
                        title: "Thèmes gratuits",
                        desc: "Prêts à installer",
                    },
                    {
                        icon: Plug,
                        title: "Extensions",
                        desc: "Fonctionnalités extra",
                    },
                ],
            },
            {
                label: "Communauté",
                items: [
                    { title: "Forum officiel", desc: "Aide et discussions" },
                    { title: "Discord", desc: "Chat en temps réel" },
                    { title: "GitHub", desc: "Code source & issues" },
                ],
            },
        ],
        featured: {
            emoji: "📚",
            title: "Documentation",
            desc: "Toutes les références techniques et guides avancés.",
        },
    },
};

// ── Discord SVG (absent de Lucide) ────────────────────────────────────────────
const DiscordIcon: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 27 21"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M22.8454 1.71005C21.1354 0.912882 19.2839 0.334295 17.3553 0C17.3213 0.000483062 17.289 0.0143474 17.2653 0.0385728C17.0338 0.46287 16.7638 1.01574 16.5838 1.44004C14.5382 1.13165 12.4579 1.13165 10.4122 1.44004C10.2322 1.00288 9.9622 0.46287 9.71791 0.0385728C9.70505 0.0128578 9.66648 0 9.6279 0C7.69928 0.334295 5.86066 0.912882 4.13775 1.71005C4.1249 1.71005 4.11204 1.7229 4.09918 1.73576C0.601942 6.96876 -0.36237 12.0603 0.113357 17.1005C0.113357 17.1262 0.126214 17.1519 0.151929 17.1648C2.46628 18.8619 4.69063 19.8905 6.88926 20.572C6.92783 20.5848 6.9664 20.572 6.97926 20.5463C7.49356 19.8391 7.95643 19.0934 8.35501 18.3091C8.38073 18.2576 8.35501 18.2062 8.30358 18.1934C7.5707 17.9105 6.8764 17.5762 6.19495 17.1905C6.14352 17.1648 6.14352 17.0876 6.18209 17.049C6.32353 16.9462 6.46496 16.8305 6.60639 16.7276C6.63211 16.7019 6.67068 16.7019 6.69639 16.7147C11.1194 18.7334 15.8895 18.7334 20.2611 16.7147C20.2868 16.7019 20.3253 16.7019 20.3511 16.7276C20.4925 16.8433 20.6339 16.9462 20.7753 17.0619C20.8268 17.1005 20.8268 17.1776 20.7625 17.2033C20.0939 17.6019 19.3867 17.9233 18.6539 18.2062C18.6024 18.2191 18.5896 18.2834 18.6024 18.3219C19.0139 19.1062 19.4767 19.852 19.9782 20.5591C20.0168 20.572 20.0553 20.5848 20.0939 20.572C22.3054 19.8905 24.5297 18.8619 26.8441 17.1648C26.8698 17.1519 26.8827 17.1262 26.8827 17.1005C27.4484 11.276 25.9441 6.22303 22.8968 1.73576C22.884 1.7229 22.8711 1.71005 22.8454 1.71005ZM9.0236 14.0275C7.69928 14.0275 6.59353 12.8061 6.59353 11.3017C6.59353 9.79741 7.67356 8.57595 9.0236 8.57595C10.3865 8.57595 11.4665 9.81027 11.4537 11.3017C11.4537 12.8061 10.3736 14.0275 9.0236 14.0275ZM17.9853 14.0275C16.661 14.0275 15.5552 12.8061 15.5552 11.3017C15.5552 9.79741 16.6352 8.57595 17.9853 8.57595C19.3482 8.57595 20.4282 9.81027 20.4153 11.3017C20.4153 12.8061 19.3482 14.0275 17.9853 14.0275Z" />
    </svg>
);

// ── Panel content ─────────────────────────────────────────────────────────────
type PanelData = (typeof NAV_PANEL_CONTENT)[string];

function PanelContent({
    data,
    direction,
}: {
    data: PanelData;
    direction: "left" | "right" | null;
}) {
    // Named animations registered in tailwind.config.ts → theme.extend.animation
    // Keyframes stay within the overflow-hidden bounds (offset ≤ 8px)
    const animationClass =
        direction === "right"
            ? "animate-slide-from-right"
            : direction === "left"
              ? "animate-slide-from-left"
              : "animate-nav-fade";

    return (
        <div className={`flex gap-6 pt-4 pb-1 ${animationClass}`}>
            <NavbarBlob position="bottom" />
            {data.sections.map((section) => (
                <div key={section.label} className="flex-1">
                    <p className="text-[10.5px] font-bold tracking-widest uppercase text-light-800 mb-2 px-2.5">
                        {section.label}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title}>
                                    <Anchor
                                        href={item.href ?? "#"}
                                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        {Icon && (
                                            <span className="w-12 aspect-square bg-background flex items-center justify-center rounded-lg">
                                                <Icon className="w-5 h-5 text-light-800 group-hover:text-neutral-400 transition-colors shrink-0" />
                                            </span>
                                        )}
                                        <div>
                                            <div className="font-medium text-light-300 leading-snug">
                                                {item.title}
                                            </div>
                                            <div className="text-sm text-light-800">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </Anchor>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            {/* Featured card */}
            <div className="w-44 shrink-0">
                <Anchor
                    href={data.featured.href ?? "#"}
                    className="flex flex-col gap-2 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all h-full"
                >
                    <span className="text-xl">{data.featured.emoji}</span>
                    <div className="text-[14px] font-semibold text-neutral-300 leading-snug">
                        {data.featured.title}
                    </div>
                    <div className="text-[12px] text-neutral-600 leading-relaxed flex-1">
                        {data.featured.desc}
                    </div>
                    <div className="flex justify-end">
                        <span className="w-6 h-6 rounded-full bg-white/[0.07] flex items-center justify-center text-neutral-500">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </Anchor>
            </div>
        </div>
    );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export function Navbar({
    pageMap,
    mode,
}: {
    pageMap: PageMapItem[];
    mode?: "home" | "docs";
}) {
    if (!pageMap) return null;

    const pathname = usePathname();
    const { topLevelNavbarItems } = normalizePages({
        list: pageMap,
        route: pathname,
    });

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<"left" | "right" | null>(null);
    const prevIndexRef = useRef<number | null>(null);
    const navRef = useRef<HTMLElement>(null);

    const isOpen = openIndex !== null;
    const activeItem =
        openIndex !== null ? topLevelNavbarItems[openIndex] : null;
    const activePanelData = activeItem
        ? (NAV_PANEL_CONTENT[activeItem.title] ?? null)
        : null;

    const openPanel = (i: number) => {
        const prev = prevIndexRef.current;
        setDirection(prev === null ? null : i > prev ? "right" : "left");
        prevIndexRef.current = i;
        setOpenIndex(i);
    };

    const closePanel = () => {
        prevIndexRef.current = null;
        setOpenIndex(null);
    };

    // Scroll position stored as data attribute (original behaviour)
    useEffect(() => {
        const debounce = (fn: (...args: unknown[]) => void) => {
            let frame: number;
            return (...params: unknown[]) => {
                if (frame) cancelAnimationFrame(frame);
                frame = requestAnimationFrame(() => fn(...params));
            };
        };

        const storeScroll = () => {
            document.documentElement.dataset.scroll = String(window.scrollY);
        };

        document.addEventListener("scroll", debounce(storeScroll), {
            passive: true,
        });
        storeScroll();
    });

    // Close panel on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                closePanel();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav
            ref={navRef}
            className={cn(
                // Base styles (preserved from original)
                "navbar shrink-0 transition-all  top-1 z-20",
                // Expandable styles
                "overflow-hidden relative rounded-l-3xl",
                isOpen ? "bg-card" : " h-15",
                mode == "home" ? "px-8 sticky" : "",
            )}
        >
            {/* ── Top bar ── */}
            <div
                className={cn(
                    "h-15 px-2 flex items-center justify-between shrink-0",
                )}
            >
                {/* Left */}
                <div className="flex items-center gap-6">
                    {mode === "home" && (
                        <a className="text-accent" href="/">
                            <TinyLogo size={18} />
                        </a>
                    )}

                    <ul className="flex items-center gap-1 list-none">
                        {topLevelNavbarItems.map((item, i) => {
                            const route =
                                item.route ||
                                ("href" in item ? (item.href as string) : "");
                            const hasPanelContent =
                                !!NAV_PANEL_CONTENT[item.title];
                            const active = openIndex === i;

                            return (
                                <li key={route} className="text-nav-foreground">
                                    {hasPanelContent ? (
                                        // Items with a panel → toggle on click
                                        <button
                                            onClick={() =>
                                                active
                                                    ? closePanel()
                                                    : openPanel(i)
                                            }
                                            className={cn(
                                                "py-2 px-4 inline-flex items-center gap-1.5 rounded-full transition-colors cursor-pointer select-none text-[13.5px] font-medium",
                                                active
                                                    ? "bg-background text-foreground"
                                                    : "hover:bg-card",
                                            )}
                                        >
                                            {item.title}
                                            <ChevronDown
                                                className={cn(
                                                    "w-3 h-3 transition-transform duration-200",
                                                    active && "rotate-180",
                                                )}
                                            />
                                        </button>
                                    ) : (
                                        // Regular link items (original Anchor)
                                        <Anchor
                                            href={route}
                                            className="py-1 px-3 inline-flex items-center gap-2 rounded-full hover:bg-background text-[13.5px] font-medium"
                                        >
                                            {item.title}
                                        </Anchor>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right (preserved from original) */}
                <div className="flex items-center gap-4">
                    <button className="text-text-muted flex items-center gap-1.5 text-sm hover:text-foreground transition-colors cursor-pointer">
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:inline">Rechercher</span>
                    </button>

                    <a className="text-text-muted hover:text-foreground transition-colors">
                        <DiscordIcon className="w-[27px] h-[21px]" />
                    </a>

                    <a className="text-text-muted hover:text-foreground transition-colors">
                        <Github className="w-[24px] h-[23px]" />
                    </a>

                    <a
                        href="#"
                        className="py-1 px-3 inline-flex items-center gap-1 rounded-full bg-accent text-semibold text-background hover:opacity-90 transition-opacity"
                    >
                        Forum <ArrowUpRight className="w-4" />
                    </a>
                </div>
            </div>

            {/* ── Expandable panel (grid trick for smooth height) ── */}
            <div
                className="grid transition-[grid-template-rows] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                        {activePanelData && (
                            <PanelContent
                                key={openIndex}
                                data={activePanelData}
                                direction={direction}
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
