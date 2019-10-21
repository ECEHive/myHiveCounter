export const ACTION_INVENTORY_SETCOUNTINGTYPEENUM =
  'ACTION_INVENTORY_SETCOUNTINGTYPEENUM';
export const ACTION_INVENTORY_SETCHECKOUTMODEENUM =
  'ACTION_INVENTORY_SETCHECKOUTMODEENUM';

export function setInventoryCountingEnum(newEnum) {
  return {
    type: ACTION_INVENTORY_SETCOUNTINGTYPEENUM,
    payload: newEnum
  };
}

export function setInventoryCheckoutEnum(newEnum) {
  return {
    type: ACTION_INVENTORY_SETCHECKOUTMODEENUM,
    payload: newEnum
  };
}
