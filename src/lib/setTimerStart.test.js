import setTimerStart from './setTimerStart';

describe('timerStart', () => {
  describe('given total', () => {
    const total = 100;

    describe('given parent', () => {
      const x = {
        id: 'chips',
        name: 'Chips 🍟',
        durationInSeconds: 10,
        duration: '00:00:10',
      };

      it('sets timer start', () => {
        const run = setTimerStart(total)(x);
        expect(run).toEqual({
          id: 'chips',
          name: 'Chips 🍟',
          durationInSeconds: 10,
          duration: '00:00:10',
          timeToStartInSeconds: 90,
          timeToStart: '00:01:30',
        });
      });
    });

    describe('given sub', () => {
      const x = {
        id: 'flip-chips',
        parentId: 'chips',
        name: 'Flip Chips 🍟',
        durationInSeconds: 5,
        duration: '00:00:05',
        active: false,
        offsetInSeconds: 5,
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
          offsetInSeconds: 5,
        });
      });
    });
  });
});
