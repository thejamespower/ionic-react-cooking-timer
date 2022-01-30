import convertDurationToSeconds from './convertDurationToSeconds';

describe('convertDurationToSeconds', () => {
  it.each([
    { expected: 0, duration: '00:00:00' },
    { expected: 60, duration: '00:01:00' },
    { expected: 200, duration: '00:03:20' },
    { expected: 600, duration: '00:10:00' },
    { expected: 6600, duration: '01:50:00' },
    { expected: 6660, duration: '01:51:00' },
  ])('returns $expected for $duration', ({ duration, expected }) => {
    expect(convertDurationToSeconds(duration)).toEqual(expected);
  });
});
