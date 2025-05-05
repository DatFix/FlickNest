// components/MovieSection.tsx
import MovieCard from "./MovieCard"
import { IMovies } from "../interfaces/interfaces"
import CardSkeleton from "./CardSkeleton"
import { useNavigate } from "react-router-dom"

interface Props {
    title: string
    data: IMovies[] | null
    loading: boolean
    error: any
    slug: string
}


export default function MovieSection({ title, data, loading, error, slug }: Props) {

    const navigate = useNavigate()
    const handleClick = (slug: string) => {
        navigate(`/phim/${slug}`)
    }

    if (loading) return <div>
        <div className="w-32 h-5 bg-white/5 animate-pulse mt-5"></div>
        <div className="mt-5 w-full overflow-x-auto flex lg:gap-5 gap-5 px-5 md:px-10 lg:px-0">
            {[...Array(5)].map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    </div>
    if (error) return <h2 className="text-center text-red-500 font-bold">Lỗi khi tải {title}</h2>

    return (
        <div className="px-5 md:px-3 lg:px-0">
            <h1 className="text-white text-xl font-semibold mt-10 font-playwight">{title}</h1>

            <div className="w-full my-3 md:my-5 relative">
                <div className="flex overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide gap-4">
                    {data?.map((item, index) => (
                        <div key={index} className="flex-none">
                            <MovieCard {...item} />
                        </div>
                    ))}
                    <div className="flex justify-center items-center">
                        <button
                            className="bg-[#ff630d] text-white py-2 px-2 mx-2 rounded-md mt-5 flex w-24 text-sm items-center justify-center"
                            onClick={() => handleClick(slug)}
                        >
                            Xem Thêm
                        </button>
                    </div>
                </div>
            </div>

        </div>

    )
}
