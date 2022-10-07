import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AsyncComputed from 'vue-async-computed';

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

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
