// rehype-french-colon.mjs

import { visit } from "unist-util-visit";

export function rehypeFrenchColon() {
    return (tree) => {
        visit(tree, "text", (node) => {
            // Remplace " :" (espace normale + deux-points) par " :" (espace insécable + deux-points)
            node.value = node.value.replace(/ :/g, "\u00A0:");
        });
    };
}
