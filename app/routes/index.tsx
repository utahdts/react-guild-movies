import useMoviesFetcher from "../hooks/useRecordingFetcher";
import useMoviesSorting from "../hooks/useRecordingSorting";
import Recording from "../components/Recording";

const search = () => { };
const searchText = "";
const setSearchText = (event) => { };

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

export default function Index() {
  const movies = useMoviesFetcher();
  const sortedMovies = useMoviesSorting(movies, sorter.find(sort => sort.value === sortValue).sorter);

  return (
    <div>
            <main className="p-4">
                <h1 className="p-2 text-3xl font-bold text-center">
                    React Guild Movies
                </h1>
                <div className="flex flex-row justify-center gap-4">
                    <input
                        className="bg-white border border-slate-400 w-1/2 py-2 px-3 text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-200 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm rounded-md"
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search"
                    />
                    <input className="rounded-full flex min-h-[2rem] cursor-pointer items-center justify-center border-2 px-7 py-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 border-indigo-600 bg-indigo-500 text-white hover:border-indigo-700 hover:bg-indigo-600 focus:border-indigo-500 focus:ring-indigo-600 active:bg-indigo-700" type="button" value="Search" onClick={search} />
                </div>
                <div className="flex flex-row justify-center">
                    <label htmlFor="sort-by">Sort By:</label>
                    {/* <select id="sort-by" value={sortValue} onChange={e => setSortValue(e.target.value)}> */}
                        {/* {Object.values(sorter).map(sort => ( */}
                            {/* <option */}
                                {/* key={sort.value} */}
                                {/* value={sort.value} */}
                            {/* > */}
                                {/* {sort.label} */}
                            {/* </option> */}
                        {/* ))} */}
                    {/* </select> */}
                </div>
            </main>
            <section className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedMovies?.map((video) => (
                    <Recording video={video} key={video.id} />
                 ))}
            </section>
        </div >
  );
}
