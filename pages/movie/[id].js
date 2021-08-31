import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useQuery } from 'react-query';
import produce from 'immer';

const propTypes = {
    id: PropTypes.string.isRequired,
};
const defaultProps = {
};

export default function Movie({ id: movieId }) {
    const { isLoading, error, data: movieFromQuery } = useQuery(
        ['fetchSingleMovie', movieId],
        () => fetch(`/api/movie/${movieId}`).then(res => res.json())
    );
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        setMovie(movieFromQuery);
    }, [movieFromQuery]);

    const changeField = field => e => setMovie(produce(draft => {
        draft[field] = e.target.value;
    }));

    return (
        movie ? (
            <form className="w-1/2 p-10 mx-auto" action="#" method="POST">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={movie?.title ?? ''}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={changeField('title')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="text"
                        name="date"
                        id="date"
                        value={movie?.date ?? ''}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={changeField('date')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="presenter" className="block text-sm font-medium text-gray-700">
                        Presenter
                    </label>
                    <input
                        type="text"
                        name="presenter"
                        id="presenter"
                        value={movie?.authors?.join(', ') ?? ''}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={changeField('authors')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    {/* TODO: Change to an array picker */}
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={movie?.tags?.join(', ') ?? ''}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={changeField('tags')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                        Comments
                    </label>
                    <input
                        type="text"
                        name="comments"
                        id="comments"
                        value={movie?.comments ?? ''}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={changeField('comments')}
                    />
                </div>
            </form>
        )
            : <div>Is Loading...</div>
    );
}
Movie.getInitialProps = props => props.query;
Movie.propTypes = propTypes;
Movie.defaultProps = defaultProps;
