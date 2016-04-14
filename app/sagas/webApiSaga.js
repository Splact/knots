import { call } from 'redux-saga/effects';
import webApi from '../libs/webApi';

export default function*(method, params) {
  return yield call(webApi[method], params);
}
