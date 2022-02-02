import convertSecondsToDuration from './convertSecondsToDuration';
import { SubTimer, Timer } from '../state/timers/timersSlice';

// @TODO: better conditional types
const setTimerStart =
  (total: number) =>
  (x: SubTimer | (Timer & { offsetInSeconds?: number })) => ({
    ...x,
    timeToStartInSeconds:
      total - x.durationInSeconds - (x.offsetInSeconds || 0),
    timeToStart: convertSecondsToDuration(
      total - x.durationInSeconds - (x.offsetInSeconds || 0),
    ),
  });

export default setTimerStart;
