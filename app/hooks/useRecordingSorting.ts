import produce from 'immer';
import { useState, useEffect } from 'react';
import type { IRecording } from '../../types/IRecording';


const useRecordingSorting = (recording: [IRecording], sortMethod: (a: IRecording, b: IRecording) => number): [IRecording] => {
  const [sortedRecordings, setSortedRecordings] = useState<[IRecording]>(recording);

  useEffect(() => {
    setSortedRecordings(
        produce(
            recording,
            (draftRecordings:[IRecording]): void => void(
                draftRecordings.sort(sortMethod)
            )
        )
    );
  }, [recording, sortMethod, setSortedRecordings]);
  return sortedRecordings;
};

export default useRecordingSorting;
