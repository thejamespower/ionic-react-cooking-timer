import convertSecondsToDuration from './convertSecondsToDuration';

describe('convertSecondsToDuration', () => {
  it.each([
    { durationInSeconds: 0, expected: '00:00:00' },
    { durationInSeconds: 60, expected: '00:01:00' },
    { durationInSeconds: 200, expected: '00:03:20' },
    { durationInSeconds: 600, expected: '00:10:00' },
    { durationInSeconds: 6600, expected: '01:50:00' },
    { durationInSeconds: 6660, expected: '01:51:00' },
  ])(
    'returns $expected for $durationInSeconds',
    ({ durationInSeconds, expected }) => {
      expect(convertSecondsToDuration(durationInSeconds)).toEqual(expected);
    },
  );
});
