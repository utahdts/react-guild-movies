import movies from "../../apiData/movies";

export default async function handler({ query: { id: movieId } }, res) {
    const movieIdNumber = parseInt(movieId, 10);
    res.status(200).json(movies.find(movie => movie.id === movieIdNumber));
};
