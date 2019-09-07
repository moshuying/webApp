import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

import Vuejsonp from "vue-jsonp";
Vue.use(Vuejsonp);

import config from "./config/config";
Vue.use(config);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
