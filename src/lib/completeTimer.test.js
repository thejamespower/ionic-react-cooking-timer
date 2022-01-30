import finishTimer from './finishTimer';

describe('finishTimer', () => {
  describe('given timer', () => {
    const timer = {
      id: '1',
      active: true,
      finished: false,
    };

    describe('when id equals timer.id', () => {
      const id = '1';

      it('finishes timer', () => {
        expect(finishTimer(id)(timer)).toEqual({
          active: false,
          finished: true,
          id: '1',
        });
      });
    });

    describe('when id does not equal timer.id', () => {
      const id = '2';

      it('returns timer', () => {
        expect(finishTimer(id)(timer)).toEqual({
          active: true,
          finished: false,
          id: '1',
        });
      });
    });
  });
});
