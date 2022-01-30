import { Timer } from '../state/timers/timersSlice';

const getTotalDurationInSeconds = (timers: Timer[]) =>
  timers.length ? Math.max(...timers.map((x) => x.durationInSeconds)) : 0;

export default getTotalDurationInSeconds;
