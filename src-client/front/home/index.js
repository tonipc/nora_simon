import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    trans(str) {
      return store.state.translations[str] || str;
    }
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#norainventory-app");
