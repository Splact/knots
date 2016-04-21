import { combineReducers } from 'redux';
import user from './user';
import search from './search';
import topic from './topic';
import app from './app';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  search,
  topic,
  app,
  routing: routerReducer
});

export default rootReducer;
