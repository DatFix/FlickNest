import { getFavoriteMovie } from "../api/localstorage";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import useFetch from "../hooks/useFetch";
import { IMovies } from "../interfaces/interfaces";

export default function FavoritesPage() {
  const {
    data: favoritesData,
    loading: favoritesLoading,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useFetch(getFavoriteMovie);
  console.log(favoritesData, "favoritesData");

  return (
    <div className="max-w-7xl mx-auto pt-20">
      {favoritesLoading ? (
        <Loading />
      ) : favoritesError ? (
        <p>Error</p>
      ) : (
        favoritesData && (
          <div>
            <h1 className="text-white text-xl font-semibold mt-10 font-playwight">Yêu thích</h1>
            <div className="w-full my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {favoritesData.map((item: IMovies, index: number) => (
              <div key={index} className="mx-auto">
                <MovieCard {...item} refetchFavorites={refetchFavorites} />
              </div>
            ))}
          </div>
          </div>
        )
      )}
    </div>
  );
}
