import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMovieDetail } from "../api/api";
import { IMovieData } from "../interfaces/details";
import { Play } from "lucide-react";

export default function WatchPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data: details, loading: detailsLoading, error: detailsError, refetch: refetchDetails } = useFetch(async () => await getMovieDetail(slug!))
    const [currentEspisode, setCurrentEpisode] = useState<string | null>(null);
    const [data, setData] = useState<IMovieData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [serverName, setServerName] = useState<string | null>(null);

    useEffect(() => {
        if (details) {
            setData(details);
            setCurrentEpisode(data?.episodes[0].server_data[0].link_embed as string)
        }
    }, [details])

    const handleSetEspisode = (link: string, serverIndex: number, serverName: string) => {
        setCurrentEpisode(link);
        setCurrentIndex(serverIndex);
        setServerName(serverName);
        window.scrollTo(0, 0);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-20">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                    src={currentEspisode as string}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                    title={slug || 'Video'}
                />
            </div>
            <div>
                <h1 className="text-white text-2xl font-semibold mt-5 font-playwight">{data?.movie.name}</h1>
                <p className="text-gray-400 text-sm mt-2">{data?.movie.origin_name}</p>
                <p className="text-[#ff630d] text-sm mt-2">
                    {data?.movie.quality} - {data?.movie.lang} -
                    {data?.movie.episode_current?.includes("Hoàn Tất") || data?.movie.episode_current?.includes("Full")
                        ? data?.movie.episode_current
                        : ` ${currentIndex + 1} / ${data?.movie.episode_total}`}
                </p>
            </div>
            {data?.episodes.map((item, index) => (
                <div key={index} className="mt-4 bg-[#111828] p-4 rounded-xl">
                    <h2 className="font-semibold text-white font-playwight">{item.server_name}</h2>
                    <div className="mt-2 flex flex-wrap gap-2 h-[300px] overflow-y-auto justify-center">
                        {item.server_data.map((server, serverIndex) => (
                            <>
                                <button
                                    key={serverIndex}
                                    onClick={() => { handleSetEspisode(server.link_embed, serverIndex, item.server_name) }}
                                    className={`bg-[#2c3544] group md:hover:scale-105 hover:bg-[#2c3544]/80 md:min-w-28 w-12 h-10 flex items-center text-center md:justify-between text-white font-playwight text-[12px] md:text-md justify-center sm:-pl-2 md:px-4 rounded transition duration-200 border-l-4 hover:border-[#4f46e6] ${currentIndex === serverIndex && item.server_name === serverName ? 'border-[#4f46e6]' : 'border-transparent'}`}
                                >
                                    {server.name?.includes("Tập") ? server.name.split(' ')[1] : server.name}

                                    <Play size={16} className={`opacity-0 transition-all duration-200 md:group-hover:opacity-100 -translate-x-5 md:group-hover:translate-x-0 hidden md:block ${currentIndex === serverIndex && item.server_name === serverName ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
                                </button>
                            </>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
