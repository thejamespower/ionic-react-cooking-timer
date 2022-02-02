import convertSecondsToDuration from '../../../lib/convertSecondsToDuration';
import convertDurationToSeconds from '../../../lib/convertDurationToSeconds';

import { Duration } from '../../../components/TimeField/TimeField';
import { PayloadAction } from '@reduxjs/toolkit';

const calculateStartTime = (endTime: Duration, durationInSeconds: number) => {
  return convertSecondsToDuration(
    convertDurationToSeconds(endTime) - durationInSeconds,
  );
};

export const setEndTimeReducer = (
  state: any,
  { payload }: PayloadAction<string>,
) => {
  const startTime = calculateStartTime(
    payload,
    state.superTimer.durationInSeconds,
  );
  state.superTimer.endTime = payload;
  state.superTimer.startTime = startTime;
};
