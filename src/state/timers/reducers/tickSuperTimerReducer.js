import { tickTimers } from './startSuperTimerReducer';

export const tickSuperTimerReducer = (state, { payload }) => {
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
