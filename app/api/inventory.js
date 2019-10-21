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
