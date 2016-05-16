import { createAction } from 'redux-actions';
import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  SEARCH_EMPTY_RESULTS,
} from './types';

export const searchTopics = createAction(SEARCH_TOPICS_REQUESTED, query => query);
export const searchTopicsSucceeded = createAction(SEARCH_TOPICS_SUCCEEDED, results => results);
export const searchTopicsFailed = createAction(SEARCH_TOPICS_FAILED, error => error);

export const emptyResults = createAction(SEARCH_EMPTY_RESULTS);
