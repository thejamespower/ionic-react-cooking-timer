import convertSecondsToDuration from './convertSecondsToDuration';

const setTimerStart = total => x => ({
  ...x,
  timeToStartInSeconds: total - x.durationInSeconds - (x.offsetInSeconds || 0),
  timeToStart: convertSecondsToDuration(
    total - x.durationInSeconds - (x.offsetInSeconds || 0),
  ),
});

export default setTimerStart;
