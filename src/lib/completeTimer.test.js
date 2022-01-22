import completeTimer from './completeTimer';

describe('completeTimer', () => {
  describe('given x', () => {
    const x = {
      id: '1',
      active: true,
      complete: false,
    };

    const assertCommon = id => {
      it('destructures x', () => {
        expect(completeTimer(id)(x).id).toEqual('1');
      });
    };

    describe('when id equals x.id', () => {
      const id = '1';

      assertCommon(id);

      it('sets property complete to true', () => {
        expect(completeTimer(id)(x).complete).toEqual(true);
      });

      it('sets property active to false', () => {
        expect(completeTimer(id)(x).active).toEqual(false);
      });
    });

    describe('when id does not equal x.id', () => {
      const id = '2';

      assertCommon(id);

      it('returns x', () => {
        expect(completeTimer(id)(x)).toEqual(x);
      });
    });
  });
});
