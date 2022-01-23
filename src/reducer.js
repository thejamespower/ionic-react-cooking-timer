import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {
  END_TIME_SET,
  SUB_TIMER_CREATED,
  SUPER_TIMER_COMPLETED,
  SUPER_TIMER_STARTED,
  SUPER_TIMER_TICKED,
  TIMER_COMPLETED,
  TIMER_CREATED,
  TIMER_DELETED,
} from './action-types';
import convertDurationToSeconds from './lib/convertDurationToSeconds';
import convertSecondsToDuration from './lib/convertSecondsToDuration';
import getTotalDurationInSeconds from './lib/getTotalDurationInSeconds';
import updateTimerOnTick from './lib/updateTimerOnTick';
import setTimerStart from './lib/setTimerStart';
import completeTimer from './lib/completeTimer';
import { v4 as uuid } from 'uuid';

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
    [TIMER_CREATED]: (state, { payload }) => {
      if (
        payload.duration === '00:00:00' ||
        state.superTimer.active ||
        !payload.name
      ) {
        return state;
      }

      const timer = {
        ...payload,
        id: payload.id || uuid(),
        durationInSeconds: convertDurationToSeconds(payload.duration),
        active: false,
        complete: false,
      };

      // Add new timers to list
      const newTimers = [...state.timers, timer];

      const totalDurationInSeconds = getTotalDurationInSeconds(newTimers);

      // Calculate new timer start time
      const newTimerWithStartTime = {
        ...timer,
        timeToStartInSeconds:
          totalDurationInSeconds - convertDurationToSeconds(payload.duration),
        timeToStart: convertSecondsToDuration(
          totalDurationInSeconds - convertDurationToSeconds(payload.duration),
        ),
      };

      const oldTimers = state.timers;

      // Calculate old timers new start times
      const oldTimersWithNewStartTimes = oldTimers.map(
        setTimerStart(totalDurationInSeconds),
      );

      const newTimersWithStartTimes = [
        ...oldTimersWithNewStartTimes,
        newTimerWithStartTime,
      ];

      const startTime = state.superTimer.endTime
        ? calculateStartTime(state.superTimer.endTime, totalDurationInSeconds)
        : state.superTimer.startTime;

      return state
        .set('timers', newTimersWithStartTimes)
        .setIn(['superTimer', 'currentCount'], totalDurationInSeconds)
        .setIn(
          ['superTimer', 'duration'],
          convertSecondsToDuration(totalDurationInSeconds),
        )
        .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
        .setIn(['superTimer', 'startTime'], startTime);
    },

    [SUB_TIMER_CREATED]: (state, { payload }) => {
      if (!state.timers.length || state.superTimer.active || !payload.name) {
        return state;
      }

      const subTimer = {
        ...payload,
        id: payload.id || uuid(),
        active: false,
        complete: false,
        durationInSeconds: convertDurationToSeconds(payload.duration),
        offsetInSeconds: convertDurationToSeconds(payload.offset),
        timeToStart: '00:00:00',
        timeToStartInSeconds: 0,
      };

      // Add new timers to list
      const newTimers = [...state.timers, subTimer];

      return state.set('timers', newTimers);
    },

    [TIMER_DELETED]: (state, { payload }) => {
      if (!payload || state.superTimer.active) {
        return state;
      }

      // Get timers to keep
      const timers = [
        ...state.timers.filter(
          (x) => x.id !== payload && x.parentId !== payload,
        ),
      ];

      const totalDurationInSeconds = getTotalDurationInSeconds(timers);

      // Set timers new start time
      const transformedTimers = timers.map(
        setTimerStart(totalDurationInSeconds),
      );

      return state
        .set('timers', transformedTimers)
        .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
        .setIn(
          ['superTimer', 'duration'],
          convertSecondsToDuration(totalDurationInSeconds),
        );
    },

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
