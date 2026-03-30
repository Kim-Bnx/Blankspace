import cn from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef, FC } from "react";
import { ArrowUpRight } from "lucide-react";

export const EXTERNAL_URL_RE = /^https?:\/\//;

type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

type Props = Omit<NextLinkProps, "href"> & {
    href?: NextLinkProps["href"] | undefined;
};

export const Anchor: FC<Props> = ({ href = "", prefetch, ...props }) => {
    props = {
        ...props,
        className: cn("focus-visible:nextra-focus", props.className),
    };
    if (typeof href === "string") {
        if (href.startsWith("#")) {
            return <a href={href} {...props} />;
        }
        if (EXTERNAL_URL_RE.test(href)) {
            const { children } = props;
            return (
                <a href={href} target="_blank" rel="noreferrer" {...props}>
                    {children}
                    {typeof children === "string" && (
                        <>
                            &nbsp;
                            <ArrowUpRight
                                // based on font-size
                                size={16}
                                className="inline align-baseline shrink-0"
                            />
                        </>
                    )}
                </a>
            );
        }
    }
    return <Link href={href} prefetch={prefetch} {...props} />;
};
