import Axios from 'axios';
import userAPI from './user';

let baseUrl;

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:9000';
    break;
  case 'production':
    baseUrl = 'https://my.ecehive.org';
    break;
  default:
    baseUrl = '';
    break;
}

console.log(`BASE URL = ${baseUrl}`);

export const sharedAxios = Axios.create({
  baseURL: baseUrl,
  timeout: 5000
});
sharedAxios.defaults.adapter = require('axios/lib/adapters/http');

export default {
  user: userAPI
};
