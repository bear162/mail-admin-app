import api from '@/api/login';
import localhost from '../utils/locolhost';

export default {
  state: {
    user: null,
    loding: false,
    router: null,
  },
  mutations: {
    setloding(state, payload) {
      state.loding = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setout(state, payload) {
      state.user = payload;
    },
    addrouter(state, payload) {
      state.router = payload;
    },
  },
  getters: {
    status(state) {
      if (state.loding) {
        return 'laoding';
      } if (state.user !== null) {
        return 'login';
      }
      return 'loginout';
    },
  },
  actions: {
    addrouters(ctx, payload) {
      ctx.commit('addrouter', payload);
    },
    async login(ctx, payload) {
      ctx.commit('setloding', true);
      const resp = await api.login(payload).then((data) => data);
      localhost.setUser('user', resp.data.data);
      ctx.commit('setUser', resp.data.data);
      ctx.commit('setloding', false);
      return resp;
    },
    lodingout(ctx) {
      ctx.commit('setout', null);
      localhost.removeUser('user');
      console.log('退出');
      ctx.commit('setloding', false);
    },
    whoami(ctx) {
      ctx.commit('setloding', true);
      console.log('重新的登陆');
      const resp = localhost.getUser('user');
      ctx.commit('setUser', resp);
      ctx.commit('setloding', false);
      return resp;
    },
  },
};
