import convertSecondsToDuration from './convertSecondsToDuration';

describe('convertSecondsToDuration', () => {
  describe('given durationInSeconds of 60', () => {
    const durationInSeconds = 60;

    it('returns "00:01:00"', () => {
      expect(convertSecondsToDuration(durationInSeconds)).toEqual('00:01:00');
    });
  });
});
