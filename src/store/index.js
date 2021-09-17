import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import loginuser from './loginuser';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    home,
    loginuser,
  },
});
