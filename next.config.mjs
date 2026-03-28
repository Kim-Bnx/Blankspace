import nextra from "nextra";
import rehypeShiki from "@shikijs/rehype";

// Set up Nextra with its configuration
const withNextra = nextra({
    contentDirBasePath: "/docs", // Or even nested e.g. `/docs/advanced`
    defaultShowCopyCode: true,
});

// Export the final Next.js config with Nextra included
export default withNextra({});
