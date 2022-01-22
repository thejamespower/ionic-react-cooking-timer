import convertDurationToSeconds from './convertDurationToSeconds';

describe('convertDurationToSeconds', () => {
  beforeAll(() => {});

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('given duration of "01:10:21"', () => {
    const duration = '01:10:21'; // 1 hour, 10 mins and 21 seconds

    it('returns 4221', () => {
      expect(convertDurationToSeconds(duration)).toEqual(4221);
    });
  });
});
