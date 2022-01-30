const convertSecondsToDuration = (durationInSeconds: number) =>
  new Date(durationInSeconds * 1000).toISOString().substr(11, 8);

export default convertSecondsToDuration;
