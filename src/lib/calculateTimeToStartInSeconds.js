const calculateTimeToStartInSeconds = (
  totalTime,
  durationInSeconds,
  elapsedTime,
  offset,
) => Math.max(0, totalTime - durationInSeconds - elapsedTime - offset);

export default calculateTimeToStartInSeconds;
