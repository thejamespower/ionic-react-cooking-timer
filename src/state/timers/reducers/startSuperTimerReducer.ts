import updateTimerOnTick from '../../../lib/updateTimerOnTick';
import { Timer } from '../timersSlice';

export const tickTimers = (
  timers: Timer[],
  elapsedTime: number,
  totalTime: number,
) => {
  return timers.map(updateTimerOnTick(elapsedTime, totalTime));
};

export const startSuperTimerReducer = (state: any) => {
  if (state.timers.length === 0 || state.superTimer.active) {
    return state;
  }
  const elapsedTime =
    state.superTimer.durationInSeconds - (state.superTimer.currentCount || 0);
  const { timers } = state;
  const totalTime = state.superTimer.durationInSeconds;
  const newTimers = tickTimers(timers, elapsedTime, totalTime);

  state.superTimer.active = true;
  state.timers = newTimers;
};
