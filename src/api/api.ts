import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
const BASE_URL_API_2 = import.meta.env.VITE_BASE_URL_API_2;

export const getThumbnailMovie = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API_2}/danh-sach/hoat-hinh?country=nhat-ban`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const getTrendingMovie = async () => {
    try {
        const listMovie = await axios.get(`${BASE_URL_API}/danh-sach/phim-moi-cap-nhat-v2?limit=10`);

        const trendingMovide = await Promise.all(listMovie.data.items.map(async (item: any) => {
            const response = await axios.get(`${BASE_URL_API}/phim/${item.slug}`);
            return response.data;
        }
        ));

        return trendingMovide
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const getGenreMovie = async (genreName: string, limit: number) => {
    try {
        const response = await axios.get(`${BASE_URL_API_2}/danh-sach/${genreName}?limit=${limit}`);

        const genreMovie = await Promise.all(response.data.data.items.map(async (item: any) => {
            const response = await axios.get(`${BASE_URL_API}/phim/${item.slug}`);
            return response.data;
        }
        ));
        return genreMovie
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const getMovieDetail = async (slug: string) => {
    try {
        const response = await axios.get(`${BASE_URL_API}/phim/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const getSimilarMovie = async (type: string, country: string) => {
    try {
        const response = await axios.get(`${BASE_URL_API_2}/danh-sach/${type}?country=${country}&limit=10`);

        const similarMovie = await Promise.all(response.data.data.items.map(async (item: any) => {
            const response = await axios.get(`${BASE_URL_API}/phim/${item.slug}`);
            return response.data;
        }
        ));
        return similarMovie
    } catch (error) {
        throw error;
    }
}

export const searchMovie = async ({ query }: { query: string }) => {
    try {
        const response = await axios.get(`${BASE_URL_API_2}/tim-kiem?keyword=${query}&limit=10`);
        const searchMovie = await Promise.all(response.data.data.items.map(async (item: any) => {
            const response = await axios.get(`${BASE_URL_API}/phim/${item.slug}`);
            return response.data;
        }
        ));
        return searchMovie


    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API}/the-loai`)
        return response.data
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const getAllCountries = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API}/quoc-gia`)
        return response.data
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

export const filterMovies = async ({ category, country, sort_lang, year, }: { category: string; country: string; sort_lang: string; year: string }) => {
    console.log(`${BASE_URL_API_2}/tim-kiem?keyword=a&category=${category}&sort_lang=${sort_lang}&country=${country}&year=${year}&limit=12`);
    try {
        const response = await axios.get(`${BASE_URL_API_2}/tim-kiem?keyword=a&category=${category}&sort_lang=${sort_lang}&country=${country}&year=${year}&limit=12`)
        
        const filterMovies = await Promise.all(response.data.data.items.map(async (item: any) => {
            const response = await axios.get(`${BASE_URL_API}/phim/${item.slug}`);
            
            return response.data;
        }
        ));
        return filterMovies
    } catch (error) {
        console.error("Error fetching movie data:", error);
        throw error;
    }
}

