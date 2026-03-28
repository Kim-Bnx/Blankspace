"use client";

import {
    createContext,
    useContext,
    useRef,
    type FC,
    type ReactNode,
    type RefObject,
} from "react";

const ScrollContext = createContext<RefObject<HTMLElement | null>>({
    current: null,
});

export const useScrollContainer = () => useContext(ScrollContext);

export const ScrollProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLElement>(null);
    return (
        <ScrollContext.Provider value={ref}>{children}</ScrollContext.Provider>
    );
};
