import getTotalDurationInSeconds from '../../../lib/getTotalDurationInSeconds';
import setTimerStart from '../../../lib/setTimerStart';
import convertSecondsToDuration from '../../../lib/convertSecondsToDuration';
import { SubTimer, Timer } from '../timersSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export const deleteTimerReducer = (
  state: any,
  { payload }: PayloadAction<string>,
) => {
  if (!payload || state.superTimer.active) {
    return state;
  }

  // Get timers to keep
  const timers = [
    ...state.timers.filter(
      (x: (Timer & { parentId?: boolean }) | SubTimer) =>
        x.id !== payload && x.parentId !== payload,
    ),
  ];

  const totalDurationInSeconds = getTotalDurationInSeconds(timers);

  // Set timers new start time
  state.timers = timers.map(setTimerStart(totalDurationInSeconds));
  state.superTimer.durationInSeconds = totalDurationInSeconds;
  state.superTimer.duration = convertSecondsToDuration(totalDurationInSeconds);
};
