import { Timer } from '../state/timers/timersSlice';

const finishTimer = (id: string) => (x: Timer) =>
  x.id !== id
    ? x
    : {
        ...x,
        finished: true,
        active: false,
      };

export default finishTimer;
