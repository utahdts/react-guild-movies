import { useState } from "react";
import { useQuery } from "react-query";

export default function useMoviesFetcher() {
    const [resultMovies, setResultMovies] = useState([]);
    useQuery(
        ['allMovies'],
        () => fetch(`/api/movies`)
            .then(res => res.json())
            .then(movies => {
                // lowercasing name for more optimized searching
                movies.forEach(movie => movie.nameLowerCase = movie.name.toLowerCase());
                setResultMovies(movies);

                return movies;
            }),
        {
            onError: error => console.error(error),
        }
    );

    return [resultMovies];

    // returning a blank array was creating a new array each time and useEffect was seeing that as a new array pointer causing massive reruns of useEffect!
    // return [movies || []];
};
