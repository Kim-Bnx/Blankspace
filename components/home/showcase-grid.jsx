"use client";

import { useRef } from "react";
import ArrowIcon from "@/components/arrow-icon";

const GAP = 16;

const getVisualPos = (el) => {
    const matrix = new DOMMatrix(getComputedStyle(el).transform);
    return { x: matrix.m41, y: matrix.m42 };
};

export function ShowcaseGrid({ cells }) {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const slideAnim = useRef(null);
    const fadeAnim = useRef(null);
    const visible = useRef(false);

    const slideToCell = (cellEl) => {
        const bg = bgRef.current;
        if (!bg) return;

        const x = cellEl.offsetLeft + GAP;
        const y = cellEl.offsetTop + GAP;
        const w = cellEl.offsetWidth - GAP * 2;
        const h = cellEl.offsetHeight - GAP * 2;

        bg.style.width = `${w}px`;
        bg.style.height = `${h}px`;

        if (!visible.current) {
            slideAnim.current?.cancel();
            bg.style.transform = `translate(${x}px, ${y}px)`;
            visible.current = true;

            fadeAnim.current?.cancel();
            fadeAnim.current = bg.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                easing: "ease",
                fill: "both",
            });
        } else {
            const { x: fromX, y: fromY } = getVisualPos(bg);
            slideAnim.current?.cancel();
            bg.style.transform = `translate(${fromX}px, ${fromY}px)`;

            slideAnim.current = bg.animate(
                [
                    { transform: `translate(${fromX}px, ${fromY}px)` },
                    { transform: `translate(${x}px, ${y}px)` },
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
            ref={containerRef}
            className="border grid grid-cols-4 grid-rows-3 divide-x relative"
            onMouseLeave={handleContainerLeave}
        >
            {/* Bg partagé */}
            <div
                ref={bgRef}
                className="absolute top-0 left-0 bg-dark-700 pointer-events-none rounded-2xl border-0"
                style={{ opacity: 0, transform: "translate(0px, 0px)" }}
            />

            {/* Row 1 — cells 1 à 4 */}
            {cells.slice(0, 4).map((cell, i) => (
                <div
                    key={i}
                    className="border-b relative z-10 p-6"
                    onMouseEnter={(e) => slideToCell(e.currentTarget)}
                >
                    {cell}
                </div>
            ))}

            {/* Row 2 — cell 5, centre fixe (col-span-2), cell 8 */}
            <div
                className="border-b relative z-10 p-6"
                onMouseEnter={(e) => slideToCell(e.currentTarget)}
            >
                {cells[4]}
            </div>

            {/* Cellule centrale — exclue du hover */}
            <div
                className="col-span-2 py-12 p-8 border-b flex flex-col gap-4 overflow-hidden relative z-10"
                onMouseEnter={handleContainerLeave}
            >
                <h3 className="text-2xl mx-auto">Explorez les univers</h3>
                <a
                    className="border px-3 py-1 mx-auto rounded-full flex group bg-background"
                    href="#"
                >
                    Vitrine de forums
                    <span className="bg-accent aspect-square flex items-center justify-center rounded-full ml-8 -mr-2">
                        <ArrowIcon />
                    </span>
                </a>
                <div className="w-full h-[450px] bg-accent rounded-full blur-[100px] opacity-10 absolute top-full -z-10" />
            </div>

            <div
                className="border-b border-r-0 relative z-10 p-6"
                onMouseEnter={(e) => slideToCell(e.currentTarget)}
            >
                {cells[5]}
            </div>

            {/* Row 3 — cells 9 à 12 */}
            {cells.slice(6, 10).map((cell, i) => (
                <div
                    key={i + 6}
                    className={`relative z-10 p-6 ${i === 3 ? "" : ""}`}
                    onMouseEnter={(e) => slideToCell(e.currentTarget)}
                >
                    {cell}
                </div>
            ))}
        </div>
    );
}
