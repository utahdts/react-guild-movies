import { useEffect, useState } from "react";

export default function useMoviesFetcher(existingMovies = []) {
    const [movies, setMovies] = useState(existingMovies);

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/movies", { method: "get" });
            const data = await response.json();
            setMovies(data);
        })();
    }, []);

    return [movies, setMovies];
};
