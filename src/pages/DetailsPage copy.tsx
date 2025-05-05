import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMovieDetail, getSimilarMovie } from "../api/api";
import { useEffect, useState } from "react";
import { IMovieData } from "../interfaces/details";
import { Bookmark, Play, Star, Youtube } from "lucide-react";
import { Modal, Tooltip } from "antd";
import { GENRES } from "../constants/genre";
import MovieCard from "../components/MovieCard";
import CardSkeleton from "../components/CardSkeleton";
import { IMovies } from "../interfaces/interfaces";

export default function DetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<IMovieData | null>(null);
    const [similar, setSimilar] = useState([]);
    const { data: details, loading: detailsLoading, error: detailsError, refetch: refetchDetails } = useFetch(async () => await getMovieDetail(slug!));
    const [trailer, setTrailer] = useState('');
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const showModal = (trailer_url?: string) => {
        setTrailer(trailer_url || '');
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTrailer('');
    };

    useEffect(() => {
        if (details) {
            setData(details);
            const fetchSimilarMovies = async () => {
                const genreKey = details.movie.type as keyof typeof GENRES;
                const similarMovies = await getSimilarMovie(GENRES[genreKey], details.movie.country[0].slug);
                setSimilar(similarMovies as any);
            };
            fetchSimilarMovies();
        }
    }, [details]);

    useEffect(() => {
        refetchDetails();
    }, [slug]);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen flex items-start justify-center">
            {detailsLoading ? (
                <p className="text-white">Loading...</p>
            ) : detailsError ? (
                <p className="text-red-500">Error</p>
            ) : details && (
                <div className="w-full relative">
                    {/* Image Section */}
                    {data?.movie.thumb_url ? (
                        <>
                            <img
                                src={data.movie.thumb_url}
                                alt="thumb"
                                className="hidden md:block h-screen w-full object-cover"
                                loading="lazy"
                            />
                            <img
                                src={data.movie.poster_url}
                                alt="poster"
                                className="block md:hidden w-full object-cover"
                                loading="lazy"
                            />
                        </>
                    ) : (
                        <div className="min-h-screen bg-black/20"></div>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black to-black/50 '></div>

                    {/* Movie Info */}
                    <div className="top-[20%] left-[5%] right-[5%] md:left-[8%] text-white p-3 md:p-0">
                        <h2 className="text-2xl md:text-4xl font-bold font-playwight mb-2">{data?.movie?.name || 'Untitled'}</h2>
                        <p className="text-gray-300 italic text-lg">{data?.movie.origin_name}</p>
                        <div className="flex flex-wrap items-center gap-2 my-4 text-sm">
                            <span className="bg-gray-500 px-2 py-0.5 rounded">{data?.movie?.quality}</span>
                            <span className="bg-gray-500 px-2 py-0.5 rounded">{data?.movie?.lang}</span>
                            <span className="bg-gray-500 px-2 py-0.5 rounded flex items-center gap-1">
                                {data?.movie.tmdb.vote_average}
                                <Star size={12} strokeWidth={1} />
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <button
                                onClick={() => navigate(`/watch/${data?.movie.slug}`)}
                                className="bg-[#ff630d] hover:bg-[#f77b39] text-black font-bold px-4 py-2 flex items-center gap-2 uppercase text-sm rounded">
                                <Play size={16} /> Xem ngay
                            </button>
                            <button
                                onClick={() => showModal(data?.movie.trailer_url)}
                                className="bg-[#ff630d] hover:bg-[#f77b39] text-black font-bold px-4 py-2 flex items-center gap-2 uppercase text-sm rounded">
                                <Youtube size={16} /> Xem trailer
                            </button>
                            <Tooltip title="Thêm vào yêu thích" color="#ff630d">
                                <button className="border-2 border-[#ff630d] p-1 rounded">
                                    <Bookmark size={18} color="#ff630d" />
                                </button>
                            </Tooltip>
                        </div>

                        <Modal
                            title={null}
                            open={isModalOpen}
                            onCancel={handleCancel}
                            footer={null}
                            width={screenWidth <= 480 ? '90vw' : screenWidth <= 768 ? '80vw' : '60vw'}
                            centered
                            bodyStyle={{ padding: 0, margin: 0 }}
                            destroyOnClose
                        >
                            <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer?.split('v=')[1]}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                />
                            </div>
                        </Modal>

                        {/* Content + Info */}
                        <div className="w-full mt-6 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2 w-full">
                                <p className="text-white/80 text-sm text-justify italic">{data?.movie?.content}</p>
                            </div>
                            <div className="md:w-1/2 w-full text-white text-sm space-y-2">
                                <div><b className="text-white">Trạng thái:</b> <span className="text-gray-300">{data?.movie.status}</span></div>
                                <div><b className="text-white">Tập phim:</b> <span className="text-gray-300">{data?.movie.episode_current}</span></div>
                                <div><b className="text-white">Thời lượng:</b> <span className="text-gray-300">{data?.movie.time}</span></div>
                                <div className="flex flex-wrap gap-1">
                                    <b className="text-white">Thể loại:</b>
                                    {data?.movie.category.map((item, index) => (
                                        <span key={index} className="text-gray-300 underline">{item.name}</span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    <b className="text-white">Diễn viên:</b>
                                    {data?.movie.actor.map((item, index) => (
                                        <span key={index} className="text-gray-300">{item}</span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    <b className="text-white">Quốc gia:</b>
                                    {data?.movie.country.map((item, index) => (
                                        <span key={index} className="text-gray-300">{item.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Similar movies */}
                    <div className="max-w-7xl mx-auto">
                        {similar.length > 0 ? (
                            <div className="px-5 md:px-3 lg:px-0">
                                <h1 className="text-white text-xl font-semibold mt-10 font-playwight">Phim Tương Tự</h1>

                                <div className="w-full my-3 md:my-5 relative">
                                    <div className="flex overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide gap-4">
                                        {similar?.map((item: IMovies, index) => (
                                            <div key={index} className="flex-none">
                                                <MovieCard {...item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="flex gap-4">
                                {[...Array(5)].map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
