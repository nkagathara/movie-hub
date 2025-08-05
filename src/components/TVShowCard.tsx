import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface TVShowCardProps {
  id: number;
  title: string;
  year: string;
  rating: number;
  image: string;
  genre?: string;
}

export const TVShowCard: React.FC<TVShowCardProps> = ({ 
    id,
    title, 
    year, 
    rating, 
    image, 
    genre 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  // Build full image URL (assuming TMDB base URL)
  const imageUrl = image 
    ? `https://image.tmdb.org/t/p/w500${image}` 
    : '/placeholder-movie.jpg';

  return (
    <div 
      className="group relative cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <img
          src={imageUrl}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>

        {/* Hover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>{year}</span>
            {genre && <span>{genre}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}; 