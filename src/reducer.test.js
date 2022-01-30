import { Record } from 'immutable';
import reducer, { InitialState } from './reducer';
import { END_TIME_SET } from './action-types';

const TimerState = ({ active, inProgress = true, subTimer = null, endTime }) =>
  new Record({
    superTimer: {
      endTime,
      active,
      complete: false,
      currentCount: inProgress ? 90 : 120,
      duration: '00:02:00',
      durationInSeconds: 120,
      elapsedTime: inProgress ? 30 : 0,
    },
    timers: [
      {
        active: false,
        complete: false,
        duration: '00:01:00',
        durationInSeconds: 60,
        id: '1',
        timeToStart: inProgress ? '00:00:30' : '00:01:00',
        timeToStartInSeconds: inProgress ? 30 : 60,
      },
      {
        active,
        complete: false,
        duration: '00:02:00',
        durationInSeconds: 120,
        id: '2',
        timeToStart: '00:00:00',
        timeToStartInSeconds: 0,
      },
      ...(subTimer
        ? [
            {
              active: false,
              complete: false,
              offset: '00:01:00',
              offsetInSeconds: 60,
              duration: '00:01:00',
              durationInSeconds: 60,
              id: 'subTimer A',
              timeToStart: '00:00:00',
              timeToStartInSeconds: 0,
            },
          ]
        : []),
    ],
  });

describe('reducer', () => {
  it('returns initialState', () => {
    expect(reducer(undefined, {}).toJS()).toEqual({
      superTimer: {
        endTime: null,
        startTime: null,
        active: false,
        complete: false,
        currentCount: null,
        duration: '00:00:00',
        durationInSeconds: 0,
        elapsedTime: 0,
      },
      timers: [],
    });
  });
});
