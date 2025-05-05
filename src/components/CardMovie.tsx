import { Tooltip } from "antd";
import { IMovies } from "../interfaces/interfaces";
import { Bookmark, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CardMovie({ movie }: IMovies) {
    const router = useNavigate()
    return (
        <div className="relative group flex-shrink-0 min-w-[230px]" onClick={() => router(`/details/${movie.slug}`)}>
            <div className="w-full">
                <img src={movie.poster_url} alt={movie.poster_url || "img"} className="w-full object-cover aspect-[15/22]" loading="lazy" />
                <div className="my-2">
                    <h1 className="text-white text-sm font-semibold truncate">{movie.name}</h1>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-gray-400 text-xs">{movie.year}</p>
                        <p className="text-gray-400 text-xs flex items-center justify-center gap-1">{movie?.tmdb?.vote_average} <Star absoluteStrokeWidth size={10} strokeWidth={1} /></p>
                    </div>
                </div>
            </div>
            <div className='absolute bg-black inset-0 opacity-0 transition-all duration-200 cursor-pointer group-hover:opacity-90'></div>
            <div className="absolute flex flex-col justify-between p-3 top-0 opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-200 left-0 right-0 bottom-0">
                <div>
                    <p className="text-white text-sm font-semibold">{movie.name}</p>
                    <p className="text-gray-500 text-[12px]">{movie.origin_name}</p>
                    <p className="text-[#ff630d] text-[12px]">
                        {movie.quality} - {movie.lang} - 
                        {movie.episode_current?.includes("Hoàn Tất") || movie.episode_current?.includes("Full")
                            ? movie.episode_current
                            : ` ${movie.episode_current} / ${movie.episode_total}`}
                    </p>
                    <p className="text-white text-[12px] text-justify mt-2">{movie.content.length > 400 ? movie.content.substring(0, 300) + '...' : movie.content}</p>

                </div>
                <div className="flex items-center gap-5">
                    <Tooltip placement="top" title={`Xem Ngay ${movie.time}`} trigger={['hover']} color="#ff630d" overlayInnerStyle={{ color: '#fff' }}>
                        <button>
                            <Play absoluteStrokeWidth color="#ff630d" />
                        </button>
                    </Tooltip>

                    <Tooltip placement="top" title={`Thêm vào yêu thích`} trigger={['hover']} color="#ff630d" overlayInnerStyle={{ color: '#fff' }}>
                        <button>
                            <Bookmark absoluteStrokeWidth color="#ff630d" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
