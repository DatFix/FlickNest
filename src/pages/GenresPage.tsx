import { useEffect, useState } from "react";
import { getGenreMovie } from "../api/api";
import CardSkeleton from "../components/CardSkeleton";
import MovieCard from "../components/MovieCard";
import useFetch from "../hooks/useFetch";
import { IMovies } from "../interfaces/interfaces";
import { useParams } from "react-router-dom";

export default function GenresPage() {
  const [limit, setLimit] = useState(10);
  const [loadingAction, setLoadingAction] = useState(false);
  const { slug } = useParams();
  
  const {
    data: genresMovies,
    loading: genresLoading,
    error: genresError,
    refetch: refetchGenre,
  } = useFetch(() => getGenreMovie(slug as string, limit));

  const handleLoadMore = () => {
    if(limit + 10 > 64) {
        setLimit((64 - limit) + limit)
    }else{
        setLimit(limit + 10);
    }

    // setLimit(prev => Math.min(prev + 10, 64));
};

console.log(genresMovies, 'genresMovies');


useEffect(()=> {
    refetchGenre();
}, [slug])

useEffect(() => {
    const fetchData = async () => {
        setLoadingAction(true);
        await refetchGenre();
        setLoadingAction(false);
    };
    fetchData();
  }, [limit]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [genresMovies]);
  

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {genresLoading || loadingAction ? (
          <div className="mt-20 w-full overflow-x-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 gap-5 px-5 md:px-10 lg:px-0">
            {[...Array(10)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : genresError ? (
          <p>Error</p>
        ) : (
          genresMovies &&
          genresMovies?.length > 0 && (
            <div className="pt-20">
              <div className="w-full my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {genresMovies?.map((item: IMovies, index: number) => (
                  <div key={index} className="mx-auto">
                    <MovieCard {...item} />
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center mb-10">
                <button
                  className={`bg-[#ff630d] text-white py-2 px-2 mx-2 rounded-md mt-5 flex w-24 text-sm items-center justify-center ${limit === 64 ? "hidden" : ""} `}
                  onClick={handleLoadMore}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
