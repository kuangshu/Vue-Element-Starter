import { Message, MessageBox } from 'element-ui';
import store from '../store';

export const validateCode = res => {
  const { code } = res;
  switch (code) {
    case '0':
      return res;
    case '-2':
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
      return Promise.reject(res);
    default:
      return Promise.reject(res);
  }
};

export const errorHandle = error => {
  console.log('err' + error); // for debug
  store.dispatch('fetchDone');
  if (error.message && /timeout/.test(error.message)) {
    Message({
      message: '请求超时！',
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject({ error, msg: '请求超时！' });
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  });
  return Promise.reject(error);
};
