import { Action } from 'redux';

export type HiveInventoryStore = {};

const defaultValue: HiveInventoryStore = {};

export default function inventory(
  state: HiveInventoryStore = defaultValue,
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}
