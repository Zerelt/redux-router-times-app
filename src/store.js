import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import allReducers from './reducers/index';

const logger = createLogger();
export const store = createStore(
  allReducers,
  applyMiddleware(logger,ReduxThunk)
);
