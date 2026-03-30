export default function GithubIcon({ size, ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0 5.63C1.28729 5.35269 2.44069 4.64268 3.26806 3.61824C4.09543 2.59381 4.54681 1.31682 4.547 0H7.577V5.152H11.214V8.788H7.577V14.242C7.577 14.757 7.775 15.449 8.487 15.909C8.961 16.2157 9.971 16.3673 11.517 16.364V20H7.274C6.0685 19.9997 4.91246 19.5207 4.06014 18.6682C3.20782 17.8156 2.729 16.6595 2.729 15.454V8.788H0V5.63Z"
                fill="currentColor"
            />
        </svg>
    );
}
