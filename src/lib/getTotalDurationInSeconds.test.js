import getTotalDurationInSeconds from './getTotalDurationInSeconds';

describe('getTotalDurationInSeconds', () => {
  describe('given no timers', () => {
    const timers = [];

    it('returns 0', () => {
      expect(getTotalDurationInSeconds(timers)).toEqual(0);
    });
  });

  describe('timers', () => {
    it.each([
      { timers: [{ durationInSeconds: 1 }], expected: 1 },
      {
        timers: [{ durationInSeconds: 1 }, { durationInSeconds: 2 }],
        expected: 2,
      },
      {
        timers: [
          { durationInSeconds: 1 },
          { durationInSeconds: 2 },
          { durationInSeconds: 2 },
          { durationInSeconds: 100 },
        ],
        expected: 100,
      },
    ])('returns total duration of $expected', ({ timers, expected }) => {
      expect(getTotalDurationInSeconds(timers)).toEqual(expected);
    });
  });
});
