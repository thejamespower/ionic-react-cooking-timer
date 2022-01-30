import { v4 as uuid } from 'uuid';
import convertDurationToSeconds from '../../../lib/convertDurationToSeconds';
import getTotalDurationInSeconds from '../../../lib/getTotalDurationInSeconds';
import convertSecondsToDuration from '../../../lib/convertSecondsToDuration';
import setTimerStart from '../../../lib/setTimerStart';
import { Duration } from '../../../components/TimeField/TimeField';
import { PayloadAction } from '@reduxjs/toolkit';

const calculateStartTime = (endTime: Duration, durationInSeconds: number) => {
  return convertSecondsToDuration(
    convertDurationToSeconds(endTime) - durationInSeconds,
  );
};
export const createTimerReducer = (
  state: any,
  {
    payload,
  }: PayloadAction<{
    duration: Duration;
    id: string;
    name: string;
  }>,
) => {
  if (
    payload.duration === '00:00:00' ||
    state.superTimer.active ||
    !payload.name
  ) {
    return state;
  }

  const timer = {
    ...payload,
    id: payload.id || uuid(),
    durationInSeconds: convertDurationToSeconds(payload.duration),
    active: false,
    finished: false,
  };

  // Add new timers to list
  const newTimers = [...state.timers, timer];

  const totalDurationInSeconds = getTotalDurationInSeconds(newTimers);

  // Calculate new timer start time
  const newTimerWithStartTime = {
    ...timer,
    timeToStartInSeconds:
      totalDurationInSeconds - convertDurationToSeconds(payload.duration),
    timeToStart: convertSecondsToDuration(
      totalDurationInSeconds - convertDurationToSeconds(payload.duration),
    ),
  };

  const oldTimers = state.timers;

  // Calculate old timers new start times
  const oldTimersWithNewStartTimes = oldTimers.map(
    setTimerStart(totalDurationInSeconds),
  );

  const newTimersWithStartTimes = [
    ...oldTimersWithNewStartTimes,
    newTimerWithStartTime,
  ];

  const startTime = state.superTimer.endTime
    ? calculateStartTime(state.superTimer.endTime, totalDurationInSeconds)
    : state.superTimer.startTime;

  state.timers = newTimersWithStartTimes;
  state.superTimer.currentCount = totalDurationInSeconds;
  state.superTimer.duration = convertSecondsToDuration(totalDurationInSeconds);
  state.superTimer.durationInSeconds = totalDurationInSeconds;
  state.superTimer.startTime = startTime;
};
