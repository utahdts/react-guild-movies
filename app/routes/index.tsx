import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, FilmIcon, SelectorIcon } from "@heroicons/react/solid";
import useRecordingSorting from "../hooks/useRecordingSorting";
import Recording from "../components/Recording";
import googleDrive from "../helpers/googleDrive";
import type { IRecording } from "../../types/IRecording";

const search = () => {};
const searchText = "";
const setSearchText = (event) => {};

const sortMethods = [
  {
    value: "sort-by-name",
    label: "Recording name",
    sort: (a, b) => a.name.localeCompare(b.name),
  },
  {
    value: "sort-by-created",
    label: "Recording creation date",
    sort: (a, b) =>
      new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime(),
  },
];

const fields = [
  "id",
  "name",
  "mimeType",
  "webContentLink",
  "webViewLink",
  "iconLink",
  "hasThumbnail",
  "thumbnailLink",
  "createdTime",
  "originalFilename",
  "fullFileExtension",
  "size",
  "videoMediaMetadata",
];

export const loader: LoaderFunction = async () => {
  googleDrive?.files?.list(
    {
      fields: `files(${fields})`,
      orderBy: "createdTime desc",
    },
    (error, driveResponse) => {
      if (error) {
        console.error(`The API returned an error: ${error}`);
        return json({ error: error });
      }

      const mimeTypeKeepers = [
        "video/mp4",
        "text/plain",
        //   'application/vnd.google-apps.folder'
      ];

      const recordings = (driveResponse?.data.files ?? []).filter(
        (video: any): boolean => mimeTypeKeepers.includes(video.mimeType)
      );

      return json({ videos: recordings ?? [] });
    }
  );

  return json({ videos: [] });
};

export default function Index() {
  const recordings = useLoaderData();
  const [sortMethod, setSortMethod] = useState(sortMethods[0]);
  const sortedRecordings = useRecordingSorting(
    recordings.videos,
    sortMethod.sort
  );

  return (
    <main className="text-slate-800">
      <section className="p-4">
        <h1 className="p-2 text-center text-6xl font-black text-sky-600">
          React Guild Recordings
        </h1>
        <div className="mt-4 flex flex-row justify-center gap-4">
          <input
            className="w-1/2 rounded-md border border-slate-400 bg-white py-2 px-3 text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-200 ease-in-out focus:border-sky-500 focus:outline-none focus:ring focus:ring-sky-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
          />
          <input
            className="flex min-h-[2rem] cursor-pointer items-center justify-center rounded-full border-2 border-sky-600 bg-sky-500 px-7 py-1 text-white transition-all duration-200 ease-in-out hover:border-sky-700 hover:bg-sky-600 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50 active:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            value="Search"
            onClick={search}
          />
        </div>
        <div className="mt-4 flex flex-row items-center justify-center gap-4">
          <Listbox value={sortMethod} onChange={setSortMethod}>
            <Listbox.Label>Sort By</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-72 cursor-default rounded-md border border-slate-400 bg-white py-2 pl-3 pr-10 text-left text-slate-800 focus:border-sky-500 focus:outline-none focus:ring focus:ring-sky-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
                <span className="block truncate">{sortMethod.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortMethods.map((method, id) => (
                    <Listbox.Option
                      key={id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                        }`
                      }
                      value={method}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {method.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </section>
      <section className="mx-auto max-w-6xl">
        <p className="text-3xl font-bold">Recording Collection</p>
        <div className="grid grid-flow-row grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedRecordings.videos?.map((video: IRecording) => (
            <Recording video={video} key={video.id} />
          )) ?? (
            <div className="col-span-4 mt-6 mb-10 flex rounded border border-amber-700 px-20 py-16 text-4xl font-bold text-amber-500">
              <FilmIcon className="mr-4 h-10 w-10" /> No videos found
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
