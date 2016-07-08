import { createAction } from 'redux-actions';
import {
  TOPIC_CREATE_REQUESTED,
  TOPIC_CREATE_SUCCEEDED,
  TOPIC_CREATE_FAILED,
  TOPIC_FETCH_REQUESTED,
  TOPIC_FETCH_SUCCEEDED,
  TOPIC_FETCH_FAILED,
  TOPIC_DO_CHECKIN_REQUESTED,
  TOPIC_DO_CHECKIN_SUCCEEDED,
  TOPIC_DO_CHECKIN_FAILED,
  TOPIC_UNDO_CHECKIN_REQUESTED,
  TOPIC_UNDO_CHECKIN_SUCCEEDED,
  TOPIC_UNDO_CHECKIN_FAILED,
} from './types';

export const create = createAction(TOPIC_CREATE_REQUESTED, tag => tag);
export const createSucceeded = createAction(TOPIC_CREATE_SUCCEEDED, topic => topic);
export const createFailed = createAction(TOPIC_CREATE_FAILED, error => error);

export const fetch = createAction(TOPIC_FETCH_REQUESTED, tag => tag);
export const fetchSucceeded = createAction(TOPIC_FETCH_SUCCEEDED, topic => topic);
export const fetchFailed = createAction(TOPIC_FETCH_FAILED, error => error);

export const doCheckin = createAction(TOPIC_DO_CHECKIN_REQUESTED, tag => tag);
export const doCheckinSucceeded = createAction(TOPIC_DO_CHECKIN_SUCCEEDED, checkins => checkins);
export const doCheckinFailed = createAction(TOPIC_DO_CHECKIN_FAILED, error => error);

export const undoCheckin = createAction(TOPIC_UNDO_CHECKIN_REQUESTED, tag => tag);
export const undoCheckinSucceeded = createAction(
  TOPIC_UNDO_CHECKIN_SUCCEEDED,
  checkins => checkins
);
export const undoCheckinFailed = createAction(TOPIC_UNDO_CHECKIN_FAILED, error => error);
