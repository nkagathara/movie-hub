import { useEffect, useState } from "react";
import { tmdbAPI, TMDBMovie, transformTMDBMovie } from "../services/tmdb";

export const useTvShows = () => {
    const [tvShowsList, setTvShowsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTvShows = async () => {
            setLoading(true);
            setError(null);
            try {
                const [response, genresResponse] = await Promise.all([
                    tmdbAPI.getAllTvShows(),
                    tmdbAPI.getGenres(),
                ]);
                // Transform the movies to match your app's format
                const transformedTvList = response.results.map((movie: TMDBMovie) =>
                    transformTMDBMovie(movie, genresResponse.genres)
                );
                console.log(transformedTvList);
                setTvShowsList(transformedTvList);
            } catch (error) {
                setError(error as string);
                console.error('Failed to fetch tv shows:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTvShows();
    }, []);

    return {
        tvShowsList,
        loading,
        error,
    };
};