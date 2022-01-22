import calculateTimeToStartInSeconds from './calculateTimeToStartInSeconds';

describe('calculateTimeToStartInSeconds', () => {
  describe('given result time is less than 0', () => {
    const totalTime = 1;
    const durationInSeconds = 2;
    const elapsedTime = 3;

    it('returns 0', () => {
      expect(
        calculateTimeToStartInSeconds(
          totalTime,
          durationInSeconds,
          elapsedTime,
        ),
      ).toEqual(0);
    });
  });

  describe('given result time is greater than 0', () => {
    const totalTime = 5;
    const durationInSeconds = 2;
    const elapsedTime = 1;

    it('returns correct time', () => {
      expect(
        calculateTimeToStartInSeconds(
          totalTime,
          durationInSeconds,
          elapsedTime,
        ),
      ).toEqual(2);
    });
  });
});
