import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { getToken } from '@/utils/auth'; // 验权

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start(); // 进度条Progress
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.getters.isRouteDone) {
        next(); //
      } else {
        // if(store.getters.userInfo.loginState)
        store
          .dispatch('GenerateRoutes')
          .then(() => {
            router.addRoutes(store.getters.addRouters.slice()); // 动态添加可访问路由表
            next({ ...to, replace: true });
          })
          .catch((err) => {
            console.log('验证失败,请重新登录')
            console.log(err)
            store.dispatch('FedLogOut').then(() => {
              // Message.error('验证失败,请重新登录');
              next({ path: '/login' });
            });
          });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // next('/login');
      next();
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
