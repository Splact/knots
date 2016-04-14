import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  SEARCH_TOPICS_REQUESTED
} from '../actions/types';
import {
  searchTopicsSucceeded,
  searchTopicsFailed
} from '../actions/search';
import webApiSaga from './webApiSaga';

// Worker Saga : will be fired on SEARCH_TOPICS_REQUESTED actions
const searchTopics = function*(action) {
  // Do search
  const searchTopicsParams = { q: action.payload };
  const { error, results } = yield call(webApiSaga, 'searchTopics', searchTopicsParams);

  if (!error) {
    // Update store search results
    yield put(searchTopicsSucceeded({ results, query: action.payload }));
  } else {
    yield put(searchTopicsFailed(error));
  }
};

// Watchers Sagas
export const searchTopicsSaga = function*() {
  yield* takeLatest(SEARCH_TOPICS_REQUESTED, searchTopics);
};

export default [
  searchTopicsSaga
];
