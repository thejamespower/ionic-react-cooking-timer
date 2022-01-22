import { createAction } from 'redux-actions';

import {
  TIMER_CREATED,
  SUB_TIMER_CREATED,
  SUPER_TIMER_STARTED,
  TIMER_DELETED,
  SUPER_TIMER_TICKED,
  TIMER_COMPLETED,
  SUPER_TIMER_COMPLETED,
  END_TIME_SET,
} from './action-types';

const createTimer = payload => createAction(TIMER_CREATED)(payload);
const createSubTimer = payload => createAction(SUB_TIMER_CREATED)(payload);
const deleteTimer = payload => createAction(TIMER_DELETED)(payload);
const completeTimer = payload => createAction(TIMER_COMPLETED)(payload);
const startSuperTimer = payload => createAction(SUPER_TIMER_STARTED)(payload);
const tickSuperTimer = payload => createAction(SUPER_TIMER_TICKED)(payload);
const completeSuperTimer = payload =>
  createAction(SUPER_TIMER_COMPLETED)(payload);
const setEndTime = payload => createAction(END_TIME_SET)(payload);

export {
  createTimer,
  createSubTimer,
  deleteTimer,
  completeTimer,
  startSuperTimer,
  tickSuperTimer,
  completeSuperTimer,
  setEndTime,
};
