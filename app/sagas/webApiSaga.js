import { call } from 'redux-saga/effects';
import webApi from '../libs/webApi';

export default function*(method, params) {
  const response = yield call(webApi[method], params);

  // throw in presence of error
  if (!response) {
    throw { status: 500, message: 'No response received.' };
  } else if (response.status >= 400) {
    throw { status: response.status, message: response.data.message };
  }

  return response.data;
}
