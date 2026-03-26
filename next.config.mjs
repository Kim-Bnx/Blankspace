import nextra from "nextra";

// Set up Nextra with its configuration
const withNextra = nextra({
    contentDirBasePath: "/docs", // Or even nested e.g. `/docs/advanced`
});

// Export the final Next.js config with Nextra included
export default withNextra({});
