export default {
  state: {
    collapsed: false,
  },
  mutations: {
    setcollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    setcollapseds({ commit }) {
      commit('setcollapsed');
    },
  },
};
