import {
    type ComponentProps,
    Fragment,
    type HTMLAttributes,
    type ReactNode,
    useMemo,
} from "react";
import {
    type BaseLayoutProps,
    BaseLinkItem,
    type BaseLinkType,
    getLinks,
    type LinkItemType,
} from "../shared/index";
import {
    Sidebar,
    SidebarCollapseTrigger,
    type SidebarComponents,
    SidebarContent,
    SidebarContentMobile,
    SidebarFolder,
    SidebarFolderContent,
    SidebarFolderLink,
    SidebarFolderTrigger,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarPageTree,
    type SidebarProps,
    SidebarTrigger,
    SidebarViewport,
} from "../../sidebar";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import { cn } from "../../../lib/cn";
import { buttonVariants } from "../../ui/button";
import {
    ChevronDown,
    Languages,
    Sidebar as SidebarIcon,
    X,
} from "lucide-react";
import { LanguageToggle } from "../../language-toggle";
import { ThemeToggle } from "../../theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import type { PageTree } from "fumadocs-core/server";
import { LayoutBody, LayoutTabs, Navbar, NavbarSidebarTrigger } from "./client";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import { type Option, RootToggle } from "../../root-toggle";
import Link from "fumadocs-core/link";
import { LargeSearchToggle, SearchToggle } from "../../search-toggle";
import { HideIfEmpty } from "fumadocs-core/hide-if-empty";
import {
    getSidebarTabs,
    type GetSidebarTabsOptions,
} from "fumadocs-ui/utils/get-sidebar-tabs";
import TinyLogo from "@/app/tiny-logo";

export interface DocsLayoutProps extends BaseLayoutProps {
    tree: PageTree.Root;
    tabMode?: "sidebar" | "navbar";

    nav?: BaseLayoutProps["nav"] & {
        mode?: "top" | "auto";
    };

    sidebar?: SidebarOptions;

    containerProps?: HTMLAttributes<HTMLDivElement>;
}

interface SidebarOptions
    extends ComponentProps<"aside">,
        Pick<SidebarProps, "defaultOpenLevel" | "prefetch"> {
    components?: Partial<SidebarComponents>;

    /**
     * Root Toggle options
     */
    tabs?: Option[] | GetSidebarTabsOptions | false;

    banner?: ReactNode;
    footer?: ReactNode;

    /**
     * Support collapsing the sidebar on desktop mode
     *
     * @defaultValue true
     */
    collapsible?: boolean;
}

