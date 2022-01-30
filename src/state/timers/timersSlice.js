import { createSlice } from '@reduxjs/toolkit';

import { createTimerReducer } from './reducers/createTimerReducer';
import { createSubTimerReducer } from './reducers/createSubTimerReducer';
import { deleteTimerReducer } from './reducers/deleteTimerReducer';
import { completeTimerReducer } from './reducers/completeTimerReducer';
import { startSuperTimerReducer } from './reducers/startSuperTimerReducer';
import { tickSuperTimerReducer } from './reducers/tickSuperTimerReducer';
import { setEndTimeReducer } from './reducers/setEndTimeReducer';
import { completeSuperTimerReducer } from './reducers/completeSuperTimerReducer';

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
    complete: false,
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
    completeTimer: completeTimerReducer,
    startSuperTimer: startSuperTimerReducer,
    tickSuperTimer: tickSuperTimerReducer,
    setEndTime: setEndTimeReducer,
    completeSuperTimer: completeSuperTimerReducer,
  },
});

// actions
export const {
  createTimer,
  createSubTimer,
  deleteTimer,
  completeTimer,
  startSuperTimer,
  tickSuperTimer,
  setEndTime,
  completeSuperTimer,
} = timersSlice.actions;

// selectors
export const selectTimers = (state) => state.timers.timers;

// reducer
export default timersSlice.reducer;
