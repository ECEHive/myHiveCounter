import { Action } from 'redux';
import {
  ACTION_INVENTORY_SETCHECKOUTMODEENUM,
  ACTION_INVENTORY_SETCOUNTINGTYPEENUM
} from '../actions/inventory';

export type HiveInventoryStore = {
  countTypeEnum: Map,
  checkoutModeEnum: Map
};

const defaultValue: HiveInventoryStore = {
  countTypeEnum: {},
  checkoutModeEnum: {}
};

export default function inventory(
  state: HiveInventoryStore = defaultValue,
  action: Action
) {
  switch (action.type) {
    case ACTION_INVENTORY_SETCOUNTINGTYPEENUM:
      return {
        ...state,
        countTypeEnum: action.payload
      };
    case ACTION_INVENTORY_SETCHECKOUTMODEENUM:
      return {
        ...state,
        checkoutModeEnum: action.payload
      };
    default:
      return state;
  }
}
