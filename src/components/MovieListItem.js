import Link from "next/link";
import PropTypes from "prop-types";

const propTypes = {
    movie: PropTypes.shape({

    }).isRequired,
};
const defaultProps = {};

const MovieListItem = ({ movie }) => {
    return (
        <div
            className="px-4 py-2 m-2 border border-gray-500 rounded-lg lg:max-w-xs"
        >
            <Link href={`/movie/${movie.id}`} passHref>
                <div className="flex flex-col justify-center h-full">
                    <svg id="visual" viewBox="0 0 900 600" width="90" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <rect x="0" y="0" width="900" height="600" fill="#001220"></rect><g fill="#A7233A"><circle r="147" cx="696" cy="31"></circle><circle r="65" cx="878" cy="472"></circle><circle r="119" cx="445" cy="260"></circle></g></svg>
                    <a className="text-lg text-center hover:text-indigo-800 hover:cursor-pointer">
                        {movie.name}<br />
                        {movie.createdTime}
                    </a>
                </div>
            </Link >
            <p className="text-xs tracking-tight text-center text-gray-500 uppercase">
                {movie.authors?.map((author) => (
                    <span key={author}>{author}</span>
                ))}
            </p>
            <p className="text-xs tracking-tight text-center text-gray-500">
                {movie.date}
            </p>
            <p className="mt-2 mb-6 text-sm text-gray-500">
                {movie.description}
            </p>
            {
                movie.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 mx-1 text-xs text-white bg-indigo-600 rounded-full"
                    >
                        {tag}
                    </span>
                ))
            }
        </div >
    )
};

MovieListItem.propTypes = propTypes;
MovieListItem.defaultProps = defaultProps;

export default MovieListItem;