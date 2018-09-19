import Cookies from 'js-cookie';
import { TOGGLE_SIDEBAR } from './mutation-types';

const state = () => ({
  opened: !+Cookies.get('sidebarStatus'),
});

const getters = {
  sidebar: state => state,
};

const actions = {
  ToggleSideBar: ({ commit }) => {
    commit(TOGGLE_SIDEBAR);
  },
};

const mutations = {
  [TOGGLE_SIDEBAR]: state => {
    if (state.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
    state.opened = !state.opened;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
