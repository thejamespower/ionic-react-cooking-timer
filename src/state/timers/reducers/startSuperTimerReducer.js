import updateTimerOnTick from '../../../lib/updateTimerOnTick';

export const tickTimers = (timers, elapsedTime, totalTime) =>
  timers.map(updateTimerOnTick(elapsedTime, totalTime));

export const startSuperTimerReducer = (state) => {
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
