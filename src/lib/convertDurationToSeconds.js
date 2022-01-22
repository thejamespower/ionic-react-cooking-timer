const convertDurationToSeconds = duration => {
  const parts = duration.split(':');
  return (
    parseInt(parts[0] * 3600, 10) +
    parseInt(parts[1] * 60, 10) +
    parseInt(parts[2], 10)
  );
};

export default convertDurationToSeconds;
