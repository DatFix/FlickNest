export interface IMovies {
    id: number
    thumb_url: string
    origin_name: string
    name: string
    quality: string
    tmdb: ITMDBMovie
    lang: string
    episode_current: string
    poster_url: string
    movie: IMovieDetail,
    slug: string
}

interface ITMDBMovie {
    vote_average: number
    vote_count: number
}

export interface IMovieDetail {
    _id: string;
    name: string;
    origin_name: string;
    slug: string;
    poster_url: string;
    thumb_url: string;
    trailer_url: string;
    time: string;
    quality: string;
    lang: string;
    status: string;
    episode_current: string;
    episode_total: string;
    year: number;
    view: number;
    type: string;
    chieurap: boolean;
    sub_docquyen: boolean;
    is_copyright: boolean;
    notify: string;
    content: string;
    actor: string[];
    director: string[];
    country: { id: string; name: string; slug: string }[];
    category: { id: string; name: string; slug: string }[];
    imdb: {
        id: string | null;
    };
    tmdb: {
        type: string;
        id: string;
        season: number;
        vote_average: number;
        vote_count: number;
    };
    created: {
        time: string;
    };
    modified: {
        time: string;
    };
}

export interface Categories {
    _id: string;
    name: string;
    slug: string;
}

export interface Countries {
    _id: string;
    name: string;
    slug: string;
}
