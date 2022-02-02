import finishTimer from './finishTimer';
import { Timer } from '../state/timers/timersSlice';

describe('finishTimer', () => {
  describe('given timer', () => {
    const timer: Timer = {
      id: '1',
      active: true,
      finished: false,
      name: 'Chips',
      duration: '00:00:00',
      durationInSeconds: 0,
    };

    describe('when id equals timer.id', () => {
      const id = '1';

      it('finishes timer', () => {
        expect(finishTimer(id)(timer)).toEqual({
          id: '1',
          active: false,
          finished: true,
          name: 'Chips',
          duration: '00:00:00',
          durationInSeconds: 0,
        });
      });
    });

    describe('when id does not equal timer.id', () => {
      const id = '2';

      it('returns timer', () => {
        expect(finishTimer(id)(timer)).toEqual({
          id: '1',
          active: true,
          finished: false,
          name: 'Chips',
          duration: '00:00:00',
          durationInSeconds: 0,
        });
      });
    });
  });
});
