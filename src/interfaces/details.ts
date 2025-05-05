export interface IMovieData {
    status: boolean;
    msg: string;
    movie: Movie;
    episodes: Episode[];
  }
  
  export interface Movie {
    tmdb: TMDB;
    imdb: IMDb;
    created: CreatedOrModified;
    modified: CreatedOrModified;
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: string;
    status: string;
    poster_url: string;
    thumb_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    year: number;
    view: number;
    actor: string[];
    director: string[];
    category: CategoryOrCountry[];
    country: CategoryOrCountry[];
  }
  
  export interface TMDB {
    type: string;
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  }
  
  export interface IMDb {
    id: string | null;
  }
  
  export interface CreatedOrModified {
    time: string;
  }
  
  export interface CategoryOrCountry {
    id: string;
    name: string;
    slug: string;
  }
  
  export interface Episode {
    server_name: string;
    server_data: ServerData[];
  }
  
  export interface ServerData {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
  }
  

  