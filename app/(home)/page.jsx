import {
    Download,
    BookOpen,
    MessageCircleQuestionMark,
    ArrowUpRight,
    MessagesSquare,
} from "lucide-react";
import { LogoIcon } from "../logo-icon";
import ArrowIcon from "@/components/arrow-icon";
import { Navbar } from "../../components/navbar";
import FALogo from "../../components/fa-logo";
import { getPageMap } from "nextra/page-map";
import { NavbarBlob } from "../../components/navbar-blob";
import { DocumentationCards } from "@/components/home/documentation-cards";
import { ShowcaseGrid } from "@/components/home/showcase-grid";
import { EmojiCarousel } from "@/components/home/emoji-carousel";
import LogoText from "@/app/logo-text";
import GithubIcon from "../../components/github-icon";
import TumblrIcon from "../../components/tumblr-icon";
import DiscordIcon from "../../components/discord-icon";
import MediaText from "../../components/media-text";

// ---------------------------------------------------------------------------
// SectionHeader
// Eyebrow mono + heading h2. Utilisé dans toutes les sections de la page.
// ---------------------------------------------------------------------------
function SectionHeader({ eyebrow, heading, className = "" }) {
    return (
        <div
            className={`col-span-4 text-primary-foreground flex flex-col gap-2 ${className}`}
        >
            <h3 className="text-sm text-light-800 !font-mono">{eyebrow}</h3>
            <h2 className="text-4xl">{heading}</h2>
        </div>
    );
}

