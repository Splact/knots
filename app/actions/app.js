import { createAction } from 'redux-actions';
import {
  APP_READY
} from './types';

export const appReady = createAction(APP_READY);
