import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";
import { PageHeader } from "@/components/page-header";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props) {
    const params = await props.params;
    const { metadata } = await importPage(params.mdxPath);
    return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
    const params = await props.params;
    const {
        default: MDXContent,
        toc,
        metadata,
        sourceCode,
    } = await importPage(params.mdxPath);

    console.log(metadata);
    return (
        <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
            <PageHeader
                title={metadata.title}
                description={metadata.description}
            />
            <div className="py-8 copy">
                <MDXContent {...props} params={params} />
            </div>
        </Wrapper>
    );
}
