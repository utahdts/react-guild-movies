import { useState, useEffect } from 'react';

export default (movies, sortMethod) => {
  const [sortedMovies, setSortedMovies] = useState(movies);

  useEffect(() => {
    setSortedMovies(movies.sort(sortMethod));
  }, [movies, sortMethod]);

  return sortedMovies;
};