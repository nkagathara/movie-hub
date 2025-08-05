import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Header } from '../../components/Header';
import { MovieCard } from '../../components/MovieCard';
import { trendingMovies, popularMovies } from '../../data/movies';
import { useMovies } from '../../hooks/useMovies';

export const MovieList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const {
    movieList,
  } = useMovies();
  // Combine all movies
  const allMovies = [...movieList];
  console.log(allMovies);
  // Get unique genres
  const genres = ['All', ...Array.from(new Set(allMovies.map(movie => movie.genre)))];

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let filtered = allMovies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    // Sort movies
    filtered.sort((a, b) => {
      console.log(a, b);
      console.log(sortBy)
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return parseInt(b.year) - parseInt(a.year);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedGenre, sortBy, allMovies]);
  console.log(filteredMovies);

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">All Movies</h1>
          <p className="text-gray-400">Discover your next favorite film</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#16213e] rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Genre Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 h-5 w-5" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="title">Sort by Title</option>
                <option value="year">Sort by Year</option>
                <option value="rating">Sort by Rating</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredMovies.length} of {allMovies.length} movies
            {selectedGenre !== 'All' && ` in ${selectedGenre}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Movies Grid/List */}
        {filteredMovies.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              : "space-y-4"
          }>
            {filteredMovies.map((movie) => (
              viewMode === 'grid' ? (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  image={movie.image}
                  genre={movie.genre}
                />
              ) : (
                <div key={movie.id} className="bg-[#16213e] rounded-lg p-4 flex items-center gap-4 hover:bg-[#1a2547] transition-colors">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = `/movie/${movie.id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🎬</div>
            <h3 className="text-white text-xl font-semibold mb-2">No movies found</h3>
            <p className="text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredMovies.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors">
              Load More Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};