import { handleActions } from 'redux-actions';
import {
  APP_READY
} from '../actions/types';

const defaultState = {
  isReady: false
};

const reducerMap = {
  [APP_READY]: (state) => {
    return Object.assign({}, state, {
      isReady: true
    });
  }
};

export default handleActions(reducerMap, defaultState);
