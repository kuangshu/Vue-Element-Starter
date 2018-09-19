import CONSTANTS from '@/config/index';
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { errorHandle } from './validate';
import md5 from 'blueimp-md5';

const createBaseFetch = config => {
  const service = axios.create({
    timeout: 10000,
    ...config,
  });
  let logout = false;
  // request拦截器
  service.interceptors.request.use(
    conf => {
      store.dispatch('fetchStart');
      conf.headers = {
        ...conf.headers,
        reqSource: 'pc',
        token: store.getters.token ? store.getters.token : '',
      };
      return conf;
    },
    error => {
      // Do something with request error
      console.log(error); // for debug
      Promise.reject(error);
    }
  );

  // respone拦截器
  service.interceptors.response.use(response => {
    const res = response.data;
    /**
     * code为非 1000 是抛错
     */
    setTimeout(() => {
      store.dispatch('fetchDone');
    }, 500);
    if (res.code !== 1000) {
      if (
        response.headers &&
        /application\/octet-stream/.test(response.headers['content-type'])
      ) {
        return response;
      }
      Message({
        message: res.msg || '网络错误！',
        type: 'error',
        duration: 5 * 1000,
      });

      // -2:其他客户端登录了;Token 过期了;
      if (res.code === -2) {
        if (logout) return;
        logout = true;
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
          })
          .catch(err => {
            console.log(err);
            logout = false;
          });
      }

      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  }, errorHandle);

  return service;
};

export default createBaseFetch;
