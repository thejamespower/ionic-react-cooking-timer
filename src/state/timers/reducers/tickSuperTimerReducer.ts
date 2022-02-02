import { tickTimers } from './startSuperTimerReducer';
import { PayloadAction } from '@reduxjs/toolkit';

export const tickSuperTimerReducer = (
  state: any,
  { payload }: PayloadAction<number>,
) => {
  if (state.timers.length === 0 || !state.superTimer.active) {
    return state;
  }

  const elapsedTime = state.superTimer.durationInSeconds - payload;
  const { timers } = state;
  const totalTime = state.superTimer.durationInSeconds;
  const newTimers = tickTimers(timers, elapsedTime, totalTime);

  state.superTimer.currentCount = payload;
  state.superTimer.elapsedTime = elapsedTime;
  state.timers = newTimers;
};
