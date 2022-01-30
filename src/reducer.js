import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {
  END_TIME_SET,
  SUPER_TIMER_COMPLETED,
  SUPER_TIMER_STARTED,
  SUPER_TIMER_TICKED,
  TIMER_COMPLETED,
  TIMER_DELETED,
} from './action-types';
import convertDurationToSeconds from './lib/convertDurationToSeconds';
import convertSecondsToDuration from './lib/convertSecondsToDuration';
import getTotalDurationInSeconds from './lib/getTotalDurationInSeconds';
import updateTimerOnTick from './lib/updateTimerOnTick';
import setTimerStart from './lib/setTimerStart';
import completeTimer from './lib/completeTimer';

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

const calculateStartTime = (endTime, durationInSeconds) => {
  return convertSecondsToDuration(
    convertDurationToSeconds(endTime) - durationInSeconds,
  );
};

const reducer = handleActions(
  {
    [TIMER_COMPLETED]: (state, { payload }) => {
      const timers = [...state.timers.map(completeTimer(payload))];
      return state.set('timers', timers);
    },

    [SUPER_TIMER_STARTED]: (state) => {
      if (state.timers.length === 0 || state.superTimer.active) {
        return state;
      }
      const elapsedTime =
        state.superTimer.durationInSeconds -
        (state.superTimer.currentCount || 0);
      const { timers } = state;
      const totalTime = state.superTimer.durationInSeconds;
      const newTimers = tickTimers(timers, elapsedTime, totalTime);
      return state
        .setIn(['superTimer', 'active'], true)
        .set('timers', newTimers);
    },

    [SUPER_TIMER_TICKED]: (state, { payload }) => {
      if (state.timers.length === 0 || !state.superTimer.active) {
        return state;
      }

      const elapsedTime = state.superTimer.durationInSeconds - payload;
      const { timers } = state;
      const totalTime = state.superTimer.durationInSeconds;
      const newTimers = tickTimers(timers, elapsedTime, totalTime);
      return state
        .setIn(['superTimer', 'currentCount'], payload)
        .setIn(['superTimer', 'elapsedTime'], elapsedTime)
        .set('timers', newTimers);
    },

    [SUPER_TIMER_COMPLETED]: (state) =>
      state
        .setIn(['superTimer', 'complete'], true)
        .setIn(['superTimer', 'active'], false),

    [END_TIME_SET]: (state, { payload }) => {
      const startTime = calculateStartTime(
        payload,
        state.superTimer.durationInSeconds,
      );
      return state
        .setIn(['superTimer', 'endTime'], payload)
        .setIn(['superTimer', 'startTime'], startTime);
    },
  },
  initialState,
);

export default reducer;
