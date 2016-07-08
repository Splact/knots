import { handleActions } from 'redux-actions';
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
} from '../actions/types';

const defaultState = {
  tag: null,
  checkins: [],

  // waiting states
  isChangingCheckin: false,
  isCreating: false,
  isFetching: false,
};

const reducerMap = {
  [TOPIC_CREATE_REQUESTED]: (state) => Object.assign({}, state, { isCreating: true }),
  [TOPIC_CREATE_SUCCEEDED]: (state, action) => {
    const { tag, checkins } = action.payload;
    return Object.assign({}, state, {
      tag,
      checkins,
      isCreating: false,
    });
  },
  [TOPIC_CREATE_FAILED]: (state, action) => Object.assign({}, state, {
    isCreating: false,
    error: action.payload,
  }),
  [TOPIC_FETCH_REQUESTED]: (state) => Object.assign({}, state, { isFetching: true }),
  [TOPIC_FETCH_SUCCEEDED]: (state, action) => {
    const { tag, checkins } = action.payload;
    return Object.assign({}, state, {
      tag,
      checkins,
      isFetching: false,
    });
  },
  [TOPIC_FETCH_FAILED]: (state, action) => Object.assign({}, state, {
    isFetching: false,
    error: action.payload,
  }),
  [TOPIC_DO_CHECKIN_REQUESTED]: (state) => Object.assign({}, state, { isChangingCheckin: true }),
  [TOPIC_DO_CHECKIN_SUCCEEDED]: (state, action) => Object.assign({}, state, {
    checkins: action.payload,
    isChangingCheckin: false,
  }),
  [TOPIC_DO_CHECKIN_FAILED]: (state, action) => Object.assign({}, state, {
    isChangingCheckin: false,
    error: action.payload,
  }),
  [TOPIC_UNDO_CHECKIN_REQUESTED]: (state) => Object.assign({}, state, { isChangingCheckin: true }),
  [TOPIC_UNDO_CHECKIN_SUCCEEDED]: (state, action) => Object.assign({}, state, {
    checkins: action.payload,
    isChangingCheckin: false,
  }),
  [TOPIC_UNDO_CHECKIN_FAILED]: (state, action) => Object.assign({}, state, {
    isChangingCheckin: false,
    error: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
