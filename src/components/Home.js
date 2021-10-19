import Head from "next/head";
import { useState, useEffect } from "react";
import useMoviesSorting from "../hooks/useMoviesSorting";
import useMoviesFetcher from "../hooks/useMoviesFetcher";
import MovieListItem from "./MovieListItem";

const sorter = [
    {
        value: 'sort-by-name',
        label: 'Name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        value: 'sort-by-created',
        label: 'Create Date',
        sorter: (a, b) => (new Date(a.createdTime)).getTime() - (new Date(b.createdTime)).getTime(),
    },
];

const propTypes = {};
const defaultProps = {};

function Home() {
    const [movies] = useMoviesFetcher();
    const [filteredMovies, setFilteredMovies] = useState(movies);


    const [searchText, setSearchText] = useState("");
    const search = () => console.log(searchText);
    const [sortValue, setSortValue] = useState(sorter[1].value);
    const sortedMovies = useMoviesSorting(filteredMovies, sorter.find(sort => sort.value === sortValue).sorter);

    useEffect(() => {
        // TODO: searchable by tag: name:%react%
        const searchTextPieces = searchText.toLowerCase().split(' ');
        setFilteredMovies(movies.filter(movie => {
            return searchTextPieces.every(searchTextPiece => movie.nameLowerCase.includes(searchTextPiece))
        }));
    }, [movies, searchText]);

    return (
        <div>
            <Head>
                <title>React Guild Movies</title>
                <meta
                    name="description"
                    content="Recordings from React Guild presentations"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="p-4">
                <h1 className="p-2 text-3xl font-bold text-center">
                    React Guild Movies
                </h1>
                <div className="flex flex-row justify-center">
                    <input
                        className="block w-1/2 mt-0 text-gray-500 border-0 border-b-2 border-gray-300"
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search"
                    />
                    <input type="button" value="Search" onClick={search} />
                </div>
                <div className="flex flex-row justify-center">
                    <label htmlFor="sort-by">Sort By:</label>
                    <select id="sort-by" value={sortValue} onChange={e => setSortValue(e.target.value)}>
                        {Object.values(sorter).map(sort => (
                            <option
                                key={sort.value}
                                value={sort.value}
                            >
                                {sort.label}
                            </option>
                        ))}
                    </select>
                </div>
            </main>
            <section className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedMovies.map((movie) => (
                    <MovieListItem movie={movie} key={movie.id} />
                ))}
            </section>
        </div >
    );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;