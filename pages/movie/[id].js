import produce from 'immer';
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import CharacterSeparatedPill from '../../src/components/CharacterSeparatedPills/CharacterSeparatedPill';
import CharacterSeparatedPills from '../../src/components/CharacterSeparatedPills/CharacterSeparatedPills';

const propTypes = {
    id: PropTypes.string.isRequired,
};
const defaultProps = {
};

const separator = ',';
const identity = s => s;
export default function Movie({ id: movieId }) {
    const router = useRouter()
    const [movie, setMovie] = useState(null);
    const [tagsArray, setTagsArray] = useState([]);
    const [presentersArray, setPresentersArray] = useState([]);

    useEffect(
        () => {
            if (movie?.properties?.tags) {
                setTagsArray((movie.properties?.tags || '').split(separator).filter(identity));
            } else {
                setTagsArray([]);
            }
        },
        [movie?.properties?.tags]
    );

    useEffect(
        () => {
            if (movie?.properties?.presenters) {
              setPresentersArray((movie?.properties?.presenters || '').split(separator).filter(identity));
            } else {
              setPresentersArray([]);
            }
        },
        [movie?.properties?.presenters]
    );

    useQuery(
        ['fetchSingleMovie', movieId],
        () => fetch(`/api/movie/${movieId}`)
            .then(res => res.json())
            .then(movie => {
                // translate movie fields for the UI
                movie.properties = movie.properties || {};
                // movie.properties && (movie.properties.presenter = []);//movie.presenter ? JSON.parse(movie.presenter) : [];
                return movie;
            }),
        {
            enabled: !!movieId,
            onSuccess: movieFromQuery => setMovie(movieFromQuery),
            onError: error => console.error(error),
        }
    );

    const { mutate: saveMovie } = useMutation(
        data => {
            // const saveData = { ...data };
            // saveData.properties && (saveData.properties.presenter = JSON.stringify(saveData?.properties?.presenter || []));

            return fetch(
                `/api/movie/${movieId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                },
                {
                    onSuccess: data => {
                        console.log(data);
                    },
                    onError: () => {
                        alert("there was an error")
                    },
                    onSettled: () => queryClient.invalidateQueries('allMovies')
                }
            );
        }
    );

    const save = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Saving movie!', movie);
        saveMovie(movie);
    };


    const changeField = field => e => setMovie(produce(draft => {
        // use pointers in draft to
        field.split('.')
            .reduce((obj, path, i, paths) => {
                if (i === paths.length - 1) {
                    // last path item, so set field's value to new value
                    obj[path] = e.target.value;
                    obj = null;
                } else {
                    // create path location if it doesn't exist
                    if (!draft[path]) {
                        draft[path] = {};
                    }
                    // loop to the next level
                    obj = draft[path];
                }
                return obj;
            }, draft);
    }));

    return (
        movie ? (
            <form className="w-1/2 p-10 mx-auto" action="#" method="POST">
                <div className="mb-4">
                    <input className="text-xs" type="button" value="&larr; Go Back Home" onClick={() => router.back()} />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={movie?.name ?? ''}
                        className="block w-full mt-1 text-2xl border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={changeField('name')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="text"
                        name="createdTime"
                        id="createdTime"
                        value={movie?.createdTime ?? ''}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={changeField('createdTime')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Presenters
                    </label>
                    <CharacterSeparatedPills
                        pillTexts={presentersArray}
                        separator={separator}
                        onAddPill={newPillText => setMovie(produce(draftMovie => {
                            if (draftMovie.properties?.presenters) {
                                draftMovie.properties.presenters += separator + newPillText;
                            } else {
                                draftMovie.properties.presenters = newPillText;
                            }
                        }))}
                        onRemovePill={pillIdx => {
                            setMovie(produce(draftMovie => {
                                draftMovie.properties.presenters = presentersArray.filter((_, i) => i !== pillIdx).join(separator);
                            }));
                        }}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    <CharacterSeparatedPills
                        pillTexts={tagsArray}
                        separator={separator}
                        onAddPill={newPillText => setMovie(produce(draftMovie => {
                            if (draftMovie.properties?.tags) {
                                draftMovie.properties.tags += separator + newPillText;
                            } else {
                                draftMovie.properties.tags = newPillText;
                            }
                        }))}
                        onRemovePill={pillIdx => {
                            setMovie(produce(draftMovie => {
                                draftMovie.properties.tags = tagsArray.filter((_, i) => i !== pillIdx).join(separator);
                            }));
                        }}
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
                <div>
                    {/* TODO: show movie component to view movie */}
                    webViewLink: {movie.webViewLink}
                </div>
                <div className="mb-4">
                    <button onClick={save}>Save</button>
                </div>
            </form >
        )
            : <div>Is Loading...</div>
    );
}
Movie.getInitialProps = props => props.query;
Movie.propTypes = propTypes;
Movie.defaultProps = defaultProps;
