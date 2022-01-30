export const finishSuperTimerReducer = (state) => {
  state.superTimer.finished = true;
  state.superTimer.active = false;
};
