import { createSlice } from '@reduxjs/toolkit';

import { createTimerReducer } from './reducers/createTimerReducer';
import { createSubTimerReducer } from './reducers/createSubTimerReducer';
import { deleteTimerReducer } from './reducers/deleteTimerReducer';
import { finishTimerReducer } from './reducers/finishTimerReducer';
import { startSuperTimerReducer } from './reducers/startSuperTimerReducer';
import { tickSuperTimerReducer } from './reducers/tickSuperTimerReducer';
import { setEndTimeReducer } from './reducers/setEndTimeReducer';
import { finishSuperTimerReducer } from './reducers/finishSuperTimerReducer';

export const initialState = {
  timers: [],
  superTimer: {
    endTime: null,
    startTime: null,
    duration: '00:00:00',
    durationInSeconds: 0,
    active: false,
    currentCount: null,
    elapsedTime: 0,
    finished: false,
  },
};

export const timersSlice = createSlice({
  name: 'timers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createTimer: createTimerReducer,
    createSubTimer: createSubTimerReducer,
    deleteTimer: deleteTimerReducer,
    finishTimer: finishTimerReducer,
    startSuperTimer: startSuperTimerReducer,
    tickSuperTimer: tickSuperTimerReducer,
    setEndTime: setEndTimeReducer,
    finishSuperTimer: finishSuperTimerReducer,
  },
});

// actions
export const {
  createTimer,
  createSubTimer,
  deleteTimer,
  finishTimer,
  startSuperTimer,
  tickSuperTimer,
  setEndTime,
  finishSuperTimer,
} = timersSlice.actions;

// selectors
export const selectTimers = (state) => state.timers.timers;
export const superTimerSelector = (state) => state.timers.superTimer;

// reducer
export default timersSlice.reducer;
