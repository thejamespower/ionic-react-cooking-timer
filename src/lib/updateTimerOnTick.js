import convertSecondsToDuration from './convertSecondsToDuration';
import calculateTimeToStartInSeconds from './calculateTimeToStartInSeconds';

const updateTimerOnTick = (elapsedTime, totalTime) => (x) => {
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