export function DocsLayout(props: DocsLayoutProps) {
    const {
        tabMode = "sidebar",
        nav: { transparentMode, ...nav } = {},
        sidebar: { tabs: tabOptions, ...sidebarProps } = {},
        i18n = false,
        disableThemeSwitch = false,
        themeSwitch = { enabled: !disableThemeSwitch },
    } = props;

    const navMode = nav.mode ?? "auto";
    const links = getLinks(props.links ?? [], props.githubUrl);
    const tabs = useMemo(() => {
        if (Array.isArray(tabOptions)) {
            return tabOptions;
        }

        if (typeof tabOptions === "object") {
            return getSidebarTabs(props.tree, tabOptions);
        }

        if (tabOptions !== false) {
            return getSidebarTabs(props.tree);
        }

        return [];
    }, [tabOptions, props.tree]);

    function sidebar() {
        const {
            banner,
            footer,
            components,
            collapsible = true,
            prefetch,
            defaultOpenLevel,
            ...rest
        } = sidebarProps;
        const iconLinks = links.filter((item) => item.type === "icon");

        const rootToggle = (
            <>
                {tabMode === "sidebar" && tabs.length > 0 && (
                    <RootToggle className="mb-2" options={tabs} />
                )}
                {tabMode === "navbar" && tabs.length > 0 && (
                    <RootToggle options={tabs} className="lg:hidden" />
                )}
            </>
        );

        const sidebarNav = (
            <div className="flex justify-between">
                <Link
                    href={nav.url ?? "/"}
                    className="inline-flex items-center gap-2.5 font-medium"
                >
                    {nav.title}
                </Link>
                {collapsible && (
                    <SidebarCollapseTrigger
                        className={cn(
                            buttonVariants({
                                color: "ghost",
                                size: "icon-sm",
                                className:
                                    "mt-px mb-auto text-fd-muted-foreground",
                            })
                        )}
                    >
                        <SidebarIcon />
                    </SidebarCollapseTrigger>
                )}
            </div>
        );

        const viewport = (
            <SidebarViewport>
                <div className="py-12 flex flex-col gap-2">
                    {links
                        .filter((item) => item.type !== "icon")
                        .map((item, i, arr) => (
                            <SidebarLinkItem
                                key={i}
                                item={item}
                                className={cn(
                                    "lg:hidden",
                                    i === arr.length - 1 && "mb-4"
                                )}
                            />
                        ))}
                    <SidebarPageTree components={components} />
                </div>
            </SidebarViewport>
        );

        const content = (
            <SidebarContent
                {...rest}
                className={cn(
                    navMode === "top"
                        ? "border-e-0 bg-transparent"
                        : "[--fd-nav-height:0px]",
                    rest.className
                )}
            >
                <HideIfEmpty as={SidebarHeader}>
                    {navMode === "auto" && sidebarNav}
                    {nav.children}
                    {banner}
                    {rootToggle}
                </HideIfEmpty>
                {viewport}
                <HideIfEmpty
                    as={SidebarFooter}
                    className="flex flex-row text-fd-muted-foreground items-center"
                >
                    {iconLinks.map((item, i) => (
                        <BaseLinkItem
                            key={i}
                            item={item}
                            className={cn(
                                buttonVariants({
                                    size: "icon-sm",
                                    color: "ghost",
                                    className: "lg:hidden",
                                })
                            )}
                            aria-label={item.label}
                        >
                            {item.icon}
                        </BaseLinkItem>
                    ))}
                    {footer}
                </HideIfEmpty>
            </SidebarContent>
        );

        const mobile = (
            <SidebarContentMobile {...rest}>
                <SidebarHeader>
                    <SidebarTrigger
                        className={cn(
                            buttonVariants({
                                size: "icon-sm",
                                color: "ghost",
                                className: "ms-auto text-fd-muted-foreground",
                            })
                        )}
                    >
                        <X />
                    </SidebarTrigger>
                    {banner}
                    {rootToggle}
                </SidebarHeader>
                {viewport}
                <HideIfEmpty
                    as={SidebarFooter}
                    className="flex flex-row items-center justify-end"
                >
                    {iconLinks.map((item, i) => (
                        <BaseLinkItem
                            key={i}
                            item={item}
                            className={cn(
                                buttonVariants({
                                    size: "icon-sm",
                                    color: "ghost",
                                }),
                                "text-fd-muted-foreground lg:hidden ",
                                i === iconLinks.length - 1 && "me-auto"
                            )}
                            aria-label={item.label}
                        >
                            {item.icon}
                        </BaseLinkItem>
                    ))}
                    {i18n ? (
                        <LanguageToggle>
                            <Languages className="size-4.5 text-fd-muted-foreground" />
                        </LanguageToggle>
                    ) : null}
                    {themeSwitch.enabled !== false &&
                        (themeSwitch.component ?? (
                            <ThemeToggle
                                mode={themeSwitch.mode ?? "light-dark-system"}
                            />
                        ))}
                    {footer}
                </HideIfEmpty>
            </SidebarContentMobile>
        );

        return (
            <Sidebar
                defaultOpenLevel={defaultOpenLevel}
                prefetch={prefetch}
                Content={content}
                Mobile={mobile}
            />
        );
    }

    return (
        <TreeContextProvider tree={props.tree}>
            <NavProvider transparentMode={transparentMode}>
                <LayoutBody
                    {...props.containerProps}
                    className={cn(props.containerProps?.className)}
                >
                    {sidebar()}
                    <DocsNavbar
                        {...props}
                        links={links}
                        tabs={tabMode == "navbar" ? tabs : []}
                    />
                    {props.children}
                </LayoutBody>
                <LayoutFooter />
            </NavProvider>
        </TreeContextProvider>
    );
}