// ---------------------------------------------------------------------------
// QuickLinkCard
// Carte avec icône, titre, description et bouton lien rond.
// variant="accent"  → fond accent, texte sombre, bouton accent-600
// variant="border"  → fond transparent, bordure, bouton dark-450
// ---------------------------------------------------------------------------
function QuickLinkCard({ icon, title, description, href, variant = "border" }) {
    const isAccent = variant === "accent";
    return (
        <div
            className={`rounded-4xl p-6 flex flex-col gap-2 group ${
                isAccent
                    ? "bg-accent text-dark-500"
                    : "border text-primary-foreground"
            }`}
        >
            {icon}
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm leading-relaxed">{description}</p>
            <div className="mt-auto ml-auto">
                <a
                    href={href}
                    className={`aspect-square w-10 inline-flex items-center justify-center rounded-full ${
                        isAccent ? "bg-accent-600" : "bg-dark-450 border"
                    }`}
                >
                    <ArrowIcon />
                </a>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// SliderItem
// Item numéroté du slider (index formaté + titre).
// ---------------------------------------------------------------------------
function SliderItem({ index, title, isLast = false }) {
    return (
        <li className={`p-12 ${!isLast ? "border-b" : ""}`}>
            <span className="font-mono text-light-800 text-sm">
                {String(index).padStart(2, "0")}
            </span>
            <h2 className="text-2xl font-semibold text-primary-foreground">
                {title}
            </h2>
        </li>
    );
}

// ---------------------------------------------------------------------------
// CommunityCard
// Carte de lien vers une plateforme communautaire.
//
// layout="stacked"  → icône seule au-dessus du titre + description (Discord)
// layout="inline"   → icône + titre/description côte à côte en header (Github, Tumblr)
// ---------------------------------------------------------------------------
function CommunityCard({
    icon,
    title,
    description,
    href,
    className = "",
    buttonClassName = "bg-neutral-200",
    layout = "inline",
}) {
    return (
        <div className={`rounded-2xl p-6 flex flex-col gap-3 ${className}`}>
            {layout === "stacked" ? (
                <>
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-background rounded-md">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="text-lg -mt-2">{description}</p>
                </>
            ) : (
                <div className="flex gap-4 mb-4 items-center">
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 aspect-square bg-background rounded-md">
                        {icon}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-semibold">{title}</h3>
                        <p className="text-lg -mt-2">{description}</p>
                    </div>
                </div>
            )}
            <a
                href={href}
                className={`w-12 mt-auto flex ml-auto items-center justify-center aspect-square rounded-full ${buttonClassName}`}
            >
                <ArrowUpRight size={18} />
            </a>
        </div>
    );
}

// ---------------------------------------------------------------------------
// HomePageSlider
// ---------------------------------------------------------------------------
function HomePageSlider() {
    const items = [
        {
            title: "Des codes simplifiés, commentés et plus facile à comprendre",
        },
        { title: "Un design minimaliste comme point de départ à vos idées" },
        { title: "Des fonctionnalités pratiques pour améliorer l'expérience" },
    ];

    return (
        <div className="grid grid-cols-2">
            <aside className="border-r">
                <ul>
                    {items.map((item, i) => (
                        <SliderItem
                            key={i}
                            index={i + 1}
                            title={item.title}
                            isLast={i === items.length - 1}
                        />
                    ))}
                </ul>
            </aside>
            <section>test</section>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function Home() {
    const pageMap = await getPageMap("/docs");

    return (
        <section className="max-w-7xl mx-auto my-2 space-y-24">
            <Navbar pageMap={pageMap} mode="home" />

            {/* Hero */}
            <div className="max-w-7xl p-12 rounded-3xl bg-linear-to-b from-card to-background pb-40 overflow-hidden relative">
                <div className="absolute left-0 top-0 w-full z-0">
                    <NavbarBlob position="top" mode="home" />
                </div>
                <section className="my-10 mx-auto flex flex-col items-center gap-10 w-3xl z-10 relative">
                    <div className="text-accent">
                        <LogoIcon size={130} className="text-accent" />
                    </div>
                    <h2 className="text-6xl text-center">
                        Créez des thèmes <br />à l'image de vos univers
                    </h2>
                    <div className="text-sm text-light-300 -mt-4 flex items-center gap-2">
                        Framework pour <FALogo size={20} />
                    </div>
                </section>
                <div className="mx-auto w-3xl text-center z-10 relative mt-20">
                    <span className="bg-dark-500 border rounded-full px-4 py-1.5 text-sm font-mono text-accent-alt">
                        Version 4
                    </span>
                </div>
            </div>

            {/* À propos */}
            <section className="px-12 relative -mt-44 z-0">
                <div className="w-full h-1/2 bg-background rounded-t-[100%] blur-[50px] absolute left-1/2 transform -translate-x-1/2 -top-40 -z-10" />
                <div className="border">
                    <div className="grid p-12 grid-cols-4 gap-6">
                        <div className="col-span-2 text-primary-foreground flex flex-col gap-2">
                            <h3 className="text-sm text-light-800">À propos</h3>
                            <h2 className="text-4xl">
                                Démarrez votre forum
                                <br />
                                avec l'essentiel
                            </h2>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-6">
                            <QuickLinkCard
                                variant="accent"
                                icon={<Download />}
                                title="Installation"
                                description="Installation automatique en quelques cliques."
                                href="/theme"
                            />
                            <QuickLinkCard
                                variant="border"
                                icon={<BookOpen />}
                                title="Guide"
                                description="Installation étape par étape, pour découvrir le fonctionnement du thème."
                                href="/theme"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 grid-cols-2 border-t">
                        <HomePageSlider />
                    </div>
                </div>
            </section>

            {/* Documentation */}
            <section className="px-12 relative">
                <div className="border">
                    <div className="grid p-12 grid-cols-4 gap-6">
                        <SectionHeader
                            eyebrow="Documentation"
                            heading="Explorez nos guides et nos outils"
                        />
                    </div>
                    <DocumentationCards
                        cards={[
                            {
                                title: "Personnalisation",
                                description:
                                    "Apprenez à modifier un thème Forumactif.",
                                icon: (
                                    <svg
                                        width="32"
                                        viewBox="0 0 254 240"
                                        fill="none"
                                        className="text-[#EC835F]"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.6"
                                            d="M226.667 173.333H26.6667C11.9391 173.333 0 185.272 0 200V213.333C0 228.061 11.9391 240 26.6667 240H226.667C241.394 240 253.333 228.061 253.333 213.333V200C253.333 185.272 241.394 173.333 226.667 173.333Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.8"
                                            d="M226.667 0H200C185.272 0 173.333 11.9391 173.333 26.6667V133.333C173.333 148.061 185.272 160 200 160H226.667C241.394 160 253.333 148.061 253.333 133.333V26.6667C253.333 11.9391 241.394 0 226.667 0Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M133.333 0H26.6667C11.9391 0 0 11.9391 0 26.6667V133.333C0 148.061 11.9391 160 26.6667 160H133.333C148.061 160 160 148.061 160 133.333V26.6667C160 11.9391 148.061 0 133.333 0Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ),
                                href: "/guide-1",
                            },
                            {
                                title: "Plugins",
                                description:
                                    "Ajoutez des fonctionnalités créées par la communauté.",
                                icon: (
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 447 447"
                                        fill="none"
                                        className="text-[#8492D3]"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.6"
                                            d="M160.417 229.167H45.8333C20.5203 229.167 0 249.687 0 275V389.583C0 414.896 20.5203 435.417 45.8333 435.417H160.417C185.73 435.417 206.25 414.896 206.25 389.583V275C206.25 249.687 185.73 229.167 160.417 229.167Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.6"
                                            d="M389.583 0H275C249.687 0 229.167 20.5203 229.167 45.8333V160.417C229.167 185.73 249.687 206.25 275 206.25H389.583C414.896 206.25 435.417 185.73 435.417 160.417V45.8333C435.417 20.5203 414.896 0 389.583 0Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M160.417 0H45.8333C20.5203 0 0 20.5203 0 45.8333V160.417C0 185.73 20.5203 206.25 45.8333 206.25H160.417C185.73 206.25 206.25 185.73 206.25 160.417V45.8333C206.25 20.5203 185.73 0 160.417 0Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M275 229.167C249.687 229.167 229.167 249.687 229.167 275V403.008C229.167 423.424 253.851 433.648 268.288 419.212L311.341 376.159L368.633 433.45C386.532 451.349 415.551 451.349 433.451 433.45C451.35 415.551 451.35 386.532 433.451 368.633L376.159 311.341L419.212 268.288C433.649 253.851 423.424 229.167 403.008 229.167H275Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ),
                                href: "/guide-2",
                            },
                            {
                                title: "Tutoriaux",
                                description:
                                    "Découvrez des guides généraux sur Forumactif.",
                                icon: (
                                    <svg
                                        width="32"
                                        viewBox="0 0 281 207"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-[#FFCB18]"
                                    >
                                        <path
                                            d="M250.75 0H29.5C13.2076 0 0 13.2076 0 29.5C0 45.7924 13.2076 59 29.5 59H250.75C267.042 59 280.25 45.7924 280.25 29.5C280.25 13.2076 267.042 0 250.75 0Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.8"
                                            d="M132.75 73.75H29.5C13.2076 73.75 0 86.9576 0 103.25C0 119.542 13.2076 132.75 29.5 132.75H132.75C149.042 132.75 162.25 119.542 162.25 103.25C162.25 86.9576 149.042 73.75 132.75 73.75Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.6"
                                            d="M191.75 147.5H29.5C13.2076 147.5 0 160.708 0 177C0 193.292 13.2076 206.5 29.5 206.5H191.75C208.042 206.5 221.25 193.292 221.25 177C221.25 160.708 208.042 147.5 191.75 147.5Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ),
                                href: "/guide-3",
                            },
                            {
                                title: "Ressources",
                                description:
                                    "Utilisez des variantes et codes prêts à l'emploi.",
                                icon: (
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 618 618"
                                        fill="none"
                                        className="text-[#FD3542]"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.6"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M546.806 617.361H242.148L524.371 335.139H546.806C585.772 335.139 617.361 366.727 617.361 405.694V546.806C617.361 585.772 585.772 617.361 546.806 617.361Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.8"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M329.323 89.6653C356.877 62.1116 401.551 62.1116 429.105 89.6653L528.884 189.447C556.438 217 556.438 261.673 528.884 289.226L317.512 500.6V101.476L329.323 89.6653Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M70.5555 0C31.5895 0 0 31.5895 0 70.5555V476.25C0 554.184 63.1772 617.361 141.111 617.361C219.045 617.361 282.222 554.184 282.222 476.25V70.5555C282.222 31.5895 250.634 0 211.667 0H70.5555ZM141.111 529.167C170.337 529.167 194.028 505.476 194.028 476.25C194.028 447.024 170.337 423.333 141.111 423.333C111.887 423.333 88.1944 447.024 88.1944 476.25C88.1944 505.476 111.887 529.167 141.111 529.167Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ),
                                href: "/guide-4",
                            },
                        ]}
                    />
                </div>
            </section>

            {/* Au service de tous */}
            <section className="px-12 relative">
                <div className="border grid grid-cols-2 divide-x">
                    <div className="grid p-12 grid-cols-2 gap-6">
                        <div className="col-span-4 text-primary-foreground flex flex-col gap-2">
                            <SectionHeader
                                eyebrow="Au service de tous"
                                heading={
                                    <>
                                        Trouvez de l'aide <br /> quand vous en
                                        avez besoin
                                    </>
                                }
                                className="mb-6"
                            />
                            <MediaText
                                media={
                                    <MessageCircleQuestionMark className="text-accent" />
                                }
                                title="Support"
                                description="Une communauté toujours prête à vous aider dans vos projets"
                            />
                            <MediaText
                                media={
                                    <MessageCircleQuestionMark className="text-accent" />
                                }
                                title="Ressources"
                                description="Aidez-vous d'un large panel d'outils tel que des tutoriaux"
                            />
                            <MediaText
                                media={
                                    <MessageCircleQuestionMark className="text-accent" />
                                }
                                title="Communauté"
                                description="Participez à la vie et l'évolution du projet"
                            />
                            <CommunityCard
                                layout="stacked"
                                className="bg-accent text-background w-2/3 mt-12"
                                icon={
                                    <MessagesSquare
                                        size={24}
                                        className="text-accent"
                                    />
                                }
                                title="Forum d'entraide"
                                description="Explorez le forum vitrine du thème et rejoignez la communauté de partage et d’entraide !"
                                href="#"
                                buttonClassName="bg-accent-600"
                            />
                        </div>
                    </div>
                    <div>test</div>
                </div>
            </section>

            {/* Vitrines */}
            <section className="px-12 relative">
                <ShowcaseGrid
                    cells={[
                        <div>1</div>,
                        <div>2</div>,
                        <div>3</div>,
                        <div>4</div>,
                        <div>5</div>,
                        <div>8</div>,
                        <div>9</div>,
                        <div>10</div>,
                        <div>11</div>,
                        <div>12</div>,
                    ]}
                />
            </section>

            {/* Communauté */}
            <section className="px-12 relative">
                <div className="border grid grid-cols-3">
                    <div className="p-12 gap-6">
                        <SectionHeader
                            eyebrow="Autour du projet"
                            heading="Rejoignez la communauté"
                        />
                    </div>
                    <div className="col-span-2 p-12 grid grid-cols-2 grid-rows-2 gap-6">
                        <CommunityCard
                            layout="stacked"
                            className="row-span-2 bg-accent text-background"
                            icon={
                                <DiscordIcon
                                    size={24}
                                    className="text-accent"
                                />
                            }
                            title="Discord"
                            description="Serveur d'entraide de la communauté Forumactif."
                            href="#"
                            buttonClassName="bg-accent-600"
                        />
                        <CommunityCard
                            layout="inline"
                            className="bg-white text-background"
                            icon={
                                <GithubIcon
                                    size={24}
                                    className="text-light-100"
                                />
                            }
                            title="Github"
                            description="Code source du thème."
                            href="#"
                            buttonClassName="bg-neutral-200"
                        />
                        <CommunityCard
                            layout="inline"
                            className="bg-accent-alt text-background"
                            icon={
                                <TumblrIcon
                                    size={20}
                                    className="text-accent-alt"
                                />
                            }
                            title="Tumblr"
                            description="Devblog du Blank."
                            href="#"
                            buttonClassName="bg-accent-alt-dark"
                        />
                    </div>
                </div>
            </section>

            <footer className="px-12 relative my-30">
                <div className="flex justify-between">
                    <div></div>
                    <div className="flex flex-col gap-2 items-center">
                        <LogoText size={100} className="text-accent" />

                        <div className="text-light-800 text-lg">
                            Fait avec <EmojiCarousel /> pour la communauté de
                            Forumactif
                        </div>
                    </div>
                    <div></div>
                </div>
            </footer>
        </section>
    );
}
