import { combineReducers } from 'redux';
import user from './user';
import search from './search';
import topic from './topic';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  search,
  topic,
  routing: routerReducer
});

export default rootReducer;
