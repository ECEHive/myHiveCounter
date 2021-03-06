import { sharedAxios } from './MyHiveAPI';
import type { ResponseObject } from './MyHiveAPI';

export type IHiveInventoryClass = {
  id: number,
  createdAt: number,
  updatedAt: number,
  ItemName: string,
  ItemLabel: string,
  ItemLabelID: string,
  ItemCountingType: number,
  ItemCount: number,
  ItemCountInStock: number,
  ItemDescription: string,
  ItemDatasheet: string,
  ItemCheckoutMode: number,
  ItemParameters: string,
  ItemLocation: string,
  ItemTags: IHiveInventoryItemClassTag[]
};

export type IHiveInventoryItemClassTag = {
  id: number,
  TagName: string
};

export default {
  async upsertInventoryClass(
    patch: IHiveInventoryClass
  ): Promise<ResponseObject<IHiveInventoryClass>> {
    const yeet = patch;
    if (!patch || !patch.ItemName) {
      throw new Error('null patch is not allowed');
    }
    if (!patch.ItemLabel) {
      yeet.ItemLabel = patch.ItemName.substring(0, 20);
    }
    const data = await sharedAxios.put('/inventory/class/upsert', yeet);
    return data.data;
  },
  async enumCountType(): Promise<ResponseObject<any>> {
    const data = await sharedAxios.get('/inventory/class/enum/count_types');
    return data.data;
  },
  async enumCheckoutModes(): Promise<ResponseObject<any>> {
    const data = await sharedAxios.get('/inventory/class/enum/checkout_modes');
    return data.data;
  },
  async listInventoryItemClass(
    page: number = 0,
    pageSize: number = 20
  ): Promise<ResponseObject<IHiveInventoryClass[]>> {
    const data = await sharedAxios.get('/inventory/class/list', {
      params: {
        page,
        page_size: pageSize
      }
    });
    return data.data;
  }
};
