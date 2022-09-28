import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const store = new Vuex.Store({
  state: {
    graphedEmployees: [],
  },
  mutations: {
    graphEmployee(state, employee) {
      if(!state.graphedEmployees.find(e => e.id === employee.id)){
        state.graphedEmployees.push(employee);
      }
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount('#app');
