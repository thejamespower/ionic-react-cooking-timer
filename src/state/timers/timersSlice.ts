import { createSlice } from '@reduxjs/toolkit';

import { createTimerReducer } from './reducers/createTimerReducer';
import { createSubTimerReducer } from './reducers/createSubTimerReducer';
import { deleteTimerReducer } from './reducers/deleteTimerReducer';
import { finishTimerReducer } from './reducers/finishTimerReducer';
import { startSuperTimerReducer } from './reducers/startSuperTimerReducer';
import { tickSuperTimerReducer } from './reducers/tickSuperTimerReducer';
import { setEndTimeReducer } from './reducers/setEndTimeReducer';
import { finishSuperTimerReducer } from './reducers/finishSuperTimerReducer';
import { Duration } from '../../components/TimeField/TimeField';
import { RootState } from '../../store';

export interface Timer {
  name: string;
  id: string;
  duration: Duration;
  durationInSeconds: number;
  active: boolean;
  finished: boolean;
}

export interface TimerWithTimeToStart extends Timer {
  timeToStart: Duration;
  timeToStartInSeconds: number;
}

export interface SubTimer extends Timer {
  parentId: string;
  offsetInSeconds: number;
  offset: Duration;
}

export interface SubTimerWithTimeToStart
  extends SubTimer,
    TimerWithTimeToStart {}

export interface SuperTimer {
  endTime: Duration | null;
  startTime: Duration | null;
  duration: Duration;
  durationInSeconds: number;
  active: boolean;
  currentCount: number | null;
  elapsedTime: number;
  finished: boolean;
}

export interface TimerState {
  timers: Timer[];
  superTimer: SuperTimer;
}

export const initialState: TimerState = {
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
export const selectTimers = (state: RootState) => state.timers.timers;
export const superTimerSelector = (state: RootState) => state.timers.superTimer;

// reducer
export default timersSlice.reducer;
