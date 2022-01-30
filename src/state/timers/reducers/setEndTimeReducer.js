import convertSecondsToDuration from '../../../lib/convertSecondsToDuration';
import convertDurationToSeconds from '../../../lib/convertDurationToSeconds';

const calculateStartTime = (endTime, durationInSeconds) => {
  return convertSecondsToDuration(
    convertDurationToSeconds(endTime) - durationInSeconds,
  );
};

export const setEndTimeReducer = (state, { payload }) => {
  const startTime = calculateStartTime(
    payload,
    state.superTimer.durationInSeconds,
  );
  state.superTimer.endTime = payload;
  state.superTimer.startTime = startTime;
};