function LayoutFooter() {
    return (
        <footer className="border-t">
            <div className="container mx-auto grid grid-cols-2 py-4">
                <div className="flex flex-col">
                    <a
                        className="inline-flex items-center gap-2.5 font-semibold"
                        href="/"
                    >
                        <svg
                            height="32"
                            viewBox="0 0 164 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M67.4083 35.5283C66.4689 35.5283 65.5802 35.403 64.7424 35.1525C63.9045 34.9269 63.1555 34.6137 62.4953 34.2128C61.8352 33.7869 61.2893 33.2983 60.8577 32.747C60.5589 32.3654 60.3331 31.9658 60.1803 31.5481C60.0665 31.2372 60.2708 30.9153 60.5913 30.8321C61.014 30.7223 61.4155 31.0699 61.3675 31.504L61.0705 34.1873C61.0144 34.6939 60.5862 35.0773 60.0765 35.0773H55.4975C54.9452 35.0773 54.4975 34.6296 54.4975 34.0773V8.30188C54.4975 7.7496 54.9452 7.30188 55.4975 7.30188H60.6194C61.1717 7.30188 61.6194 7.7496 61.6194 8.30188V18.971C61.6194 19.4453 61.1574 19.7823 60.7057 19.6374C60.3606 19.5267 60.1518 19.1683 60.2775 18.8283C60.4424 18.3825 60.6739 17.9606 60.972 17.5626C61.429 16.9863 61.9749 16.4852 62.6096 16.0592C63.2443 15.6082 63.9553 15.2699 64.7424 15.0444C65.5294 14.7938 66.3546 14.6686 67.2179 14.6686C68.9698 14.6686 70.5059 15.1196 71.8261 16.0216C73.1718 16.8986 74.2255 18.1264 74.9872 19.705C75.7743 21.2835 76.1678 23.0876 76.1678 25.1172C76.1678 27.1468 75.787 28.9509 75.0253 30.5295C74.2636 32.083 73.2226 33.3108 71.9023 34.2128C70.582 35.0898 69.084 35.5283 67.4083 35.5283ZM65.3517 29.7778C66.1642 29.7778 66.8497 29.5899 67.4083 29.214C67.9923 28.8131 68.4366 28.2744 68.7413 27.5978C69.0713 26.8963 69.2364 26.0694 69.2364 25.1172C69.2364 24.14 69.084 23.3006 68.7794 22.599C68.4747 21.8974 68.0304 21.3712 67.4464 21.0204C66.8624 20.6446 66.1642 20.4567 65.3517 20.4567C64.5392 20.4567 63.841 20.6446 63.257 21.0204C62.6731 21.3712 62.2161 21.8974 61.886 22.599C61.5813 23.3006 61.429 24.14 61.429 25.1172C61.429 26.0694 61.5813 26.8963 61.886 27.5978C62.2161 28.2744 62.6731 28.8131 63.257 29.214C63.841 29.5899 64.5392 29.7778 65.3517 29.7778Z"
                                fill="light-dark(#000, var(--light-200))"
                            ></path>
                            <path
                                d="M81.0867 35.1149C80.5344 35.1149 80.0867 34.6672 80.0867 34.1149V8.30188C80.0867 7.7496 80.5344 7.30188 81.0867 7.30188H86.1705C86.7228 7.30188 87.1705 7.7496 87.1705 8.30188V34.1149C87.1705 34.6671 86.7228 35.1149 86.1705 35.1149H81.0867Z"
                                fill="light-dark(#000, var(--light-200))"
                            ></path>
                            <path
                                d="M99.5237 35.4531C97.848 35.4531 96.3373 35.0146 94.9916 34.1376C93.6713 33.2356 92.6176 32.0078 91.8306 30.4543C91.0689 28.8757 90.688 27.0842 90.688 25.0796C90.688 23.025 91.0689 21.2209 91.8306 19.6674C92.5922 18.1139 93.6459 16.8986 94.9916 16.0216C96.3373 15.1196 97.886 14.6686 99.638 14.6686C100.577 14.6686 101.441 14.7938 102.228 15.0444C103.015 15.295 103.7 15.6583 104.284 16.1344C104.868 16.6105 105.376 17.1492 105.808 17.7505C106.066 18.1108 106.297 18.489 106.501 18.8852C106.694 19.2595 106.395 19.6801 105.974 19.6582C105.668 19.6423 105.427 19.3888 105.427 19.0815V16.082C105.427 15.5297 105.875 15.082 106.427 15.082H111.396C111.949 15.082 112.396 15.5297 112.396 16.082V34.1149C112.396 34.6671 111.949 35.1149 111.396 35.1149H106.275C105.722 35.1149 105.275 34.6672 105.275 34.1149V30.9282C105.275 30.5475 105.593 30.2441 105.973 30.2624C106.409 30.2834 106.708 30.7127 106.526 31.1099C106.331 31.5371 106.091 31.945 105.808 32.3336C105.376 32.96 104.843 33.5112 104.208 33.9873C103.573 34.4383 102.862 34.8017 102.075 35.0773C101.314 35.3278 100.463 35.4531 99.5237 35.4531ZM101.542 29.7026C102.355 29.7026 103.053 29.5272 103.637 29.1764C104.221 28.8006 104.665 28.2618 104.97 27.5603C105.3 26.8587 105.465 26.0318 105.465 25.0796C105.465 24.1024 105.3 23.263 104.97 22.5614C104.665 21.8598 104.221 21.3337 103.637 20.9829C103.053 20.607 102.355 20.4191 101.542 20.4191C100.73 20.4191 100.032 20.607 99.4475 20.9829C98.889 21.3337 98.4573 21.8598 98.1526 22.5614C97.848 23.263 97.6956 24.1024 97.6956 25.0796C97.6956 26.0318 97.848 26.8587 98.1526 27.5603C98.4573 28.2618 98.889 28.8006 99.4475 29.1764C100.032 29.5272 100.73 29.7026 101.542 29.7026Z"
                                fill="light-dark(#000, var(--light-200))"
                            ></path>
                            <path
                                d="M118.724 35.1149C118.172 35.1149 117.724 34.6672 117.724 34.1149V16.082C117.724 15.5297 118.172 15.082 118.724 15.082H123.423C123.947 15.082 124.381 15.4854 124.421 16.0071L124.621 18.6803C124.642 18.9501 124.473 19.1982 124.215 19.2787C123.778 19.4148 123.375 19.0175 123.577 18.6068C123.851 18.0497 124.223 17.5388 124.694 17.074C125.43 16.3223 126.306 15.7335 127.322 15.3075C128.337 14.8815 129.404 14.6686 130.521 14.6686C132.044 14.6686 133.327 14.9818 134.368 15.6082C135.434 16.2096 136.234 17.1241 136.767 18.3519C137.325 19.5546 137.605 21.033 137.605 22.7869V34.1149C137.605 34.6672 137.157 35.1149 136.605 35.1149H131.521C130.969 35.1149 130.521 34.6672 130.521 34.1149V23.3507C130.521 22.6992 130.419 22.1605 130.216 21.7346C130.013 21.2835 129.708 20.9453 129.302 20.7198C128.896 20.4943 128.414 20.394 127.855 20.4191C127.423 20.4191 127.017 20.4817 126.636 20.607C126.281 20.7323 125.963 20.9327 125.684 21.2084C125.405 21.4589 125.189 21.7471 125.037 22.0728C124.91 22.3986 124.846 22.7619 124.846 23.1628V34.1149C124.846 34.6671 124.399 35.1149 123.846 35.1149H121.304C120.441 35.1149 119.705 35.1149 119.095 35.1149C118.965 35.1149 118.842 35.1149 118.724 35.1149Z"
                                fill="light-dark(#000, var(--light-200))"
                            ></path>
                            <path
                                d="M150.387 28.6156C149.939 29.0301 149.228 28.9508 148.883 28.4479L146.802 25.4175C146.533 25.0244 146.578 24.4955 146.911 24.1539L155.451 15.3843C155.639 15.191 155.898 15.082 156.167 15.082H162.449C163.358 15.082 163.795 16.1977 163.128 16.8157L150.387 28.6156ZM143.606 35.1149C143.054 35.1149 142.606 34.6672 142.606 34.1149V8.30188C142.606 7.7496 143.054 7.30188 143.606 7.30188H148.728C149.28 7.30188 149.728 7.7496 149.728 8.30188V34.1149C149.728 34.6671 149.28 35.1149 148.728 35.1149H143.606ZM156.933 35.1149C156.617 35.1149 156.32 34.9653 156.131 34.7116L150.104 26.6069C149.771 26.1596 149.869 25.5266 150.321 25.1999L153.709 22.7495C154.144 22.4346 154.751 22.5201 155.082 22.943L163.352 33.4981C163.867 34.1544 163.399 35.1149 162.565 35.1149H156.933Z"
                                fill="light-dark(#000, var(--light-200))"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.5195 1.01753C18.6842 -0.231186 21.3509 -0.231264 23.5156 1.01753L35.583 7.97944C37.7499 9.22954 39.0849 11.5413 39.085 14.0429V27.957C39.0849 30.4587 37.75 32.7704 35.583 34.0205L23.5156 40.9824C21.3509 42.2312 18.6843 42.2311 16.5195 40.9824L4.45215 34.0205C2.28518 32.7704 0.950208 30.4587 0.950195 27.957V14.0429C0.950241 11.5413 2.28521 9.22954 4.45215 7.97944L16.5195 1.01753ZM27.0977 9.25972C26.7867 9.07633 26.4013 9.07401 26.0889 9.25483L18.6094 13.5859C17.9431 13.9717 17.9441 14.9343 18.6113 15.3183L24.5928 18.7578C24.903 18.9362 25.0938 19.2671 25.0938 19.625V26.3183C25.094 27.0892 25.9302 27.5699 26.5967 27.1826L33.2295 23.3232C33.5371 23.1441 33.7265 22.8149 33.7266 22.4589V13.7412C33.7266 13.3873 33.5392 13.0597 33.2344 12.8798L27.0977 9.25972Z"
                                fill="light-dark(#000, var(--accent-600))"
                            ></path>
                        </svg>
                    </a>
                    <div className="ml-10 text-muted-foreground">
                        Fait avec 🫀 pour la communauté de{" "}
                        <Link
                            className="font-medium underline"
                            href="https://www.forumactif.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            ForumActif.com
                        </Link>
                    </div>
                </div>
                <div className="flex justify-end items-end text-muted-foreground gap-4">
                    {["Contact", "Mentions légales", "Plan du site"].map(
                        (text, index) => (
                            <Fragment key={text}>
                                <Link
                                    href="#"
                                    className="font-medium underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {text}
                                </Link>
                            </Fragment>
                        )
                    )}
                </div>
            </div>
        </footer>
    );
}

