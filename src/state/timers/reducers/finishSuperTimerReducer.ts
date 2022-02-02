export const finishSuperTimerReducer = (state: any) => {
  state.superTimer.finished = true;
  state.superTimer.active = false;
};
