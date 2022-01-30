const calculateTimeToStartInSeconds = (
  totalTime: number,
  durationInSeconds: number,
  elapsedTime: number,
  offset: number,
) => Math.max(0, totalTime - durationInSeconds - elapsedTime - offset);

export default calculateTimeToStartInSeconds;
