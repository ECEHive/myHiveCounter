// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import user from './user';
import inventory from './inventory';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    user,
    counter,
    inventory
  });
}
