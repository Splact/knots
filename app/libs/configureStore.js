import config from '../constants/config';
import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localforage';
import debounce from 'redux-storage-decorator-debounce';
import createSagaMiddleware from 'redux-saga';
import startSagas from '../sagas/start';
import searchSagas from '../sagas/search';
import topicSagas from '../sagas/topic';
import userSagas from '../sagas/user';
import rootReducer from '../reducers/root';
import { persistActionTypes } from '../actions/types';

// Setup sagas
const sagaMiddleware = createSagaMiddleware(...startSagas, ...userSagas, ...searchSagas, ...topicSagas);

// Setup storage engine and middleware
const engine = createEngine(config.localforage.key, config.localforage);
const debouncedEngine = debounce(engine, 1500);
// ISSUE: redux-storage doesn't intercept actions fired by redux-saga
const storageMiddleware = storage.createMiddleware(debouncedEngine, [], persistActionTypes);
const load = storage.createLoader(debouncedEngine);

// Wrap rootReducer to let operate on storage
const persistReducer = storage.reducer(rootReducer);

export default function configureStore(initialState) {
  const store = createStore(
    persistReducer,
    initialState,
    compose(
      applyMiddleware(
        storageMiddleware,
        sagaMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  // Load from storage
  load(store).catch(() => console.log('Failed to load previous state from storage'));

  return store;
}
