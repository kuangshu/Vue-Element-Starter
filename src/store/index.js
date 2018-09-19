import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import app from './modules/app/index';
import user from './modules/user/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
export default store;
