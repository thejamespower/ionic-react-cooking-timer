import finishTimer from '../../../lib/finishTimer';
import { PayloadAction } from '@reduxjs/toolkit';

export const finishTimerReducer = (
  state: any,
  { payload }: PayloadAction<string>,
) => {
  state.timers = [...state.timers.map(finishTimer(payload))];
};
