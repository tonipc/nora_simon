import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    trans(str) {
      return store.state.translations[str] || str;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
