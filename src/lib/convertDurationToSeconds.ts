import { Duration } from '../components/TimeField/TimeField';

const convertDurationToSeconds = (duration: Duration) => {
  const parts = duration.split(':');
  return (
    parseInt(String(+parts[0] * 3600), 10) +
    parseInt(String(+parts[1] * 60), 10) +
    parseInt(parts[2], 10)
  );
};

export default convertDurationToSeconds;
