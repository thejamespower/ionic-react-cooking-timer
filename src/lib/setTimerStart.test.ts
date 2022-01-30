import setTimerStart from './setTimerStart';
import { SubTimer, Timer } from '../state/timers/timersSlice';

describe('timerStart', () => {
  describe('given total', () => {
    const total = 100;

    describe('given parent', () => {
      const x: Timer = {
        id: 'chips',
        name: 'Chips 🍟',
        durationInSeconds: 10,
        duration: '00:00:10',
        active: false,
        finished: false,
      };

      it('sets timer start', () => {
        const run = setTimerStart(total)(x);
        expect(run).toEqual({
          id: 'chips',
          name: 'Chips 🍟',
          durationInSeconds: 10,
          duration: '00:00:10',
          active: false,
          finished: false,
          timeToStartInSeconds: 90,
          timeToStart: '00:01:30',
        });
      });
    });

    describe('given sub', () => {
      const x: SubTimer = {
        id: 'flip-chips',
        parentId: 'chips',
        name: 'Flip Chips 🍟',
        durationInSeconds: 5,
        duration: '00:00:05',
        active: false,
        finished: false,
        offsetInSeconds: 5,
        offset: '00:00:05',
      };

      it('sets timer start', () => {
        const run = setTimerStart(total)(x);
        expect(run).toEqual({
          id: 'flip-chips',
          parentId: 'chips',
          name: 'Flip Chips 🍟',
          duration: '00:00:05',
          durationInSeconds: 5,
          timeToStart: '00:01:30',
          timeToStartInSeconds: 90,
          active: false,
          finished: false,
          offsetInSeconds: 5,
          offset: '00:00:05',
        });
      });
    });
  });
});
