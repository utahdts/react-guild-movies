import produce from 'immer';
import { useState, useEffect } from 'react';

const useMoviesSorting = (movies, sortMethod) => {
  const [sortedMovies, setSortedMovies] = useState(movies);

  useEffect(() => {
    setSortedMovies(
        produce(
            movies,
            draftMovies => void(
                draftMovies.sort(sortMethod)
            )
        )
    );
  }, [movies, sortMethod]);
  return sortedMovies;
};

export default useMoviesSorting;
