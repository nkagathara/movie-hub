import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Star, Share, Loader2, AlertCircle } from 'lucide-react';
import { Header } from '../../components/Header';
import { useMovies } from '../../hooks/useMovies';

export const MovieDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { movieDetails, fetchMovieDetails, clearMovieDetails, error } = useMovies();

  useEffect(() => {
    if (id) {
      const movieId = parseInt(id, 10);
      if (!isNaN(movieId)) {
        fetchMovieDetails(movieId);
      }
    }

    // Cleanup function to clear movie details when leaving the page
    return () => {
      clearMovieDetails();
    };
  }, [id]); // Only depend on id to prevent infinite loops

  // Loading state
  if (!movieDetails && !error) {
    return (
      <div className="min-h-screen bg-[#1a1a2e]">
        <Header />
        <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a2e]">
        <Header />
        <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-white text-xl font-semibold mb-2">Failed to load movie details</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions for formatting
  const formatRuntime = (minutes: number) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return 'Unknown';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCountries = (countries: any[]) => {
    if (!countries || countries.length === 0) return 'Unknown';
    return countries.map(country => country.name).join(' • ');
  };

  const formatLanguages = (languages: any[]) => {
    if (!languages || languages.length === 0) return 'Unknown';
    return languages.map(lang => lang.english_name).join(' • ');
  };

  const formatCompanies = (companies: any[]) => {
    if (!companies || companies.length === 0) return 'Unknown';
    return companies.map(company => company.name).join(' • ');
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Movies
        </button>

        {/* Movie Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{movieDetails.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span>{movieDetails.year}</span>
              <span>•</span>
              <span>{movieDetails.adult ? 'R' : 'PG-13'}</span>
              <span>•</span>
              <span>{formatRuntime(movieDetails.runtime)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{movieDetails.rating}</span>
              <span className="text-gray-400 text-sm">({movieDetails.vote_count})</span>
            </div>
            <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Poster */}
          <div className="lg:col-span-1">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={movieDetails.image}
                alt={`${movieDetails.title} Poster`}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {movieDetails.tagline && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-purple-600 text-white px-2 py-1 rounded text-sm font-semibold mb-2 inline-block">
                    {movieDetails.tagline}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Backdrop and Details */}
          <div className="lg:col-span-2">
            {/* Backdrop Image */}
            <div className="relative rounded-lg overflow-hidden mb-6 bg-gray-900">
              <img
                src={movieDetails.backdrop}
                alt={`${movieDetails.title} Scene`}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
                  <Play className="h-5 w-5 fill-current" />
                  Play Trailer
                </button>
              </div>
            </div>

            {/* Genres */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {movieDetails.genres.map((genre: any) => (
                <span key={genre.id} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Visit Homepage Button */}
            {movieDetails.homepage && (
              <a
                href={movieDetails.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-8"
              >
                Visit Homepage →
              </a>
            )}

            {/* Movie Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movieDetails.overview || 'No overview available.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Release date</h4>
                  <p className="text-gray-300">{movieDetails.year}</p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Countries</h4>
                  <p className="text-gray-300">{formatCountries(movieDetails.production_countries)}</p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Status</h4>
                  <p className="text-gray-300">{movieDetails.status}</p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Languages</h4>
                  <p className="text-gray-300">{formatLanguages(movieDetails.spoken_languages)}</p>
                </div>

                {movieDetails.budget > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Budget</h4>
                    <p className="text-gray-300">{formatCurrency(movieDetails.budget)}</p>
                  </div>
                )}

                {movieDetails.revenue > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Revenue</h4>
                    <p className="text-gray-300">{formatCurrency(movieDetails.revenue)}</p>
                  </div>
                )}

                {movieDetails.tagline && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Tagline</h4>
                    <p className="text-gray-300">{movieDetails.tagline}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-white font-medium mb-2">Production Companies</h4>
                  <p className="text-gray-300">{formatCompanies(movieDetails.production_companies)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};