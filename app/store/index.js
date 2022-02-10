import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    chartData: [],
    dateRange: [],
  },
  getters: {
    dateRange: state => {
      return state.dateRange;
    },
  },
  mutations: {
    SET_CHARTDATA(state, value) {
      state.chartData = value;
    },
    SET_DATERANGE(state, value) {
      state.dateRange = value;
    },
  },
  actions: {
    chartDataRequest({ commit, state }) {
      if (state.chartData.length === 0) { //  Fetch data only once.
        axios.get('https://fe-task.getsandbox.com/performance').then((res) => {
          commit('SET_CHARTDATA', res.data);
        });
      }
    },
    dateRangeSelected({ commit }, value) {
      commit('SET_DATERANGE', value);
    },
  },
});

export default store;
