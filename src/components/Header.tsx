import { Search, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-white font-bold text-xl">MovieHub</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={
                path === '/'
                  ? 'text-purple-400 font-semibold transition-colors'
                  : 'text-gray-400 hover:text-white transition-colors'
              }
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={
                path.startsWith('/movies')
                  ? 'text-purple-400 font-semibold transition-colors'
                  : 'text-gray-400 hover:text-white transition-colors'
              }
            >
              Movies
            </Link>
            <Link
              to="/tvshows"
              className={
                path.startsWith('/tvshows')
                  ? 'text-purple-400 font-semibold transition-colors'
                  : 'text-gray-400 hover:text-white transition-colors'
              }
            >
              TV Shows
            </Link>
            <Link
              to="/mylist"
              className={
                path.startsWith('/mylist')
                  ? 'text-purple-400 font-semibold transition-colors'
                  : 'text-gray-400 hover:text-white transition-colors'
              }
            >
              My List
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};