import { login, logout, changePwd } from '@/api/user/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { SET_TOKEN, UPDATE_USERINFO } from './mutation-types';
import route from './route';

const state = {
  token: getToken(),
  name: '',
  id: '',
  createDate: '',
  loginState: 0,
  trueName: '',
};

const getters = {
  token: state => state.token,
  userInfo: ({ token, ...other }) => other,
  adminId: state => state.id,
};

const actions = {
  // 登录
  Login({ commit, dispatch }, entity) {
    return login(entity).then(response => {
      const {
        token,
        userInfo: { menus, ...others },
      } = response.data;
      setToken(token);
      commit(SET_TOKEN, token);
      commit(UPDATE_USERINFO, others);
      dispatch('initRoute', menus).then(() => {
        resolve();
      });
    });
  },

  // 登出
  LogOut({ commit, state }) {
    return logout(state.token).then(() => {
      commit(SET_TOKEN, '');
      removeToken();
      resolve();
    });
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit(SET_TOKEN, '');
      removeToken();
      resolve();
    });
  },

  // 修改密码
  updatePassword({ state }, { oldPwd, newPwd }) {
    return changePwd({
      id: state.id,
      oldPwd,
      newPwd,
    });
  },
};

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [UPDATE_USERINFO](state, userInfo) {
    state = Object.assign(state, {
      ...userInfo,
      loginState: 1,
    });
  },
};

export default {
  modules: {
    route,
  },
  state,
  getters,
  actions,
  mutations,
};
