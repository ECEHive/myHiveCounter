import Axios from 'axios';
import userAPI from './user';
import inventory from './inventory';

let baseUrl;

switch (process.env.NODE_ENV) {
  case 'development':
    if (process.env.API_URL) baseUrl = process.env.API_URL;
    else baseUrl = 'http://localhost:9000';
    break;
  case 'production':
    baseUrl = 'https://my.ecehive.org';
    break;
  default:
    baseUrl = '';
    break;
}
console.log(`API BASE URL = ${baseUrl}`);

export type ResponseObject<DataType> = {
  code: string,
  data: DataType,
  pagination?: PaginationResponse,
  time: number
};

export type PaginationResponse = {
  currentPage: number,
  pageSize: number,
  totalItems: number,
  totalPages: number
};

export const sharedAxios = Axios.create({
  baseURL: baseUrl,
  timeout: 5000
});
sharedAxios.interceptors.response.use(
  suc => suc,
  err =>
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject(
      new Error(
        `Error with code ${err.response.status}, LogID: ${
          err.response.headers['spec-log-id']
        }`
      )
    )
);
sharedAxios.defaults.adapter = require('axios/lib/adapters/http');

export default {
  user: userAPI,
  inventory
};
