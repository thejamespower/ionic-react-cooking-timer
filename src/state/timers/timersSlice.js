import { createSlice } from '@reduxjs/toolkit';

import updateTimerOnTick from '../../lib/updateTimerOnTick';
import { createTimer as createTimerReducer } from './reducers/createTimer';
import { createSubTimer as createSubTimerReducer } from './reducers/createSubTimer';
import { deleteTimer as deleteTimerReducer } from './reducers/deleteTimer';
import { completeTimerReducer } from './reducers/completeTimerReducer';

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

const tickTimers = (timers, elapsedTime, totalTime) =>
  timers.map(updateTimerOnTick(elapsedTime, totalTime));

export const timersSlice = createSlice({
  name: 'timers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createTimer: createTimerReducer,
    createSubTimer: createSubTimerReducer,
    deleteTimer: deleteTimerReducer,
    completeTimer: completeTimerReducer,
  },
});

// actions
export const { createTimer, createSubTimer, deleteTimer, completeTimer } =
  timersSlice.actions;

// selectors
export const selectTimers = (state) => state.timers.timers;

// reducer
export default timersSlice.reducer;
