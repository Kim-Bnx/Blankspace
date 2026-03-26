import Image from "next/image";

export default function FALogo({ size = 20, className }) {
    return (
        <div className="flex gap-1 items-center">
            <Image
                src="/img/sigle.png"
                alt="FA Logo"
                width={size}
                height={size}
                className="-mt-1"
            />
            <span className="font-semibold">
                <span className="text-[#39A0CB]">FORUM</span>ACTIF
            </span>
        </div>
    );
}
