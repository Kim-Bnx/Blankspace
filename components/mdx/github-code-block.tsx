import { codeToHtml } from "shiki";
import { transformerMetaHighlight } from "@shikijs/transformers";
import { Pre, type PreProps } from "@/components/mdx/pre";

// Types
export interface CodeBlockProps {
    code: string;
    wrapper?: PreProps;
    lang: string;
    highlightLines?: string;
}

interface GithubCodeBlockProps {
    url: string;
    extractLines?: boolean;
    highlightLines?: string;
    wrapper?: PreProps;
}

interface GitHubReference {
    rawUrl: string;
    fromLine?: number;
    toLine?: number;
    highlightLines?: string;
}

// Helper functions
function formatHighlightLines(highlightLines?: string): string | undefined {
    if (!highlightLines) return undefined;
    return highlightLines.startsWith("{") && highlightLines.endsWith("}")
        ? highlightLines
        : `{${highlightLines}}`;
}

function getLanguageFromUrl(url: string): string {
    try {
        return url.split(".").pop()?.toLowerCase() || "text";
    } catch {
        return "text";
    }
}

function parseGitHubUrl(url: string): GitHubReference {
    try {
        const [githubUrl, loc] = url.split("#");

        if (!githubUrl) {
            throw new Error("Invalid GitHub URL");
        }

        let fromLine: number | undefined;
        let toLine: number | undefined;
        let highlightLines: string | undefined;

        if (loc) {
            const lineParts = loc.split("-");

            if (lineParts[0]?.startsWith("L")) {
                fromLine = parseInt(lineParts[0].slice(1), 10) - 1;

                if (lineParts[1]?.startsWith("L")) {
                    toLine = parseInt(lineParts[1].slice(1), 10) - 1;
                } else {
                    toLine = fromLine;
                }

                if (fromLine !== undefined && toLine !== undefined) {
                    const startLine = fromLine + 1;
                    const endLine = toLine + 1;
                    highlightLines =
                        startLine === endLine
                            ? `{${startLine}}`
                            : `{${startLine}-${endLine}}`;
                }
            }
        }

        const urlObj = new URL(githubUrl);
        const pathParts = urlObj.pathname.split("/").slice(1);

        if (pathParts.length < 5) {
            throw new Error("Invalid GitHub repository path");
        }

        const [org, repo, _, branch, ...pathSeg] = pathParts;

        if (!org || !repo || !branch || pathSeg.length === 0) {
            throw new Error("Missing required GitHub path components");
        }

        return {
            rawUrl: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join("/")}`,
            fromLine,
            toLine,
            highlightLines,
        };
    } catch (error) {
        console.error("Error parsing GitHub URL:", error);
        throw new Error(
            `Invalid GitHub URL: ${error instanceof Error ? error.message : String(error)}`,
        );
    }
}

async function fetchCode(url: string, fromLine?: number, toLine?: number) {
    try {
        const response = await fetch(url, { cache: "force-cache" });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch code: ${response.status} ${response.statusText}`,
            );
        }

        const content = await response.text();

        if (fromLine === undefined || toLine === undefined) {
            return content;
        }

        const lines = content.split("\n");
        const selectedLines = lines.slice(fromLine, toLine + 1);

        if (selectedLines.length === 0) {
            return content;
        }

        const commonIndent = selectedLines.reduce(
            (indent: number, line: string) => {
                if (line.length === 0) return indent;
                const spaces = line.match(/^\s+/);
                return spaces ? Math.min(indent, spaces[0].length) : 0;
            },
            Infinity,
        );

        return selectedLines
            .map((line) => {
                if (line.length === 0) return line;
                return line.slice(commonIndent < Infinity ? commonIndent : 0);
            })
            .join("\n");
    } catch (error) {
        console.error("Error fetching code:", error);
        return `// Error fetching code: ${error instanceof Error ? error.message : String(error)}`;
    }
}

// Components
export async function CodeBlock({
    code,
    lang,
    wrapper,
    highlightLines,
}: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang: lang || "text",
        themes: {
            light: "github-dark-dimmed",
            dark: "github-dark-dimmed",
        },
        transformers: highlightLines ? [transformerMetaHighlight()] : [],
        meta: highlightLines ? { __raw: highlightLines } : undefined,
    });

    // shiki génère <pre ...><code ...>CONTENU</code></pre>
    // On extrait l'inner HTML du <code> pour le passer comme enfant de notre Pre
    const codeInnerMatch = html.match(/<code[^>]*>([\s\S]*)<\/code>/);
    const codeInnerHtml = codeInnerMatch?.[1] ?? "";

    return (
        <Pre data-language={lang} data-copy="" {...wrapper}>
            <code
                className="nextra-code"
                dangerouslySetInnerHTML={{ __html: codeInnerHtml }}
            />
        </Pre>
    );
}

export default async function GithubCodeBlock({
    url,
    extractLines = false,
    highlightLines,
    wrapper,
}: GithubCodeBlockProps) {
    try {
        if (!url.includes("github.com")) {
            throw new Error("This component only supports GitHub URLs");
        }

        const reference = parseGitHubUrl(url);

        const formattedHighlightLines = formatHighlightLines(
            highlightLines || reference.highlightLines,
        );

        const code = await fetchCode(
            reference.rawUrl,
            extractLines ? reference.fromLine : undefined,
            extractLines ? reference.toLine : undefined,
        );

        const lang = getLanguageFromUrl(reference.rawUrl);

        return (
            <CodeBlock
                lang={lang}
                code={code}
                highlightLines={formattedHighlightLines}
                wrapper={wrapper}
            />
        );
    } catch (error) {
        console.error("Error in GithubCodeBlock:", error);
        return (
            <CodeBlock
                lang="text"
                code={`// Error: ${error instanceof Error ? error.message : String(error)}`}
                wrapper={wrapper}
            />
        );
    }
}
