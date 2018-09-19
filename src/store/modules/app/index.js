import tagsView from './tagsView';
import sidebar from './sidebar';
import { FETCH_START, FETCH_DONE } from './mutation-types';

const state = () => ({
  loading: true,
});

const getters = {
  loading: state => state.loading,
};

const actions = {
  fetchStart({ commit }) {
    commit(FETCH_START);
  },
  fetchDone({ commit }) {
    commit(FETCH_DONE);
  },
};
const mutations = {
  [FETCH_START](state) {
    state.loading = true;
  },
  [FETCH_DONE](state) {
    state.loading = false;
  },
};
export default {
  modules: {
    tagsView,
    sidebar,
  },
  state,
  getters,
  actions,
  mutations,
};
