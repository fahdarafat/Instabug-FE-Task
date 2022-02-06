import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    chartData: [],
  },
  getters: {},
  mutations: {
    SET_CHARTDATA(state, data) {
      state.chartData = data;
    },
  },
  actions: {
    chartDataRequest({ commit }) {
      axios.get('https://fe-task.getsandbox.com/performance').then((res) => {
        commit('SET_CHARTDATA', res.data);
      });
    },
  },
});

export default store;
