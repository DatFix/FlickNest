import { useEffect, useState } from "react"
import { searchMovie } from "../api/api"
import useFetch from "../hooks/useFetch"
import MovieCard from "../components/MovieCard";
import { IMovies } from "../interfaces/interfaces";
import { X } from "lucide-react";
import CardSkeleton from "../components/CardSkeleton";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const { data: searchData, loading: searchLoading, error: searchError, refetch: loadSearch, reset } = useFetch(() => searchMovie({
        query: searchQuery
    }))

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadSearch()
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(searchTimeout)
    }, [searchQuery])

    const handleDeleteKeyWord = () => {
        setSearchQuery('')
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto">
            <div className="pt-40 max-w-5xl mx-auto flex justify-center items-center">
                <input
                    type="text"
                    className="text-4xl text-gray-400 font-semibold bg-transparent w-full pb-3 focus:outline-none border-b-2 focus:border-[#ff630d]"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <X size={40} className={`text-gray-400 -ml-10 cursor-pointer ${searchQuery.trim() ? 'block' : 'hidden'}`} onClick={handleDeleteKeyWord} />
            </div>
            <div>
                {searchLoading ? (
                    <div className="mt-5 w-full overflow-x-auto flex lg:gap-5 gap-5 px-5 md:px-10 lg:px-0">
                        {[...Array(5)].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : searchError ? (
                    <p>Error</p>
                ) : searchData && searchData?.length > 0 ? (
                    <div className="w-full my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {searchData?.map((item: IMovies, index: number) => (
                            <div key={index} className="mx-auto">
                                <MovieCard {...item} />
                            </div>
                        ))}
                    </div>
                ) : searchQuery.trim() !== '' && (
                    <h2 className="font-playwight text-gray-400 text-center my-5">Không tìm thấy phim nào</h2>
                )}

            </div>
        </div>
    )
}
