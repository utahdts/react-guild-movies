import { useQuery } from "react-query";

export default function useMoviesFetcher() {
    const { data: movies } = useQuery(
        ['allMovies'],
        () => fetch(`/api/movies`)
            .then(res => res.json())
            .then(movies => {
                // lowercasing name for more optimized searching
                movies.forEach(movie => movie.nameLowerCase = movie.name.toLowerCase());

                return movies;
            }),
        {
            onError: error => console.error(error),
        }
    );
    return [movies || []];
};
