import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../containers/layout/Layout.vue';
import Login from '@/containers/login/index';
import errorPage404 from '@/containers/errorPage/404';
import errorPage401 from '@/containers/errorPage/401';

const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: errorPage404, hidden: true },
  { path: '/401', component: errorPage401, hidden: true },
  {
    path: '',
    component: Layout,
    name: 'home',
    redirect: 'home',
    meta: { title: '首页', icon: 'example' },
    children: [
      {
        path: 'home',
        name: 'from',
        component: _import('home/index'),
        meta: { title: '首页' },
      },
    ],
  },
];

export const asyncRouterMap = [
  {
    component: Layout,
    meta: { icon: 'example' },
  },
  { path: '*', redirect: '/404', hidden: true },
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
