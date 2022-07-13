const Recording = ({ video }) => {
    return (
        <div
            className="px-4 py-2 m-2 border border-gray-500 rounded-lg lg:max-w-xs"
        >
            <a href={`/movie/${video.id}`}>
                <div className="flex flex-col justify-center h-full">
                    <svg id="visual" viewBox="0 0 900 600" width="90" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <rect x="0" y="0" width="900" height="600" fill="#001220"></rect><g fill="#A7233A"><circle r="147" cx="696" cy="31"></circle><circle r="65" cx="878" cy="472"></circle><circle r="119" cx="445" cy="260"></circle></g></svg>
                    <a className="text-lg text-center hover:text-indigo-800 hover:cursor-pointer">
                        {video.name}<br />
                        {video.createdTime}
                    </a>
                </div>
            </a>
            <p className="text-xs tracking-tight text-center text-gray-500 uppercase">
                {video.authors?.map((author) => (
                    <span key={author}>{author}</span>
                ))}
            </p>
            <p className="text-xs tracking-tight text-center text-gray-500">
                {video.date}
            </p>
            <p className="mt-2 mb-6 text-sm text-gray-500">
                {video.description}
            </p>
            {
                video.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 mx-1 text-xs text-white bg-indigo-600 rounded-full"
                    >
                        {tag}
                    </span>
                ))
            }
        </div>
    )
};

export default Recording;
