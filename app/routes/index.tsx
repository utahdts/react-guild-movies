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
        <h1 className="p-2 text-6xl font-black text-sky-600 text-center">
          React Guild Recordings
        </h1>
        <div className="flex flex-row justify-center gap-4 mt-4">
          <input
            className="bg-white border border-slate-400 w-1/2 py-2 px-3 text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-200 ease-in-out focus:border-sky-500 focus:outline-none focus:ring focus:ring-sky-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm rounded-md"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
          />
          <input
            className="rounded-full flex min-h-[2rem] cursor-pointer items-center justify-center border-2 px-7 py-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 border-sky-600 bg-sky-500 text-white hover:border-sky-700 hover:bg-sky-600 focus:border-sky-500 focus:ring-sky-600 active:bg-sky-700"
            type="button"
            value="Search"
            onClick={search}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-4 mt-4">
          <Listbox value={sortMethod} onChange={setSortMethod}>
            <Listbox.Label>Sort By</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-72 border border-slate-400 text-slate-800 cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left focus:border-sky-500 focus:outline-none focus:ring focus:ring-sky-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm">
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
      <section className="max-w-6xl mx-auto">
        <p className="font-bold text-3xl">Recording Collection</p>
        <div className="justify-items-center grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedRecordings.videos?.map((video: IRecording) => (
            <Recording video={video} key={video.id} />
          )) ?? (
            <div className="flex col-span-4 text-amber-500 font-bold text-4xl mt-6 border border-amber-700 rounded px-20 py-16 mb-10">
              <FilmIcon className="h-10 w-10 mr-4" /> No videos found
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
