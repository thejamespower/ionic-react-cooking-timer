import { v4 as uuid } from 'uuid';
import convertDurationToSeconds from '../../../lib/convertDurationToSeconds';

export const createSubTimerReducer = (state, { payload }) => {
  if (!state.timers.length || state.superTimer.active || !payload.name) {
    return state;
  }

  const subTimer = {
    ...payload,
    id: payload.id || uuid(),
    active: false,
    complete: false,
    durationInSeconds: convertDurationToSeconds(payload.duration),
    offsetInSeconds: convertDurationToSeconds(payload.offset),
    timeToStart: '00:00:00',
    timeToStartInSeconds: 0,
  };

  // Add new timers to list
  state.timers = [...state.timers, subTimer];
};
