export default function CardSkeleton() {
    return (
        <div className="relative group flex-shrink-0 w-[10rem] md:w-[15rem]">
            <div className="w-full">
                <div className="w-full aspect-[15/22] bg-white/5 animate-pulse"></div>
                <div className="my-2">
                    <div className="w-full h-4 bg-white/10 animate-pulse"></div>
                    <div className="flex items-center justify-between mt-1">
                        <div className="w-1/4 h-3 bg-white/10 animate-pulse"></div>
                        <div className="w-1/4 h-3 bg-white/10 animate-pulse"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
