import convertSecondsToDuration from './convertSecondsToDuration';
import calculateTimeToStartInSeconds from './calculateTimeToStartInSeconds';
import { SubTimer, Timer } from '../state/timers/timersSlice';

const updateTimerOnTick =
  (elapsedTime: number, totalTime: number) =>
  // @TODO: Fix conditional type
  (x: (Timer & { offsetInSeconds?: number }) | SubTimer) => {
    const timeToStartInSeconds = calculateTimeToStartInSeconds(
      totalTime,
      x.durationInSeconds,
      elapsedTime,
      x.offsetInSeconds || 0,
    );
    return {
      ...x,
      timeToStartInSeconds,
      timeToStart: convertSecondsToDuration(timeToStartInSeconds),
      active: timeToStartInSeconds === 0,
    };
  };

export default updateTimerOnTick;
