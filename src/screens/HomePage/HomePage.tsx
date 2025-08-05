import React, { useState, useCallback } from 'react';
import { Search, X, Loader2, AlertCircle } from 'lucide-react';
import { Header } from '../../components/Header';
import { HeroSection } from '../../components/HeroSection';
import { MovieSection } from '../../components/MovieSection';
import { MovieCard } from '../../components/MovieCard';
import { useMovies } from '../../hooks/useMovies';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    trendingMovies,
    popularMovies,
    searchResults,
    loading,
    movieList,
    error,
    searchMovies,
    clearSearch: clearApiSearch,
  } = useMovies();

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setIsSearchActive(false);
        clearApiSearch();
        return;
      }

      setSearchLoading(true);
      setIsSearchActive(true);
      
      try {
        await searchMovies(query);
      } finally {
        setSearchLoading(false);
      }
    },
    [searchMovies, clearApiSearch]
  );

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search by 500ms
    clearTimeout((window as any).searchTimeout);
    (window as any).searchTimeout = setTimeout(() => {
      debouncedSearch(value);
    }, 500);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearchActive(false);
    clearApiSearch();
    clearTimeout((window as any).searchTimeout);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-white text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Header />
      <HeroSection />
      
      {/* Search Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {searchLoading ? (
              <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 h-6 w-6 animate-spin" />
            ) : (
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            )}
            <input
              type="text"
              placeholder="Search movies from TMDB..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#16213e] text-white pl-12 pr-12 py-4 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors text-lg"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Results or Regular Content */}
      {isSearchActive ? (
        <div className="container mx-auto px-6 pb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Search Results for "{searchTerm}"
            </h2>
            <p className="text-gray-400">
              {searchLoading ? 'Searching...' : `${searchResults.length} movie${searchResults.length !== 1 ? 's' : ''} found`}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  image={movie.image}
                  genre={movie.genre}
                />
              ))}
            </div>
          ) : !searchLoading ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🎬</div>
              <h3 className="text-white text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-gray-400">
                Try searching for a different title or genre
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <MovieSection title="Trending This Week" movies={trendingMovies} />
          <MovieSection title="Popular Movies" movies={popularMovies} />
          <MovieSection title="All Movies" movies={movieList} />
        </>
      )}
      
      {/* Footer */}
      <footer className="bg-[#16213e] py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-white font-bold text-xl">MovieHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your ultimate destination for movie discovery and entertainment.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Movies</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Popular</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Top Rated</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Genres</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Action</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comedy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Drama</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sci-Fi</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 MovieHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};