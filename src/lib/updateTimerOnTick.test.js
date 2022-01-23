import updateTimerOnTick from './updateTimerOnTick';
import convertSecondsToDuration from './convertSecondsToDuration';

jest.mock('./convertSecondsToDuration');

describe('timersNewStart', () => {
  beforeAll(() => {
    convertSecondsToDuration.mockImplementation((a) => a);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('given elapsedTime ', () => {
    const elapsedTime = 100;

    describe('given parent', () => {
      const x = {
        id: 'chips',
        name: 'Chips 🍟',
        durationInSeconds: 10,
      };

      const assertCommon = (totalTime, timeToStart) => {
        it('returns destructured x', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(expect.objectContaining({ ...x }));
        });

        it('returns property calculateTimeToStartInSeconds', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(
            expect.objectContaining({ timeToStartInSeconds: timeToStart }),
          );
        });
      };

      describe('given calculateTimeToStartInSeconds != 0', () => {
        const totalTime = 200;

        assertCommon(totalTime, totalTime - x.durationInSeconds - elapsedTime);

        it('returns property active = false', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(expect.objectContaining({ active: false }));
        });
      });

      describe('given calculateTimeToStartInSeconds = 0', () => {
        const totalTime = 110;

        assertCommon(totalTime, totalTime - x.durationInSeconds - elapsedTime);

        it('returns property active = true', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(expect.objectContaining({ active: true }));
        });
      });
    });

    describe('given sub', () => {
      const x = {
        id: 'flip-chips',
        parentId: 'chips',
        name: 'Flip Chips 🍟',
        durationInSeconds: 10,
        timeToStartInSeconds: 0,
        active: false,
      };

      const assertCommon = (totalTime, timeToStart) => {
        it('returns correct', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(expect.objectContaining({ ...x, active: true }));
        });
      };

      describe('given calculateTimeToStartInSeconds != 0', () => {
        const totalTime = 200;

        assertCommon(totalTime, totalTime - x.durationInSeconds - elapsedTime);

        it('returns property active = false', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(expect.objectContaining({ active: false }));
        });
      });

      describe('given calculateTimeToStartInSeconds = 0', () => {
        const totalTime = 110;

        assertCommon(totalTime, totalTime - x.durationInSeconds - elapsedTime);

        it('returns property active = true', () => {
          const run = updateTimerOnTick(elapsedTime, totalTime)(x);
          expect(run).toEqual(expect.objectContaining({ active: true }));
        });
      });
    });
  });
});
