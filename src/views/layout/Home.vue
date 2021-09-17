<template>
  <div class="home">
    <menuleft/>
    <div :class="{ 'main-app': true, 'menu-unfold':$store.state.home.collapsed }">
      <headers/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuleft from './components/menuleft.vue';
import headers from './components/header.vue';

export default {
  components: {
    menuleft,
    headers,
  },

};
</script>
<style lang="less">
@import url(~@/assets/css/home.less);
</style>
