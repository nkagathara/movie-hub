import { Play, Plus, Star } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Featured Movie"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-sm text-gray-300">Featured</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Find Movies You'll Love
            <br />
            <span className="text-purple-400">Without the Hassle</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-6 max-w-lg">
            Discover your next favorite film with our AI-powered recommendations. 
            From blockbusters to hidden gems, we've got something for every taste.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">8.5</span>
              <span className="text-gray-400 text-sm ml-1">IMDb</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">2024</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">Action, Thriller</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <Play className="h-5 w-5 fill-current" />
              Watch Now
            </button>
            <button className="flex items-center gap-2 bg-gray-800/80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors backdrop-blur-sm">
              <Plus className="h-5 w-5" />
              My List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};