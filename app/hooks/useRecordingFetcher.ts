import { useQuery } from "react-query";
import type { IRecording } from "../../types/IRecording";

export default function useRecordingFetcher(): {
  data: [IRecording];
  status: string;
} {
  const { data, status } = useQuery(
    ["allRecordings"],
    () =>
      fetch(`/api/recordings`)
        .then((res) => res.json())
        .then((recordings: [IRecording]): [IRecording] => {
          // lower casing name for more optimized searching
          recordings.forEach(
            (video: IRecording) =>
              (video.nameLowerCase = video.name.toLowerCase())
          );

          return recordings;
        }),
    {
      onError: (error) => console.error(error),
    }
  );

  //TODO? is this a good idea?
  return { data: data ?? ([] as unknown as [IRecording]), status };
}
