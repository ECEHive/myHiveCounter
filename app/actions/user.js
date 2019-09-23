import { HiveUserEntity } from '../api/user';
import MyHiveAPI from '../api/MyHiveAPI';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REFRESH_CURRENT_USER = 'REFRESH_CURRENT_USER';

export function setCurrentUser(newUser: HiveUserEntity) {
  return {
    type: SET_CURRENT_USER,
    payload: newUser
  };
}

export function refreshCurrentUser() {
  return async (dispatch, getState) => {
    const { user: userState } = getState();
    const result = await MyHiveAPI.user.findUserByUniqueIdentifier(
      userState.currentUser.UniqueIdentifier
    );
    dispatch(setCurrentUser(result.data[0]));
  };
}
