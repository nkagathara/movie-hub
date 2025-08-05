import { useState, useEffect } from 'react';
import { tmdbAPI, TMDBMovie, TMDBMovieDetails, Genre, transformTMDBMovie } from '../services/tmdb';

interface UseMoviesResult {
  trendingMovies: any[];
  popularMovies: any[];
  searchResults: any[];
  movieList: any[];
  genres: Genre[];
  movieDetails: any;
  loading: boolean;
  error: string | null;
  searchMovies: (query: string) => Promise<void>;
  fetchMovieDetails: (movieId: number) => Promise<void>;
  clearSearch: () => void;
  clearMovieDetails: () => void;
}

export const useMovies = (): UseMoviesResult => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [movieList, setMovieList] = useState<any[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch genres first to help with movie transformation
        const genresResponse = await tmdbAPI.getGenres();
        setGenres(genresResponse.genres);

        // Fetch trending, popular, and all movies in parallel
        const [trendingResponse, popularResponse, allMoviesResponse] = await Promise.all([
          tmdbAPI.getTrendingMovies('week'),
          tmdbAPI.getPopularMovies(),
          tmdbAPI.getAllMovies(),
        ]);

        // Transform the movies to match your app's format
        const transformedTrending = trendingResponse.results.map((movie: TMDBMovie) =>
          transformTMDBMovie(movie, genresResponse.genres)
        );

        const transformedPopular = popularResponse.results.map((movie: TMDBMovie) =>
          transformTMDBMovie(movie, genresResponse.genres)
        );

        const transformedAllMovies = allMoviesResponse.results.map((movie: TMDBMovie) =>
          transformTMDBMovie(movie, genresResponse.genres)
        );

        setTrendingMovies(transformedTrending);
        setPopularMovies(transformedPopular);
        setMovieList(transformedAllMovies);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch movie details function
  const fetchMovieDetails = async (movieId: number) => {
    try {
      setError(null);
      const movieDetailsResponse: TMDBMovieDetails = await tmdbAPI.getMovieDetails(movieId);
      
      // Transform movie details with genre information
      const transformedDetails = {
        id: movieDetailsResponse.id,
        title: movieDetailsResponse.title,
        year: movieDetailsResponse.release_date ? new Date(movieDetailsResponse.release_date).getFullYear().toString() : 'Unknown',
        rating: Math.round(movieDetailsResponse.vote_average * 10) / 10,
        image: tmdbAPI.getImageUrl(movieDetailsResponse.poster_path),
        backdrop: tmdbAPI.getImageUrl(movieDetailsResponse.backdrop_path, 'w780'),
        overview: movieDetailsResponse.overview,
        runtime: movieDetailsResponse.runtime || 0,
        budget: movieDetailsResponse.budget || 0,
        revenue: movieDetailsResponse.revenue || 0,
        status: movieDetailsResponse.status || 'Unknown',
        tagline: movieDetailsResponse.tagline || '',
        homepage: movieDetailsResponse.homepage || '',
        production_companies: movieDetailsResponse.production_companies || [],
        production_countries: movieDetailsResponse.production_countries || [],
        spoken_languages: movieDetailsResponse.spoken_languages || [],
        adult: movieDetailsResponse.adult || false,
        genres: movieDetailsResponse.genres || [],
        vote_count: movieDetailsResponse.vote_count,
      };
      
      setMovieDetails(transformedDetails);
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
      setError('Failed to load movie details. Please try again later.');
    }
  };

  // Search movies function
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setError(null);
      const searchResponse = await tmdbAPI.searchMovies(query);
      
      const transformedResults = searchResponse.results.map((movie: TMDBMovie) =>
        transformTMDBMovie(movie, genres)
      );

      setSearchResults(transformedResults);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed. Please try again.');
    }
  };

  // Clear search results
  const clearSearch = () => {
    setSearchResults([]);
  };

  // Clear movie details
  const clearMovieDetails = () => {
    setMovieDetails(null);
  };

  return {
    trendingMovies,
    popularMovies,
    searchResults,
    movieList,
    genres,
    movieDetails,
    loading,
    error,
    searchMovies,
    fetchMovieDetails,
    clearSearch,
    clearMovieDetails,
  };
};