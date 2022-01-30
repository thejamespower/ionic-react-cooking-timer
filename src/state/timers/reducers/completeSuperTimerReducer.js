export const completeSuperTimerReducer = (state) => {
  state.superTimer.complete = true;
  state.superTimer.active = false;
};
