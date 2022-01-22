import setTimerStart from './setTimerStart';
import convertSecondsToDuration from './convertSecondsToDuration';

jest.mock('./convertSecondsToDuration');

describe('timerStart', () => {
  beforeAll(() => {
    convertSecondsToDuration.mockImplementation(a => a);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('given total', () => {
    const total = 100;

    describe('given x', () => {
      const x = {
        durationInSeconds: 10,
      };

      it('returns destructured x', () => {
        const run = setTimerStart(total)(x);
        expect(run).toEqual(expect.objectContaining({ durationInSeconds: 10 }));
      });

      it('returns property calculateTimeToStartInSeconds', () => {
        const run = setTimerStart(total)(x);
        expect(run).toEqual(
          expect.objectContaining({ timeToStartInSeconds: 90 }),
        );
      });

      it('returns property timeToStart', () => {
        const run = setTimerStart(total)(x);
        expect(run).toEqual(expect.objectContaining({ timeToStart: 90 }));
      });
    });
  });
});
