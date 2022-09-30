import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueApexCharts);

Vue.component('ApexChart', VueApexCharts);


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
    degraphEmployee(state, id){
      state.graphedEmployees = state.graphedEmployees.filter(e => e.id !== id);
    }
  },
});

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount('#app');
