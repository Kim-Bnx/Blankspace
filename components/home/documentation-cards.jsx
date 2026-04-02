"use client";

import { useRef } from "react";
import ArrowIcon from "@/components/arrow-icon";

const GAP = 16;

const getVisualX = (el) => {
    const matrix = new DOMMatrix(getComputedStyle(el).transform);
    return matrix.m41;
};

export function DocumentationCards({ cards }) {
    const bgRef = useRef(null);
    const slideAnim = useRef(null);
    const fadeAnim = useRef(null);
    const visible = useRef(false);

    const slideToCard = (cardEl) => {
        const bg = bgRef.current;
        if (!bg) return;

        const x = cardEl.offsetLeft + GAP;
        const w = cardEl.offsetWidth - GAP * 2;
        const h = cardEl.offsetHeight - GAP * 2;

        bg.style.width = `${w}px`;
        bg.style.height = `${h}px`;

        if (!visible.current) {
            slideAnim.current?.cancel();
            bg.style.transform = `translateX(${x}px)`;
            visible.current = true;

            fadeAnim.current?.cancel();
            fadeAnim.current = bg.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                easing: "ease",
                fill: "both",
            });
        } else {
            const fromX = getVisualX(bg);
            slideAnim.current?.cancel();
            bg.style.transform = `translateX(${fromX}px)`;

            slideAnim.current = bg.animate(
                [
                    { transform: `translateX(${fromX}px)` },
                    { transform: `translateX(${x}px)` },
                ],
                {
                    duration: 300,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    fill: "both",
                },
            );
        }
    };

    const handleContainerLeave = () => {
        const bg = bgRef.current;
        if (!bg) return;
        visible.current = false;

        fadeAnim.current?.cancel();
        fadeAnim.current = bg.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            easing: "ease",
            fill: "both",
        });
    };

    return (
        <div
            className="col-span-4 flex border-t divide-x relative"
            onMouseLeave={handleContainerLeave}
        >
            <div
                ref={bgRef}
                className="absolute top-4 left-0 bg-dark-700 pointer-events-none rounded-2xl border-0"
                style={{ opacity: 0, transform: "translateX(0px)" }}
            />

            {cards.map(({ title, description, icon, href }) => (
                <div
                    key={title}
                    className="p-8 flex-1 relative z-10 group"
                    onMouseEnter={(e) => slideToCard(e.currentTarget)}
                >
                    <a href={href} className="flex flex-col gap-2  h-full">
                        {icon}
                        <h3 className="font-medium text-lg">{title}</h3>
                        <p className="text-sm leading-relaxed mb-20">
                            {description}
                        </p>
                        <div className="mt-auto ml-auto aspect-square border rounded-full w-10 inline-flex items-center justify-center bg-dark-450 group-hover:border-accent group-hover:text-accent group-hover:bg-transparent">
                            <ArrowIcon />
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
}
