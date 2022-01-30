import completeTimer from './completeTimer';

describe('completeTimer', () => {
  describe('given timer', () => {
    const timer = {
      id: '1',
      active: true,
      complete: false,
    };

    describe('when id equals timer.id', () => {
      const id = '1';

      it('completes timer', () => {
        expect(completeTimer(id)(timer)).toEqual({
          active: false,
          complete: true,
          id: '1',
        });
      });
    });

    describe('when id does not equal timer.id', () => {
      const id = '2';

      it('returns timer', () => {
        expect(completeTimer(id)(timer)).toEqual({
          active: true,
          complete: false,
          id: '1',
        });
      });
    });
  });
});
