export interface MovieDetail {
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  adult: boolean;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  releases: Releases;
  recommendations: Response;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  name: string;
}

export interface SpokenLanguage {
  name: string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  department: string;
  job: string;
}

export enum OriginalLanguage {
  De = "de",
  En = "en",
  Es = "es",
  Fr = "fr",
}

export interface Releases {
  countries: Country[];
}

export interface Country {
  certification: string;
  iso_3166_1: string;
  primary: boolean;
  release_date: Date;
}

export interface Actor {
  birthday: Date;
  known_for_department: string;
  deathday: null;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: null;
}

export interface ActorSearchResult {
  page: number;
  results: ActorResult[];
}


export interface ActorResult {
  profile_path: string;
  adult: boolean;
  id: number;
  known_for: KnownFor[];
  name: string;
  popularity: number;
  gender: 1 | 2;
}

export interface KnownFor {
  poster_path: string;
  adult?: boolean;
  overview: string;
  release_date?: Date;
  original_title?: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: OriginalLanguage;
  title?: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video?: boolean;
  vote_average: number;
  first_air_date?: Date;
  origin_country?: string[];
  name?: string;
  original_name?: string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export interface ActorCredits {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

export interface Response {
  page: number;
  results: MoviePreviewResult[];
  total_results: number;
  total_pages: number;
}

export interface MoviePreviewResult {
  adult: boolean;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface NowPlayingResponse {
  page: number;
  results: MoviePreviewResult[];
  total_results: number;
  total_pages: number;
  dates: Dates;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}