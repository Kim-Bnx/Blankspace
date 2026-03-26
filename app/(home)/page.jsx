import { ChevronUp, Download, BookOpen } from "lucide-react";
import { LogoFull } from "../logo-full";
import { cn } from "@/lib/cn";
import { LogoIcon } from "../logo-icon";
import ArrowIcon from "../../components/arrow-icon";
import Navbar from "../../components/navbar";
import FALogo from "../../components/fa-logo";

function HomePageSlider() {
    //créer un slider avec tailwindcss
    return (
        <div className="grid grid-cols-2">
            <aside className="border-r">
                <ul>
                    <li className="p-12 border-b">
                        <span className="font-mono text-light-800 text-sm">
                            01
                        </span>
                        <h2 className="text-2xl font-semibold text-primary-foreground">
                            Des codes simplifiés, commentés et plus facile à
                            comprendre
                        </h2>
                    </li>
                    <li className="p-12 border-b">
                        <span className="font-mono text-light-800 text-sm">
                            02
                        </span>
                        <h2 className="text-2xl font-semibold text-primary-foreground">
                            Un design minimaliste comme point de départ à vos
                            idées
                        </h2>
                    </li>
                    <li className="p-12">
                        <span className="font-mono text-light-800 text-sm">
                            03
                        </span>
                        <h2 className="text-2xl font-semibold text-primary-foreground">
                            Des fonctionnalités pratiques pour améliorer
                            l'expérience
                        </h2>
                    </li>
                </ul>
            </aside>
            <section>test</section>
        </div>
    );
}

export default function Home() {
    // active link
    return (
        <section className="max-w-7xl mx-auto my-2 space-y-2">
            <Navbar />
            <div className="max-w-7xl p-12 rounded-3xl bg-linear-to-b from-card to-background pb-40">
                <div className="w-2xl h-[450px] bg-accent rounded-[100%] opacity-[0.06] blur-[75px] absolute left-1/2 transform -translate-x-1/2 top-0 -translate-y-1/2 "></div>

                <section className="my-10 mx-auto flex flex-col items-center gap-10 w-3xl z-10 relative">
                    <div className="text-accent">
                        <LogoIcon size={130} className="text-accent" />
                    </div>
                    <h2 className="text-6xl text-center">
                        Créez des thèmes <br />à l’image de vos univers
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

            <section className="min-h-screen px-12 relative -mt-20 z-0">
                <div className="w-full h-1/2 bg-background rounded-t-[100%] blur-[50px] absolute left-1/2 transform -translate-x-1/2 -top-40 -z-10 "></div>
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
                            <div className="bg-accent text-dark-500 rounded-4xl p-6 flex flex-col gap-2 group">
                                <Download />
                                <h3 className="font-medium text-lg">
                                    Installation
                                </h3>
                                <p className="text-sm leading-relaxed">
                                    Installation automatique en quelques
                                    cliques.
                                </p>
                                <div className="mt-auto ml-auto">
                                    <a
                                        href="/theme"
                                        className="aspect-square bg-accent-600 w-10 inline-flex items-center justify-center rounded-full "
                                    >
                                        <ArrowIcon />
                                    </a>
                                </div>
                            </div>
                            <div className="border rounded-4xl text-primary-foreground p-6 flex flex-col gap-2 group">
                                <BookOpen />
                                <h3 className="font-medium text-lg">Guide</h3>
                                <p className="text-sm leading-relaxed">
                                    Installation étape par étape, pour découvrir
                                    le fonctionnement du thème.
                                </p>
                                <div className="mt-auto ml-auto">
                                    <a
                                        href="/theme"
                                        className="aspect-square bg-dark-450 border w-10 inline-flex items-center justify-center rounded-full"
                                    >
                                        <ArrowIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 grid-cols-2 border-t">
                        <HomePageSlider />
                    </div>
                </div>
            </section>
        </section>
    );
}
