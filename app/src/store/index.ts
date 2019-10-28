import Vue from 'vue';
import Vuex from 'vuex';
import { FilterStore } from '@/store/modules/filters/index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    FilterStore,
  },
});
