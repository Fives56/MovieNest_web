export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Video {
  id: string;
  key: string;
  site: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  video: Video;
  genres: Genre[];
  tmdb_id: number;
  title: string;
  original_title: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}
