"use client";

import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import type { FC } from "react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
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
} from "lucide-react";
import DiscordIcon from "./discord-icon";
import GithubIcon from "./github-icon";
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
                        href: "/docs/theme",
                    },
                    {
                        icon: Upload,
                        title: "Installation",
                        desc: "Installation automatique",
                        href: "/docs/theme/installation",
                    },
                    {
                        icon: RefreshCw,
                        title: "Vitrine",
                        desc: "Forums créés avec le Blank",
                        href: "/docs/theme/vitrine",
                    },
                    {
                        icon: HelpCircle,
                        title: "FAQ et support",
                        desc: "Questions/réponses",
                        href: "/docs/theme/faq",
                    },
                ],
            },
            {
                label: "Pas-à-pas",
                items: [
                    {
                        title: "Configuration le forum",
                        desc: "Présentation du thème",
                        href: "/theme/pas-a-pas/configuration",
                    },
                    {
                        title: "Modifier les templates",
                        desc: "Présentation du thème",
                        href: "/theme/pas-a-pas/templates",
                    },
                    {
                        title: "Ajouter le CSS",
                        desc: "Présentation du thème",
                        href: "/theme/pas-a-pas/css",
                    },
                    {
                        title: "Ajouter le Javascript",
                        desc: "Présentation du thème",
                        href: "/theme/pas-a-pas/javascript",
                    },
                ],
            },
        ],
        featured: {
            emoji: "📋",
            title: "Mise à jour 4.1",
            desc: "Installation étape par étape, pour découvrir le fonctionnement du thème.",
            href: "/theme/changelog",
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
                        href: "/forumactif/modules/html-javascript",
                    },
                    {
                        icon: Palette,
                        title: "CSS avancé",
                        desc: "Personnalisation fine",
                        href: "/forumactif/modules/css",
                    },
                    {
                        icon: LayoutTemplate,
                        title: "Mise en page",
                        desc: "Layouts & templates",
                        href: "/forumactif/modules/mise-en-page",
                    },
                ],
            },
            {
                label: "Ressources",
                items: [
                    {
                        title: "Icônes & SVG",
                        desc: "Bibliothèque d'icônes",
                        href: "/forumactif/ressources/icones",
                    },
                    {
                        title: "Couleurs",
                        desc: "Palettes et variables",
                        href: "/forumactif/ressources/couleurs",
                    },
                    {
                        title: "Typographie",
                        desc: "Polices recommandées",
                        href: "/forumactif/ressources/typographie",
                    },
                ],
            },
        ],
        featured: {
            emoji: "🚀",
            title: "Guide démarrage",
            desc: "Tout ce qu'il faut savoir pour créer votre premier forum.",
            href: "/forumactif/guide-demarrage",
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
                        href: "/ressources/themes",
                    },
                    {
                        icon: Plug,
                        title: "Extensions",
                        desc: "Fonctionnalités extra",
                        href: "/ressources/extensions",
                    },
                ],
            },
            {
                label: "Communauté",
                items: [
                    {
                        title: "Forum officiel",
                        desc: "Aide et discussions",
                        href: "https://forum.example.com",
                    },
                    {
                        title: "Discord",
                        desc: "Chat en temps réel",
                        href: "https://discord.gg/example",
                    },
                    {
                        title: "GitHub",
                        desc: "Code source & issues",
                        href: "https://github.com/example",
                    },
                ],
            },
        ],
        featured: {
            emoji: "📚",
            title: "Documentation",
            desc: "Toutes les références techniques et guides avancés.",
            href: "/ressources/documentation",
        },
    },
};

// ── Panel content ─────────────────────────────────────────────────────────────
type PanelData = (typeof NAV_PANEL_CONTENT)[string];

