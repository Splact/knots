import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SEARCH_TOPICS_REQUESTED } from '../actions/types';
import {
  searchTopicsSucceeded,
  searchTopicsFailed,
} from '../actions/search';
import webApi from '../libs/webApi';

// Worker Saga : will be fired on SEARCH_TOPICS_REQUESTED actions
const searchTopics = function* searchTopics(action) {
  try {
    // Do search
    const searchTopicsParams = { q: action.payload };
    const { results } = yield call(webApi.searchTopics, searchTopicsParams);

    // Update store search results
    yield put(searchTopicsSucceeded({ results, query: action.payload }));
  } catch (error) {
    yield put(searchTopicsFailed(error));
  }
};

// Watchers Sagas
export const searchTopicsSaga = function* searchTopicsSaga() {
  yield* takeLatest(SEARCH_TOPICS_REQUESTED, searchTopics);
};

export default [
  searchTopicsSaga,
];
