import { HiveUserEntity } from '../api/user';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(newUser: HiveUserEntity) {
  return {
    type: SET_CURRENT_USER,
    payload: newUser
  };
}
