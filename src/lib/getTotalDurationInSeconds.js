const getTotalDurationInSeconds = timers =>
  timers.length ? Math.max(...timers.map(x => x.durationInSeconds)) : 0;

export default getTotalDurationInSeconds;
