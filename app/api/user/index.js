import { sharedAxios } from '../MyHiveAPI';

export default {
  async findUserByUniqueIdentifier(uniqueIdentifier: string) {
    console.log(sharedAxios.defaults.baseUrl);
    const result = await sharedAxios.post('/user/find', {
      uniqueIdentifier
    });
    console.log(result);
  }
};
