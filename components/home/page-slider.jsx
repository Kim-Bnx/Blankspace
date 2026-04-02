"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Durée d'affichage de chaque slide (ms)
// ---------------------------------------------------------------------------
const DURATION = 10000;

// ---------------------------------------------------------------------------
// Contenu de chaque slide (panneau droit)
// ---------------------------------------------------------------------------
const SLIDES = [
    {
        tabs: ["overall_header", "css"],
        activeTab: 0,
        code: `<!-- Structure du forum -->
<div class="main_forum">

  <!-- Ascenseur : renvoi vers le haut de la page -->
    <a id="top" name="top" accesskey="t"></a>
    {JAVASCRIPT}

    <!-- ENTETE DU FORUM (au-dessus de la pub) -->

    <div id="page-header">

      <!-- Bannière -->
      <a href="{U_INDEX}" id="header">
          <img loading="lazy" src="{LOGO}"
            alt="{L_INDEX}" /></a>

      <!-- Barre de navigation -->
      <ul class="navbar">
        <li>{GENERATED_NAV_BAR}</li>
      </ul>
      <!-- Fin de la barre de nav -->`,
    },
    {
        tabs: ["index_body", "css"],
        activeTab: 0,
        code: `<!-- Page d'accueil du forum -->
<div class="main_forum">

  <!-- En-tête principal -->
  <div id="page-header">
    <a href="{U_INDEX}">
      <img loading="lazy" src="{LOGO}"
        alt="{L_INDEX}" />
    </a>
  </div>

  <!-- Corps de la page -->
  <div id="page-body">

    <!-- Catégories & forums -->
    {FORUM_BODY}

    <!-- Statistiques -->
    <div id="forum-statistics">
      {STATISTICS}
    </div>

  </div>`,
    },
    {
        tabs: ["viewtopic_body", "css"],
        activeTab: 0,
        code: `<!-- Vue d'un sujet -->
<div class="main_forum">

  <!-- Fil d'ariane -->
  <div class="breadcrumbs">
    {NAV_BAR}
  </div>

  <!-- Titre du sujet -->
  <h1 class="topic-title">
    {TOPIC_TITLE}
  </h1>

  <!-- Liste des messages -->
  <div id="posts">
    {POSTS}
  </div>

  <!-- Bouton répondre -->
  <div class="post-buttons">
    {POST_REPLY_BOX}
  </div>`,
    },
];

// ---------------------------------------------------------------------------
// Composant CodePanel — panneau droit avec onglets + code
// ---------------------------------------------------------------------------
function CodePanel({ slide }) {
    return (
        <div className="h-[80%] w-[80%] bg-background flex flex-col z-10 absolute rounded-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Onglets */}
            <div className="flex gap-1 px-6 pt-5 border-b border-white/10">
                {slide.tabs.map((tab, i) => (
                    <span
                        key={tab}
                        className={`pb-3 px-1 text-sm font-mono ${
                            i === slide.activeTab
                                ? "text-accent-alt border-b-2 border-accent-alt"
                                : "text-light-800"
                        }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Code */}
            <pre className="flex-1 overflow-hidden p-6 text-xs font-mono leading-relaxed text-light-800 whitespace-pre">
                {slide.code}
            </pre>
        </div>
    );
}

// ---------------------------------------------------------------------------
// PageSlider
// ---------------------------------------------------------------------------
export function PageSlider() {
    const items = [
        {
            title: "Des codes simplifiés et commentés plus facile à comprendre",
        },
        { title: "Un design minimaliste comme point de départ à vos idées" },
        {
            title: "Des fonctionnalités pratiques pour améliorer l'expérience",
        },
    ];

    const [active, setActive] = useState(0);

    // Un ref par item pour la barre de progression
    const progressRefs = useRef([]);
    // Ref vers le panneau de contenu droit (pour le fade)
    const contentRef = useRef(null);
    // L'animation de progression en cours
    const progressAnimRef = useRef(null);

    const advance = useCallback(() => {
        setActive((prev) => (prev + 1) % items.length);
    }, [items.length]);

    useEffect(() => {
        // ── 1. Annuler l'animation de progression précédente ──────────────
        if (progressAnimRef.current) {
            progressAnimRef.current.onfinish = null;
            progressAnimRef.current.cancel(); // revient à width: 0% (inline style)
            progressAnimRef.current = null;
        }

        // ── 2. Animer la barre de l'item actif ────────────────────────────
        const barEl = progressRefs.current[active];
        if (barEl) {
            const anim = barEl.animate([{ width: "0%" }, { width: "100%" }], {
                duration: DURATION,
                easing: "linear",
                fill: "both",
            });
            anim.onfinish = advance;
            progressAnimRef.current = anim;
        }

        // ── 3. Fade-in + léger slide-up du contenu droit ──────────────────
        if (contentRef.current) {
            contentRef.current.animate(
                [
                    { opacity: 0, transform: "translateY(10px)" },
                    { opacity: 1, transform: "translateY(0)" },
                ],
                {
                    duration: 350,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                    fill: "both",
                },
            );
        }

        return () => {
            if (progressAnimRef.current) {
                progressAnimRef.current.onfinish = null;
            }
        };
    }, [active, advance]);

    return (
        <div className="grid grid-cols-2">
            {/* ── Panneau gauche : liste des items ── */}
            <aside className="border-r">
                <ul>
                    {items.map((item, i) => (
                        <li
                            key={i}
                            onClick={() => setActive(i)}
                            className={`relative p-12 cursor-pointer overflow-hidden ${
                                i !== items.length - 1 ? "border-b" : ""
                            } ${i === active ? "bg-dark-450" : "text-dark-100"}`}
                        >
                            <span className="font-mono text-light-800 text-sm block mb-1">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h2
                                className={`text-2xl font-semibold ${
                                    i === active
                                        ? "text-primary-foreground"
                                        : "text-dark-100"
                                }`}
                            >
                                {item.title}
                            </h2>

                            {/* Barre de progression — toujours montée, width animée via JS */}
                            <div
                                ref={(el) => (progressRefs.current[i] = el)}
                                className="absolute bottom-0 left-0 h-0.5 bg-accent"
                                style={{ width: "0%" }}
                            />
                        </li>
                    ))}
                </ul>
            </aside>

            {/* ── Panneau droit : contenu avec fade ── */}
            <section
                ref={contentRef}
                className="min-h-80 relative overflow-hidden"
            >
                <div className="bg-accent/10 absolute blur-[200px] w-full h-[60%] top-1/2 left-0 -translate-y-1/2" />
                <CodePanel slide={SLIDES[active]} />
            </section>
        </div>
    );
}
