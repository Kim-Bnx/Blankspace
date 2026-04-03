// contexts/page-map-context.tsx
"use client";

import { normalizePages } from "nextra/normalize-pages";
import { usePathname } from "next/navigation";
import {
    createContext,
    useContext,
    useMemo,
    type FC,
    type ReactNode,
} from "react";
import type { PageMapItem } from "nextra";

const PageMapContext = createContext<PageMapItem[]>([]);

export const PageMapProvider: FC<{
    pageMap: PageMapItem[];
    children: ReactNode;
}> = ({ pageMap, children }) => (
    <PageMapContext.Provider value={pageMap}>
        {children}
    </PageMapContext.Provider>
);

/** Retourne le résultat brut de normalizePages pour la route courante */
export function useNormalizedPages() {
    const pageMap = useContext(PageMapContext);
    const pathname = usePathname();

    return useMemo(
        () =>
            normalizePages({
                list: pageMap,
                route: pathname,
            }),
        [pageMap, pathname],
    );
}
