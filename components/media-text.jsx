export default function MediaText({ media, title, description, ...props }) {
    return (
        <div className="flex gap-4 mb-4 items-center" {...props}>
            <div className="w-12 h-12 flex items-center justify-center shrink-0 aspect-square bg-dark-700 rounded-md">
                {media}
            </div>
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{title}</p>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
}
