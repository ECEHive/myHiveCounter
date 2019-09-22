import type { Action } from './types';
import { SET_CURRENT_USER } from '../actions/user';
import type { HiveUserEntity } from '../api/user';

class UserState {
  currentUser: HiveUserEntity = null;
}

export default function user(
  state: UserState = new UserState(),
  action: Action
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
