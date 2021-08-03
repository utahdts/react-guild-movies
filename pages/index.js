import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import useMoviesSorting from "./useMoviesSorting";

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

export default function Home() {
  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/movies", { method: "get" });
      const data = await response.json();

      setMovies(data);
    }

    loadData();
  }, []);

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const search = () => console.log(searchText);
  const [sortValue, setSortValue] = useState(sorter[1].value);
  const sortedMovies = useMoviesSorting(movies, sorter.find(sort => sort.value === sortValue).sorter);

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
          <div
            key={movie.id}
            className="px-4 py-2 m-2 border border-gray-500 rounded-lg lg:max-w-xs"
          >
            <Link href={`/movie/${movie.id}`} passHref>
              <div className="flex flex-col justify-center h-full">
                {
                  movie.mimeType === 'video/mp4'
                    ? <img className="border border-indigo-600 rounded-lg shadow-md" src={movie.thumbnailLink} />
                    : undefined
                }
                <a className="text-lg text-center hover:text-indigo-800 hover:cursor-pointer">
                  {movie.name}
                </a>
              </div>
            </Link>
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
          </div>
        ))}
      </section>
    </div >
  );
}
