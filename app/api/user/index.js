import { sharedAxios } from '../MyHiveAPI';
import type { ResponseObject } from '../MyHiveAPI';

export class HiveUserEntity {
  id: number;
  createdAt: number;
  updatedAt: number;
  UniqueIdentifier: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Alias: string | null;
  GTEmail: string;
  PersonalEmail: string;
  Phone: string;
  GTUsername: string;
  HiveUserType: number;
}

export type FindUserResponse = ResponseObject<HiveUserEntity>;

export default {
  async findUserByUniqueIdentifier(uniqueIdentifier: string): FindUserResponse {
    try {
      const result = await sharedAxios.post('/user/find', {
        uniqueIdentifier
      });
      return result.data;
    } catch (e) {
      throw e;
    }
  },

  // Upsert: Update + Insert
  async upsertUserWithUniqueIdentifier(
    uniqueIdentifier: string,
    user: HiveUserEntity
  ): ResponseObject<HiveUserEntity> {
    try {
      const result = await sharedAxios.put('/user/upsert', {
        UniqueIdentifier: uniqueIdentifier,
        patch: user
      });
      return result.data;
    } catch (e) {
      throw e;
    }
  }
};
