import completeTimer from '../../../lib/completeTimer';

export const completeTimerReducer = (state, { payload }) => {
  state.timers = [...state.timers.map(completeTimer(payload))];
};
