import { asyncRouterMap, constantRouterMap } from '@/router/index';
import { INIT_ROUTERS, SET_ROUTERS, ROUTERS_DONE } from './mutation-types';
import cloneDeep from 'lodash/cloneDeep';

let initRouter = cloneDeep(constantRouterMap);
const filterAsyncRouter = () => {};

const state = {
  isRouteDone: false, // 是否生成了动态路由
  routers: initRouter,
  addRouters: [],
};

const getters = {
  isRouteDone: state => state.isRouteDone,
  permission_routers: state => state.routers,
  addRouters: state => state.addRouters,
};

const actions = {
  initRoute({ commit }, menus) {
    return new Promise(resolve => {
      let authList = [];
      menus.map(item => {
        const mainMenu = {
          ...asyncRouterMap[0],
        };
        if (mainMenu) {
          const { children, ...routeMenu } = mainMenu;
          let subMenuList = [];
          if (item.children && item.children.length) {
            item.children.map(subItem => {
              const subMenu = asyncRouterMap.find(
                menu => menu.id === subItem.id
              );
              if (subMenu) {
                subMenuList.push({
                  ...subMenu,
                  path: subItem.menuLink,
                  name: subItem.id,
                  meta: {
                    ...subMenu.meta,
                    title: subItem.menuName,
                    buts: { ...subItem.buts },
                  },
                });
              }
            });
          }
          authList.push({
            ...routeMenu,
            path: '/' + item.menuLink,
            name: item.menuName,
            meta: { ...routeMenu.meta, title: item.menuName },
            children: subMenuList,
          });
        }
      });
      console.log(authList);
      authList.push(asyncRouterMap[asyncRouterMap.length - 1]); // 添加404页面
      commit(SET_ROUTERS, authList);
      resolve();
    });
  },
  GenerateRoutes({ commit, rootGetters, dispatch }, data) {
    return new Promise((resolve, reject) => {
      if (rootGetters.userInfo.loginState) {
        commit(ROUTERS_DONE);
        resolve();
      } else {
        dispatch('Login')
          .then(() => {
            commit(ROUTERS_DONE);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  },
};

const mutations = {
  [SET_ROUTERS](state, routers) {
    state.addRouters = routers.slice();
    state.routers = initRouter.concat(routers);
  },
  [ROUTERS_DONE](state) {
    state.isRouteDone = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
