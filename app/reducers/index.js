// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import user from './user';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    user,
    counter
  });
}
