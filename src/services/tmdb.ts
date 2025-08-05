const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
console.log(BASE_URL, ACCESS_TOKEN);
// TypeScript interfaces for TMDB API responses
export interface TMDBMovie {
  first_air_date: string | number | Date;
  name: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  genres: Genre[];
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

// Base fetch function for TMDB API
const fetchFromTMDB = async (endpoint: string): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  console.log(url, options);

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch from TMDB:', error);
    throw error;
  }
};

// API functions
export const tmdbAPI = {
  getAllMovies: async (): Promise<TMDBResponse> => {
    return fetchFromTMDB(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`);
  },

  getAllTvShows: async (): Promise<TMDBResponse> => {
    return fetchFromTMDB(`/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`);
  },
    
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<TMDBResponse> => {
    return fetchFromTMDB(`/movie/popular?language=en-US&page=${page}`);
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse> => {
    return fetchFromTMDB(`/trending/movie/${timeWindow}?language=en-US`);
  },

  // Discover movies with filters
  discoverMovies: async (params: {
    page?: number;
    sort_by?: string;
    include_adult?: boolean;
    include_video?: boolean;
    language?: string;
    with_genres?: string;
    year?: number;
  } = {}): Promise<TMDBResponse> => {
    const queryParams = new URLSearchParams({
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ),
    });

    return fetchFromTMDB(`/discover/movie?${queryParams}`);
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<TMDBResponse> => {
    const encodedQuery = encodeURIComponent(query);
    return fetchFromTMDB(`/search/movie?query=${encodedQuery}&include_adult=false&language=en-US&page=${page}`);
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<TMDBMovieDetails> => {
    return fetchFromTMDB(`/movie/${movieId}?language=en-US`);
  },

  // Get movie genres
  getGenres: async (): Promise<GenresResponse> => {
    return fetchFromTMDB('/genre/movie/list?language=en-US');
  },

  // Get image URL (helper function)
  getImageUrl: (path: string | null, size: 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return 'https://via.placeholder.com/500x750/374151/ffffff?text=No+Poster';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};

// Helper function to transform TMDB movie to your app's movie format
export const transformTMDBMovie = (tmdbMovie: TMDBMovie, genres: Genre[] = []): any => {
  const movieGenres = genres.filter(genre => 
    tmdbMovie.genre_ids.includes(genre.id)
  ).map(genre => genre.name);

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title || tmdbMovie.name,
    year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear().toString() : tmdbMovie.first_air_date ? new Date(tmdbMovie.first_air_date).getFullYear().toString() : 'Unknown',
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    image: tmdbAPI.getImageUrl(tmdbMovie.poster_path),
    genre: movieGenres.length > 0 ? movieGenres[0] : 'Unknown',
    genres: movieGenres,
    overview: tmdbMovie.overview,
    backdrop: tmdbAPI.getImageUrl(tmdbMovie.backdrop_path, 'w780'),
  };
}; 