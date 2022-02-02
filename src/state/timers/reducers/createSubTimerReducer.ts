import { v4 as uuid } from 'uuid';
import convertDurationToSeconds from '../../../lib/convertDurationToSeconds';
import { PayloadAction } from '@reduxjs/toolkit';
import { Duration } from '../../../components/TimeField/TimeField';

export const createSubTimerReducer = (
  state: any,
  {
    payload,
  }: PayloadAction<{
    duration: Duration;
    id: string;
    parentId: string;
    name: string;
    offset: Duration;
  }>,
) => {
  if (!state.timers.length || state.superTimer.active || !payload.name) {
    return state;
  }

  const subTimer = {
    ...payload,
    id: payload.id || uuid(),
    active: false,
    finished: false,
    durationInSeconds: convertDurationToSeconds(payload.duration),
    offsetInSeconds: convertDurationToSeconds(payload.offset),
    timeToStart: '00:00:00',
    timeToStartInSeconds: 0,
  };

  // Add new timers to list
  state.timers = [...state.timers, subTimer];
};
