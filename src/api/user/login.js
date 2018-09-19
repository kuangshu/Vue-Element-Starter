import fetch from '@/api/fetch';

// 登录
export const login = entity =>
  fetch({
    method: 'post',
    data: {
      ...entity,
    },
    withCredentials: true,
  });
// 登出
export const logout = () =>
  fetch({
    method: 'post',
    data: {},
  });
// 修改密码
export const changePwd = entity =>
  fetch({
    method: 'post',
    data: entity,
  });
