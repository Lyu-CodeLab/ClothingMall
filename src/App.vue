<template>
  <div id="app">
 <keep-alive exclude="Detail"> <router-view></router-view></keep-alive>
    <MainTabbar></MainTabbar>
    <svg-icon></svg-icon>
  </div>

</template>

<script>

import MainTabbar from "components/content/main-tabbar/MainTabbar";
import SvgIcon from 'components/content/Icon/svg.vue'
export default {
  name: 'App',
  components: {
    MainTabbar,
    SvgIcon
  }

}
</script>

<style>
@import "assets/css/base.css";
</style>
