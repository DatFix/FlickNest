// pages/HomePage.tsx
import { getGenreMovie, getTrendingMovie } from "../api/api"
import Banner from "../components/Banner"
import useFetch from "../hooks/useFetch"
import MovieSection from "../components/MovieSection"

export default function HomePage() {
    const { data: trendingMovie, loading: trendingLoading, error: trendingError } = useFetch(() => getTrendingMovie())
    const { data: singleMovies, loading: singleLoading, error: singleError } = useFetch(() => getGenreMovie("phim-le"))
    const { data: seriesMovies, loading: seriesLoading, error: seriesError } = useFetch(() => getGenreMovie("phim-bo"))
    const { data: showMovies, loading: showLoading, error: showError } = useFetch(() => getGenreMovie("tv-shows"))
    const { data: animationMovies, loading: animationLoading, error: animationError } = useFetch(() => getGenreMovie("hoat-hinh"))

    return (
        <div>
            <Banner />

            <div className="max-w-7xl mx-auto">
                <MovieSection title="Phim Mới" data={trendingMovie} loading={trendingLoading} error={trendingError} slug="phim-moi-cap-nhat" />
                <MovieSection title="Phim Lẻ" data={singleMovies} loading={singleLoading} error={singleError} slug="phim-le" />
                <MovieSection title="Phim Bộ" data={seriesMovies} loading={seriesLoading} error={seriesError} slug="phim-bo" />
                <MovieSection title="TV Shows" data={showMovies} loading={showLoading} error={showError} slug="tv-shows" />
                <MovieSection title="Hoạt Hình" data={animationMovies} loading={animationLoading} error={animationError} slug="hoat-hinh" />
            </div>
        </div>
    )
}
