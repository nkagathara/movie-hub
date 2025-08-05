export interface TVShow {
  id: number;
  title: string;
  year: string;
  rating: number;
  image: string;
  genre: string;
}

export const trendingTVShows: TVShow[] = [
  {
    id: 1,
    title: "Stranger Things",
    year: "2022",
    rating: 8.7,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "The Mandalorian",
    year: "2023",
    rating: 8.8,
    image: "https://images.pexels.com/photos/8263336/pexels-photo-8263336.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    genre: "Action"
  },
  {
    id: 3,
    title: "Loki",
    year: "2023",
    rating: 8.2,
    image: "https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    genre: "Fantasy"
  }
];

export const popularTVShows: TVShow[] = [
  {
    id: 4,
    title: "Breaking Bad",
    year: "2008",
    rating: 9.5,
    image: "https://images.pexels.com/photos/7991472/pexels-photo-7991472.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    genre: "Crime"
  },
  {
    id: 5,
    title: "Game of Thrones",
    year: "2011",
    rating: 9.2,
    image: "https://images.pexels.com/photos/8263339/pexels-photo-8263339.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    genre: "Drama"
  },
  {
    id: 6,
    title: "The Witcher",
    year: "2019",
    rating: 8.1,
    image: "https://images.pexels.com/photos/7991473/pexels-photo-7991473.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    genre: "Fantasy"
  }
]; 