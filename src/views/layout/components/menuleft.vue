<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1]
          ? $router.currentRoute.matched[1].name
          : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.home.collapsed"
    >
      <template v-for="route in $store.state.loginuser.router">
        <a-sub-menu v-if="!route.meta.show" :key="route.name">
          <span slot="title"
            ><a-icon :type="route.meta.icon" /><span>{{
              route.meta.title
            }}</span></span
          >
          <template v-for="cild in route.children" >
            <a-menu-item v-if="!cild.meta.show" :key="cild.name">
              <router-link :to="{ name: cild.name }">
                {{ cild.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$router.currentRoute.matched, 'asdkfljaksdjafn');
  },
};
</script>

<style>
</style>
