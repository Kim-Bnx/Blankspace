"use client";

import { useEffect, useRef } from "react";

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

const EMOJIS = shuffle(["❤️", "🎶", "💅", "🍁", "🥖", "🏳️‍🌈", "🤝", "💃"]);

export function EmojiCarousel() {
    const ref = useRef<HTMLSpanElement>(null);
    const indexRef = useRef(0);

    useEffect(() => {
        const el = ref.current!;
        el.textContent = EMOJIS[0];
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";

        const TRANSITION =
            "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1)";

        const interval = setInterval(() => {
            const next = (indexRef.current + 1) % EMOJIS.length;

            // 1. Slide out vers le haut
            el.style.transition = TRANSITION;
            el.style.transform = "translateY(-100%)";
            el.style.opacity = "0";

            setTimeout(() => {
                // 2. Snap en bas sans transition, swap emoji
                el.style.transition = "none";
                el.style.transform = "translateY(100%)";
                el.style.opacity = "0";
                el.textContent = EMOJIS[next];

                // 3. Force reflow, puis slide in
                el.offsetHeight;
                el.style.transition = TRANSITION;
                el.style.transform = "translateY(0)";
                el.style.opacity = "1";

                indexRef.current = next;
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className="relative inline-block overflow-hidden"
            style={{ width: "1.4em", height: "1.2em", verticalAlign: "middle" }}
        >
            <span
                ref={ref}
                className="absolute inset-0 flex items-center justify-center"
            />
        </span>
    );
}
