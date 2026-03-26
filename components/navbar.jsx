"use client";
import TinyLogo from "@/app/tiny-logo";
import { ArrowUpRight, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links = [
    { title: "Thème", href: "/theme", childrens: [{}] },
    { title: "Forumactif", href: "/forumactif", childrens: [{}] },
    { title: "Plugins", href: "/plugins" },
    { title: "Tutoriaux", href: "/tutoriaux" },
    { title: "Ressources", href: "/ressources", childrens: [{}] },
];

export default function Navbar({}) {
    const activeLink = links.find((link) => link.href === usePathname());

    useEffect(() => {
        // The debounce function receives our function as a parameter
        const debounce = (fn) => {
            // This holds the requestAnimationFrame reference, so we can cancel it if we wish
            let frame;
            // The debounce function returns a new function that can receive a variable number of arguments
            return (...params) => {
                // If the frame variable has been defined, clear it now, and queue for next frame
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                // Queue our function call for the next frame
                frame = requestAnimationFrame(() => {
                    // Call our function and pass any params we received
                    fn(...params);
                });
            };
        };

        // Reads out the scroll position and stores it in the data attribute
        // so we can use it in our stylesheets
        const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY;
        };

        // Listen for new scroll events, here we debounce our `storeScroll` function
        document.addEventListener("scroll", debounce(storeScroll), {
            passive: true,
        });

        // Update scroll position for first time
        storeScroll();
    });

    return (
        <nav className="navbar transition-colors sticky top-1 h-15 rounded-3xl px-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-6">
                <span className="text-accent">
                    <TinyLogo size={16} />
                </span>
                <ul className="flex items-center gap-1">
                    {links.map((link) => (
                        <li key={link.title} className=" text-nav-foreground">
                            <a
                                href={link.href}
                                className={`py-1 px-3 inline-flex items-center gap-2 rounded-full hover:bg-background ${
                                    activeLink === link ? "bg-background" : ""
                                }`}
                            >
                                {link.title}
                                {link.childrens &&
                                    link.childrens.length > 0 && (
                                        <ChevronUp className="w-4" />
                                    )}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-4">
                <a className="text-text-muted">
                    <svg
                        width="27"
                        height="21"
                        viewBox="0 0 27 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.8454 1.71005C21.1354 0.912882 19.2839 0.334295 17.3553 0C17.3213 0.000483062 17.289 0.0143474 17.2653 0.0385728C17.0338 0.46287 16.7638 1.01574 16.5838 1.44004C14.5382 1.13165 12.4579 1.13165 10.4122 1.44004C10.2322 1.00288 9.9622 0.46287 9.71791 0.0385728C9.70505 0.0128578 9.66648 0 9.6279 0C7.69928 0.334295 5.86066 0.912882 4.13775 1.71005C4.1249 1.71005 4.11204 1.7229 4.09918 1.73576C0.601942 6.96876 -0.36237 12.0603 0.113357 17.1005C0.113357 17.1262 0.126214 17.1519 0.151929 17.1648C2.46628 18.8619 4.69063 19.8905 6.88926 20.572C6.92783 20.5848 6.9664 20.572 6.97926 20.5463C7.49356 19.8391 7.95643 19.0934 8.35501 18.3091C8.38073 18.2576 8.35501 18.2062 8.30358 18.1934C7.5707 17.9105 6.8764 17.5762 6.19495 17.1905C6.14352 17.1648 6.14352 17.0876 6.18209 17.049C6.32353 16.9462 6.46496 16.8305 6.60639 16.7276C6.63211 16.7019 6.67068 16.7019 6.69639 16.7147C11.1194 18.7334 15.8895 18.7334 20.2611 16.7147C20.2868 16.7019 20.3253 16.7019 20.3511 16.7276C20.4925 16.8433 20.6339 16.9462 20.7753 17.0619C20.8268 17.1005 20.8268 17.1776 20.7625 17.2033C20.0939 17.6019 19.3867 17.9233 18.6539 18.2062C18.6024 18.2191 18.5896 18.2834 18.6024 18.3219C19.0139 19.1062 19.4767 19.852 19.9782 20.5591C20.0168 20.572 20.0553 20.5848 20.0939 20.572C22.3054 19.8905 24.5297 18.8619 26.8441 17.1648C26.8698 17.1519 26.8827 17.1262 26.8827 17.1005C27.4484 11.276 25.9441 6.22303 22.8968 1.73576C22.884 1.7229 22.8711 1.71005 22.8454 1.71005ZM9.0236 14.0275C7.69928 14.0275 6.59353 12.8061 6.59353 11.3017C6.59353 9.79741 7.67356 8.57595 9.0236 8.57595C10.3865 8.57595 11.4665 9.81027 11.4537 11.3017C11.4537 12.8061 10.3736 14.0275 9.0236 14.0275ZM17.9853 14.0275C16.661 14.0275 15.5552 12.8061 15.5552 11.3017C15.5552 9.79741 16.6352 8.57595 17.9853 8.57595C19.3482 8.57595 20.4282 9.81027 20.4153 11.3017C20.4153 12.8061 19.3482 14.0275 17.9853 14.0275Z"
                            fill="currentColor"
                        />
                    </svg>
                </a>
                <a className="text-text-muted">
                    <svg
                        width="24"
                        height="23"
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 0C10.4241 0 8.86371 0.302948 7.4078 0.891546C5.95189 1.48014 4.62902 2.34287 3.51472 3.43046C1.26428 5.62694 0 8.60601 0 11.7123C0 16.8891 3.444 21.2813 8.208 22.839C8.808 22.9327 9 22.5696 9 22.2534V20.274C5.676 20.9767 4.968 18.7046 4.968 18.7046C4.416 17.3459 3.636 16.9828 3.636 16.9828C2.544 16.2567 3.72 16.2801 3.72 16.2801C4.92 16.3621 5.556 17.4865 5.556 17.4865C6.6 19.2667 8.364 18.7397 9.048 18.4586C9.156 17.6973 9.468 17.182 9.804 16.8891C7.14 16.5963 4.344 15.5891 4.344 11.1267C4.344 9.82663 4.8 8.78423 5.58 7.95266C5.46 7.65985 5.04 6.44177 5.7 4.86061C5.7 4.86061 6.708 4.54438 9 6.05526C9.948 5.79759 10.98 5.66876 12 5.66876C13.02 5.66876 14.052 5.79759 15 6.05526C17.292 4.54438 18.3 4.86061 18.3 4.86061C18.96 6.44177 18.54 7.65985 18.42 7.95266C19.2 8.78423 19.656 9.82663 19.656 11.1267C19.656 15.6008 16.848 16.5846 14.172 16.8774C14.604 17.2405 15 17.955 15 19.0442V22.2534C15 22.5696 15.192 22.9444 15.804 22.839C20.568 21.2696 24 16.8891 24 11.7123C24 10.1742 23.6896 8.6512 23.0866 7.2302C22.4835 5.8092 21.5996 4.51804 20.4853 3.43046C19.371 2.34287 18.0481 1.48014 16.5922 0.891546C15.1363 0.302948 13.5759 0 12 0Z"
                            fill="currentColor"
                        />
                    </svg>
                </a>
                <a
                    href="#"
                    className="py-1 px-3 inline-flex items-center gap-1 rounded-full bg-accent text-semibold text-background"
                >
                    Forum <ArrowUpRight className="w-4" />
                </a>
            </div>
        </nav>
    );
}
