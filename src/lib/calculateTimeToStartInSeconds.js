const calculateTimeToStartInSeconds = (
  totalTime,
  durationInSeconds,
  elapsedTime,
) => Math.max(0, totalTime - durationInSeconds - elapsedTime);

export default calculateTimeToStartInSeconds;