function DocsNavbar({
    links,
    tabs,
    searchToggle = {},
    themeSwitch = {},
    nav = {},
    ...props
}: DocsLayoutProps & {
    links: LinkItemType[];
    tabs: Option[];
}) {
    const navMode = nav.mode ?? "auto";
    const sidebarCollapsible = props.sidebar?.collapsible ?? true;

    return (
        <Navbar mode={navMode}>
            <div className="flex items-center gap-6">
                <Link
                    href={nav.url ?? "/"}
                    className={cn(
                        "inline-flex items-center font-semibold",
                        navMode === "auto" && "md:hidden"
                    )}
                >
                    <TinyLogo />
                </Link>
                {tabs.length > 0 && <LayoutTabs options={tabs} />}
            </div>
            <div className="flex">
                <div
                    className={cn(
                        "items-center",
                        navMode === "top" && "flex flex-1",
                        navMode === "auto" && [
                            "hidden max-md:flex",
                            sidebarCollapsible &&
                                "has-data-[collapsed=true]:md:flex",
                        ]
                    )}
                >
                    {sidebarCollapsible && navMode === "auto" && (
                        <SidebarCollapseTrigger
                            className={cn(
                                buttonVariants({
                                    color: "ghost",
                                    size: "icon-sm",
                                }),
                                "text-fd-muted-foreground data-[collapsed=false]:hidden max-md:hidden"
                            )}
                        >
                            <SidebarIcon />
                        </SidebarCollapseTrigger>
                    )}
                </div>
                {searchToggle.enabled !== false &&
                    (searchToggle.components?.lg ? (
                        <div
                            className={cn(
                                "w-full my-auto max-md:hidden",
                                navMode === "top"
                                    ? "rounded-xl max-w-sm"
                                    : "max-w-[240px]"
                            )}
                        >
                            {searchToggle.components.lg}
                        </div>
                    ) : (
                        <LargeSearchToggle
                            hideIfDisabled
                            className={cn("w-full my-auto max-md:hidden")}
                        />
                    ))}
                <div className="flex flex-1 items-center md:gap-2 ml-4">
                    {nav.children}
                    {links
                        .filter((item) => item.type === "icon")
                        .map((item, i) => (
                            <BaseLinkItem
                                key={i}
                                item={item}
                                className={cn(
                                    buttonVariants({
                                        size: "icon-sm",
                                        color: "ghost",
                                    }),
                                    "text-fd-muted-foreground max-lg:hidden"
                                )}
                                aria-label={item.label}
                            >
                                {item.icon}
                            </BaseLinkItem>
                        ))}

                    <div className="flex items-center md:hidden">
                        {searchToggle.enabled !== false &&
                            (searchToggle.components?.sm ?? (
                                <SearchToggle hideIfDisabled className="p-2" />
                            ))}
                        <NavbarSidebarTrigger className="p-2 -me-1.5" />
                    </div>

                    <div className="flex items-center gap-2 max-md:hidden">
                        {themeSwitch.enabled !== false &&
                            (themeSwitch.component ?? (
                                <ThemeToggle
                                    mode={
                                        themeSwitch.mode ?? "light-dark-system"
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </Navbar>
    );
}

function NavbarLinkItem({
    item,
    ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
    if (item.type === "menu") {
        return (
            <Popover>
                <PopoverTrigger
                    {...props}
                    className={cn(
                        "inline-flex items-center gap-1.5 has-data-[active=true]:text-fd-primary",
                        props.className
                    )}
                >
                    {item.url ? (
                        <BaseLinkItem item={item as BaseLinkType}>
                            {item.text}
                        </BaseLinkItem>
                    ) : (
                        item.text
                    )}
                    <ChevronDown className="size-3" />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col">
                    {item.items.map((child, i) => {
                        if (child.type === "custom")
                            return (
                                <Fragment key={i}>{child.children}</Fragment>
                            );

                        return (
                            <BaseLinkItem
                                key={i}
                                item={child}
                                className="inline-flex items-center gap-2 rounded-md p-2 text-start hover:bg-fd-accent hover:text-fd-accent-foreground data-[active=true]:text-fd-primary [&_svg]:size-4"
                            >
                                {child.icon}
                                {child.text}
                            </BaseLinkItem>
                        );
                    })}
                </PopoverContent>
            </Popover>
        );
    }

    if (item.type === "custom") return item.children;

    return (
        <BaseLinkItem item={item} {...props}>
            {item.text}
        </BaseLinkItem>
    );
}

function SidebarLinkItem({
    item,
    ...props
}: {
    item: Exclude<LinkItemType, { type: "icon" }>;
    className?: string;
}) {
    if (item.type === "menu")
        return (
            <SidebarFolder {...props}>
                {item.url ? (
                    <SidebarFolderLink href={item.url} external={item.external}>
                        {item.icon}
                        {item.text}
                    </SidebarFolderLink>
                ) : (
                    <SidebarFolderTrigger>
                        {item.icon}
                        {item.text}
                    </SidebarFolderTrigger>
                )}
                <SidebarFolderContent>
                    {item.items.map((child, i) => (
                        <SidebarLinkItem key={i} item={child} />
                    ))}
                </SidebarFolderContent>
            </SidebarFolder>
        );

    if (item.type === "custom") return <div {...props}>{item.children}</div>;

    return (
        <SidebarItem
            href={item.url}
            icon={item.icon}
            external={item.external}
            {...props}
        >
            {item.text}
        </SidebarItem>
    );
}

export { Navbar, NavbarSidebarTrigger };
