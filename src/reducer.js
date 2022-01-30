import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {
  END_TIME_SET,
  SUPER_TIMER_COMPLETED,
  SUPER_TIMER_STARTED,
  SUPER_TIMER_TICKED,
} from './action-types';
import convertDurationToSeconds from './lib/convertDurationToSeconds';
import convertSecondsToDuration from './lib/convertSecondsToDuration';
import updateTimerOnTick from './lib/updateTimerOnTick';

export const InitialState = new Record({
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
});

const initialState = new InitialState();

const tickTimers = (timers, elapsedTime, totalTime) =>
  timers.map(updateTimerOnTick(elapsedTime, totalTime));

const reducer = handleActions(
  {
    [SUPER_TIMER_COMPLETED]: (state) =>
      state
        .setIn(['superTimer', 'complete'], true)
        .setIn(['superTimer', 'active'], false),
  },
  initialState,
);

export default reducer;
