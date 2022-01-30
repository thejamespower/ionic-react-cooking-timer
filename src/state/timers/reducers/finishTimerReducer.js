import finishTimer from '../../../lib/finishTimer';

export const finishTimerReducer = (state, { payload }) => {
  state.timers = [...state.timers.map(finishTimer(payload))];
};
