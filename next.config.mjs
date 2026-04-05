import nextra from "nextra";
import { rehypeFrenchColon } from "./lib/rehype-french-colon.mjs";

const withNextra = nextra({
    contentDirBasePath: "/docs",
    defaultShowCopyCode: true,
    mdxOptions: {
        rehypePrettyCodeOptions: {
            theme: "github-dark-dimmed",
        },
        rehypePlugins: [rehypeFrenchColon],
    },
});

export default withNextra({});
