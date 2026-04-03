import LogoText from "@/app/logo-text";
import { EmojiCarousel } from "@/components/home/emoji-carousel";
import { Author } from "@/components/docs/author";
import { Pagination } from "@/components/docs/pagination";

export const DocsFooter = ({ metadata }) => {
    const { author } = metadata || {};
    return (
        <footer className="relative mt-20">
            <Author author={author} />
            <Pagination />
            <div className="flex justify-between mt-20 my-20 mx-auto">
                <div className="flex flex-1 flex-col gap-2 items-center">
                    <LogoText size={100} className="text-accent" />

                    <div className="text-light-800 text-lg">
                        Fait avec <EmojiCarousel /> pour la communauté de
                        Forumactif
                    </div>
                </div>
            </div>
        </footer>
    );
};
