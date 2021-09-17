<template>
  <div class="main-header">
        <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
          class="main-button"
        >
          <a-icon :type="$store.state.home.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <div class="crumbs">
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <ul class="user-info">
          <li v-if="status=='loginout'"><router-link to="login">登录</router-link></li>
          <li v-else>{{$store.state.loginuser.user.username}} <a-icon type="down" /></li>
          <li class="tc" @click="handuserout"><router-link to="login">退出</router-link></li>
        </ul>
      </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  computed: {
    status() {
      return this.$store.getters.status;
    },

  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('setcollapseds');
    },
    handuserout() {
      this.$store.dispatch('lodingout');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.main-header{
  border-bottom:1px solid #ccc;
}
.tc{
  position:absolute;
  width: 100px;
  z-index: 2;
}
</style>
