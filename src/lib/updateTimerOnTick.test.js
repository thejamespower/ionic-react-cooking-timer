import updateTimerOnTick from './updateTimerOnTick';

describe('timersNewStart', () => {
  const testTimerDidNotStart = (elapsedTime, totalTime, x) => {
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

  const testTimerDidStart = (elapsedTime, totalTime, x) => {
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
      const x = {
        id: 'chips',
        name: 'Chips 🍟',
        durationInSeconds: 10,
      };

      testTimerDidNotStart(elapsedTime, 200, x);
      testTimerDidStart(elapsedTime, 110, x);
    });

    describe('given sub', () => {
      const x = {
        id: 'flip-chips',
        parentId: 'chips',
        name: 'Flip Chips 🍟',
        durationInSeconds: 5,
        timeToStartInSeconds: 90,
        active: false,
        offsetInSeconds: 5,
      };

      testTimerDidNotStart(elapsedTime, 200, x);
      testTimerDidStart(elapsedTime, 110, x);
    });
  });
});