// Pure render — aucune animation ici
function PanelContent({
    data,
    onClose,
}: {
    data: PanelData;
    onClose: () => void;
}) {
    const isExternal = (href: string) => href.startsWith("http");

    return (
        <div className="grid grid-cols-4 gap-6 pt-4 pb-1">
            {data.sections.map((section) => (
                <div key={section.label} className="flex-1">
                    <p className="text-[10.5px] font-bold tracking-widest uppercase text-light-800 mb-2 px-2.5">
                        {section.label}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const href = item.href ?? "#";
                            return (
                                <li key={item.title}>
                                    <Anchor
                                        href={href}
                                        onClick={onClose}
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
            <div className="w-full shrink-0">
                <Anchor
                    href={data.featured.href ?? "#"}
                    onClick={onClose}
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

// ── Slider — anime l'ancien panel dehors et le nouveau dedans simultanément ──
function PanelSlider({
    data,
    openIndex,
    direction,
    onClose,
}: {
    data: PanelData;
    openIndex: number;
    direction: "left" | "right" | null;
    onClose: () => void;
}) {
    type Slot = { id: number; data: PanelData };

    const [current, setCurrent] = useState<Slot>({ id: openIndex, data });
    const [outgoing, setOutgoing] = useState<Slot | null>(null);

    const directionRef = useRef(direction);
    directionRef.current = direction;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inRef = useRef<HTMLDivElement>(null);
    const outRef = useRef<HTMLDivElement>(null);
    // Hauteur snapshotée avant le re-render, pour animer depuis la bonne valeur
    const fromHeightRef = useRef<number>(0);

    // ── Déclenche la transition ───────────────────────────────────────────────
    // useEffect s'exécute APRÈS le paint courant :
    //   • le contenu actuel est encore affiché → offsetHeight correct
    //   • on mémorise la hauteur AVANT le prochain render
    useEffect(() => {
        if (current.id === openIndex) return;
        fromHeightRef.current = wrapperRef.current?.offsetHeight ?? 0;
        setOutgoing(current);
        setCurrent({ id: openIndex, data });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openIndex]);

    // ── Lance les animations ──────────────────────────────────────────────────
    // useLayoutEffect s'exécute APRÈS les mutations DOM mais AVANT le paint :
    //   • inRef a déjà le nouveau contenu (scrollHeight = nouvelle hauteur)
    //   • on démarre l'animation avant que le navigateur ne peigne le saut
    useLayoutEffect(() => {
        if (!outgoing) return;

        const wrapper = wrapperRef.current;
        const inEl = inRef.current;
        const outEl = outRef.current;
        if (!wrapper || !inEl || !outEl) return;

        const fromH = fromHeightRef.current;
        const toH = inEl.scrollHeight;

        const dir = directionRef.current;
        const xIn = dir === "right" ? "100%" : dir === "left" ? "-100%" : "0";
        const xOut = dir === "right" ? "-100%" : dir === "left" ? "100%" : "0";

        const opts: KeyframeAnimationOptions = {
            duration: 320,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "both",
        };

        // Hauteur du wrapper : fromH → toH
        wrapper.animate(
            [{ height: `${fromH}px` }, { height: `${toH}px` }],
            opts,
        );

        // Entrant : glisse depuis le côté
        inEl.animate(
            [
                { transform: `translateX(${xIn})` },
                { transform: "translateX(0)" },
            ],
            opts,
        );

        // Sortant : glisse vers le côté opposé, puis nettoyage
        const outAnim = outEl.animate(
            [
                { transform: "translateX(0)" },
                { transform: `translateX(${xOut})` },
            ],
            opts,
        );
        if (outAnim) outAnim.onfinish = () => setOutgoing(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outgoing?.id]);

    return (
        <div ref={wrapperRef} className="relative overflow-hidden">
            {outgoing && (
                <div ref={outRef} className="absolute inset-0">
                    <PanelContent data={outgoing.data} />
                </div>
            )}
            <div ref={inRef}>
                <PanelContent data={current.data} />
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
                "navbar shrink-0 transition-all top-1 z-20 mb-2",
                // Expandable styles
                "overflow-hidden relative",
                isOpen ? "bg-card shadow-2xl" : " h-15",
                mode == "home"
                    ? "px-8 sticky rounded-3xl"
                    : "px-2 rounded-l-3xl",
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
                                        // Items with a panel
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
                                        // Regular link items
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
                        <DiscordIcon size={24} />
                    </a>

                    <a className="text-text-muted hover:text-foreground transition-colors">
                        <GithubIcon size={24} />
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
                className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                        {activePanelData && (
                            <>
                                <PanelSlider
                                    data={activePanelData}
                                    openIndex={openIndex!}
                                    direction={direction}
                                    onClose={closePanel}
                                />
                                <NavbarBlob position="bottom" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
