import { handleActions } from 'redux-actions';
import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  SEARCH_EMPTY_RESULTS
} from '../actions/types';

const defaultState = {
  results: [],
  query: null,

  // waiting states
  isSearching: false
};

const reducerMap = {
  [SEARCH_TOPICS_REQUESTED]: (state) => {
    return Object.assign({}, state, {
      isSearching: true
    });
  },
  [SEARCH_TOPICS_SUCCEEDED]: (state, action) => {
    const { results, query } = action.payload;
    return Object.assign({}, state, {
      results,
      query,
      isSearching: false
    });
  },
  [SEARCH_TOPICS_FAILED]: (state, action) => {
    return Object.assign({}, state, {
      isSearching: false,
      error: action.payload
    });
  },
  [SEARCH_EMPTY_RESULTS]: (state) => {
    return Object.assign({}, state, {
      results: [],
      query: null
    });
  }
};

export default handleActions(reducerMap, defaultState);
