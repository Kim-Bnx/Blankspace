import {
    Bookmark,
    Download,
    ScanHeart,
    Newspaper,
    CircleQuestionMark,
} from "lucide-react";

export default {
    guide: {
        type: "separator",
        title: "Guide",
    },
    index: (
        <>
            <Bookmark />
            <span>Introduction</span>
        </>
    ),
    installation: (
        <>
            <Download />
            <span>Installation</span>
        </>
    ),
    vitrine: (
        <>
            <ScanHeart />
            <span>Vitrine</span>
        </>
    ),
    nouveautes: (
        <>
            <Newspaper />
            <span>Nouveautés</span>
        </>
    ),
    faq: (
        <>
            <CircleQuestionMark />
            <span>FAQ et support</span>
        </>
    ),
    install: {
        type: "separator",
        title: "Installation manuelle",
    },
    configuration: { title: "Configuration" },
    templates: { title: "Templates" },
};
