"use client";

import Image from "next/image";
import { useState } from "react";

export const Author = ({ author }) => {
    const [imgError, setImgError] = useState(false);

    return (
        author && (
            <div className="mx-auto text-center text-light-300">
                <div className="inline-flex gap-2 items-center">
                    Rédigé par
                    <div className="inline-flex items-center p-1 pr-4 bg-dark-500/50 rounded-full gap-1">
                        {!imgError && (
                            <Image
                                src={`/img/avatar/${author.toLowerCase()}-avatar.jpg`}
                                alt={`${author} Avatar`}
                                width={24}
                                height={24}
                                className="rounded-full mr-1"
                                onError={() => setImgError(true)}
                            />
                        )}
                        <span>{author}</span>
                    </div>
                </div>
            </div>
        )
    );
};
