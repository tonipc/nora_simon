import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import ajax from "@/common/ajax";
import processEvents from "@/common/process-events";

// const { noraInventoryData, prestashop } = window;
const { noraInventoryData } = window;

const {
  apiUrl,
  basket,
  currentDate,
  currentMenu,
  currentMenuDetails,
  currentMenuOptions,
  currentOption,
  featuresToFilter,
  featuresWithValues,
  menus,
  modalView,
  pageTitle,
  products,
  summarySettings,
  translations,
  truncProductTitle,
  urls
} = noraInventoryData;

const store = new Vuex.Store({
  state: {
    apiUrl,
    basket,
    currentDate,
    currentMenu,
    currentMenuDetails,
    currentMenuOptions,
    currentOption,
    featuresToFilter,
    featuresWithValues,
    menus,
    modalView,
    pageTitle,
    products,
    summarySettings,
    translations,
    truncProductTitle,
    urls
  },
  getters: {
    basket: state => state.basket,
    currentDate: state => state.currentDate,
    currentMenu: state => state.currentMenu,
    currentMenuDetails: state => state.currentMenuDetails,
    currentMenuOptions: state => state.currentMenuOptions,
    currentOption: state => state.currentOption,
    featuresToFilter: state => state.featuresToFilter,
    featuresWithValues: state => state.featuresWithValues,
    menus: state => state.menus,
    modalView: state => state.modalView,
    pageTitle: state => state.pageTitle,
    products: state => state.products,
    summarySettings: state => state.summarySettings,
    truncProductTitle: state => state.truncProductTitle,
    urls: state => state.urls
  },
  mutations: {
    ENABLE_LOADING: state => (state.loading = true),
    DISABLE_LOADING: state => (state.loading = false)
  },
  actions: {
    async createProductPack({ commit }, params) {
      commit("ENABLE_LOADING");

      const options = Object.assign({}, params, {
        action: "createProductPack"
      });

      console.log({ options });

      try {
        const cartInfo = await ajax(this.state.apiUrl, "GET", options);

        const idProduct = cartInfo.id_product;
        const actionURL = cartInfo.cart_url;
        const staticToken = cartInfo.static_token;

        const query = new URLSearchParams();
        query.append("id_product", idProduct);
        query.append("id_customization", 0);
        query.append("qty", params.quantity);
        query.append("add", 1);
        query.append("token", staticToken);
        query.append("action", "update");
        query.append("date", params.date);

        await processEvents({ actionURL, query });
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("DISABLE_LOADING");
      }
    }
  }
});

export default store;
