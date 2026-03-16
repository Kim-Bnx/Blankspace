const authorsList = [
    {
        name: "Kim",
        url: "https://example.com/alice",
        avatar: "https://2img.net/u/4215/47/92/78/avatars/2-54.png",
    },
    {
        name: "Poumon",
        url: "https://github.com/caezd",
        avatar: "https://avatars.githubusercontent.com/u/9888270?v=4",
    },
    {
        name: "'Christa'",
        url: "https://example.com/charlie",
        avatar: "https://example.com/charlie.jpg",
    },
];

export const Author = ({ name }) => {
    const author = authorsList.find((author) => author.name === name);
    return (
        <div className="flex items-center gap-2 text-sm">
            {author ? (
                <>
                    Rédigé par{" "}
                    <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <a
                        href={author.url}
                        className="text-sm underline font-medium"
                    >
                        {author.name}
                    </a>
                </>
            ) : (
                ""
            )}
        </div>
    );
};
