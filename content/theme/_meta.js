import { Bookmark, Download, ScanHeart } from "lucide-react";

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
    vitrines: (
        <>
            <ScanHeart />
            <span>Vitrines</span>
        </>
    ),
    install: {
        type: "separator",
        title: "Installation manuelle",
    },
    configuration: { title: "Configuration" },
    templates: { title: "Templates" },
};
