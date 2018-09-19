import { UPDATE_PAGINATION } from '../mutation-types';

const state = () => ({
  pageNum: 1, // 当前分页
  pageSize: 10, // 分页大小
  startRow: 0,
  endRow: 0,
  total: 0,
  pages: 0,
});

const getters = {
  pagination: state => state,
};

const actions = {
  updatePagination({ commit }, pagination) {
    commit(UPDATE_PAGINATION, pagination);
  },
};

const mutations = {
  [UPDATE_PAGINATION](state, pagination) {
    state = Object.assign(state, {
      ...pagination,
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
