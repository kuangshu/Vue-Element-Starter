import Vue from 'vue';

import 'normalize.css/normalize.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';
import store from './store';

import '@/assets/styles/index.scss'; // global css
import '@/assets/icons'; // icon
import '@/permission' // 用户登录认证
// import './mock' // mockjs
import extendCom from '@/utils/extends';

Vue.use(ElementUI);
extendCom(Vue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
