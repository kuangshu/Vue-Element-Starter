<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="topTitle">
      <div class="com-logo">
        <img src="../../assets/images/logo.png" alt="logo">
      </div>
      <h1 class="com-title">管理系统</h1>
      <UserBox></UserBox>
    </div>
    <div>

    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'src/assets/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1280px;
  .topTitle {
    display: flex;
    align-items: center;
    height: 70px;
    background-color: #182b3e;
  }
  .com-logo {
    width: 138px;
    height: 44px;
    margin-left: 42px;
  }
  .com-title {
    flex: 1;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    border-left: 1px solid #fff;
    margin-left: 67px;
    text-indent: 20px;
  }
}
</style>

<script>
import {
  Navbar,
  Sidebar,
  AppMain,
  TagsView,
  UserBox,
} from '@/containers/layout/components';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    UserBox,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
};
</script>
