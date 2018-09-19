import createFetch from '../baseFetch';
import CONSTANTS from '@/config/index';

const path = CONSTANTS.BASE_SERVER_URL + '/dcxy/api';

const service = createFetch({
  baseURL: path,
});

export default service;
