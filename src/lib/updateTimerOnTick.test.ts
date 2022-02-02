import {
  Timer,
  SubTimer,
  SubTimerWithTimeToStart,
} from '../state/timers/timersSlice';
import updateTimerOnTick from './updateTimerOnTick';

describe('timersNewStart', () => {
  const testTimerDidNotStart = (
    elapsedTime: number,
    totalTime: number,
    x: (Timer & { offsetInSeconds?: number }) | SubTimer,
  ) => {
    describe('given time to start > 0', () => {
      it('does not start timer', () => {
        const run = updateTimerOnTick(elapsedTime, totalTime)(x);
        expect(run).toEqual({
          ...x,
          timeToStartInSeconds: 90,
          timeToStart: '00:01:30',
          active: false,
        });
      });
    });
  };

  const testTimerDidStart = (
    elapsedTime: number,
    totalTime: number,
    x: (Timer & { offsetInSeconds?: number }) | SubTimer,
  ) => {
    describe('given time to start <= 0', () => {
      it('starts timer', () => {
        const run = updateTimerOnTick(elapsedTime, totalTime)(x);
        expect(run).toEqual({
          ...x,
          timeToStartInSeconds: 0,
          timeToStart: '00:00:00',
          active: true,
        });
      });
    });
  };

  describe('given elapsedTime ', () => {
    const elapsedTime = 100;

    describe('given parent', () => {
      const x: Timer = {
        id: 'chips',
        name: 'Chips 🍟',
        durationInSeconds: 10,
        duration: '00:00:10',
        active: false,
        finished: false,
      };

      testTimerDidNotStart(elapsedTime, 200, x);
      testTimerDidStart(elapsedTime, 110, x);
    });

    describe('given sub', () => {
      const x: SubTimerWithTimeToStart = {
        id: 'flip-chips',
        parentId: 'chips',
        name: 'Flip Chips 🍟',
        duration: '00:00:05',
        durationInSeconds: 5,
        timeToStart: '00:01:30',
        timeToStartInSeconds: 90,
        finished: false,
        active: false,
        offset: '00:00:05',
        offsetInSeconds: 5,
      };

      testTimerDidNotStart(elapsedTime, 200, x);
      testTimerDidStart(elapsedTime, 110, x);
    });
  });
});
