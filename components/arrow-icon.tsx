export default function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            className="w-[10px] h-[10px] hoverArrow"
        >
            <g fillRule="evenodd">
                <path className="hoverArrow__linePath" d="M0 5h7"></path>
                <path d="M1 1l4 4-4 4" className="hoverArrow__tipPath"></path>
            </g>
        </svg>
    );
}
