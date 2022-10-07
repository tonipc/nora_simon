import Vue from "vue";
import Vuex from "vuex";
import Toasted from "vue-toasted";
import { DateTime } from "luxon";
import {
  each,
  extend,
  find,
  findIndex,
  isEmpty,
  isNaN,
  isUndefined,
  remove,
  range
} from "lodash";
const _ = {
  each,
  extend,
  find,
  findIndex,
  isEmpty,
  isNaN,
  isUndefined,
  remove,
  range
};

Vue.use(Vuex);
Vue.use(Toasted, { iconPack: "mdi", duration: 3000 });

/**
 *
 * @param {strin} endpoint Url
 * @param {string} type GET, POST, PUT, DELETE
 * @param {object} data Params
 * @returns
 */
const ajax = function(endpoint, type, data) {
  const jQuery = window.$;

  return new Promise((resolve, reject) => {
    jQuery.ajax({
      url: endpoint,
      type,
      data,
      success: resp => {
        resolve(resp);
      },
      error: err => {
        reject(err);
      }
    });
  });
};

const store = new Vuex.Store({
  state: {
    apiUrl: window.noraInventoryData.apiUrl,
    busy: [],
    loading: false,
    loadingRows: false,
    errors: [],
    products: [],
    translations: window.noraInventoryData.translations,
    /**
     * How many weeks after, before or 0 for this week
     */
    currentWeek: 0,
    disableSaturdays: !!window.noraInventoryData.disableSaturdays,
    disableSundays: !!window.noraInventoryData.disableSundays,
    defaultLocale: window.noraInventoryData.language.locale,
    saturday: 6,
    sunday: 7
  },
  getters: {
    disableSaturdays: state => state.disableSaturdays,
    disableSundays: state => state.disableSundays,
    busy: state => state.busy,
    loading: state => state.loading,
    errors: state => state.errors,
    lastError: state => state.errors[0],
    today: state => state.today,
    currentWeek: state => state.currentWeek,
    week: state => {
      let week = [];
      _.each(_.range(7), index =>
        week.push(
          DateTime.now()
            .setLocale(state.defaultLocale)
            .plus({ days: 7 * state.currentWeek + index })
        )
      );

      return week;
    },
    products: state => state.products,
    saturday: state => state.saturday,
    sunday: state => state.sunday
  },
  mutations: {
    ENABLE_LOADING: state => (state.loading = true),
    DISABLE_LOADING: state => (state.loading = false),
    ENABLE_BUSY: (state, payload) =>
      state.busy.push(
        `${payload.date}-${payload.idProduct}-${+payload.idProductAttribute}`
      ),
    DISABLE_BUSY: (state, payload) => {
      const item = `${payload.date}-${
        payload.idProduct
      }-${+payload.idProductAttribute}`;
      const index = state.busy.indexOf(item);
      if (index !== -1) {
        state.busy.splice(index, 1);
      }
    },
    ENABLE_LOADING_ROWS: state => (state.loadingRows = true),
    DISABLE_LOADING_ROWS: state => (state.loadingRows = false),
    SET_PRODUCTS: (state, products) => (state.products = products),
    SET_ERROR: (state, error) => state.errors.unshift(error),
    RESET_ERRORS: state => (state.errors = []).apiUrl,
    SET_CURRENT_WEEK: (state, value) => (state.currentWeek = value),
    NEXT_WEEK: state => state.currentWeek++,
    PREVIOUS_WEEK: state => state.currentWeek--,
    UPDATE_PRODUCT_STOCK_BY_DATE: (
      state,
      { idProduct, idAttribute, date, quantity = 0 }
    ) => {
      const productIndex = _.findIndex(
        state.products,
        product => product.id == idProduct
      );

      idAttribute = _.isNaN(Number(idAttribute)) ? 0 : Number(idAttribute);

      if (_.isUndefined(state.products[productIndex]["stocks"][idAttribute])) {
        state.products[productIndex]["stocks"][idAttribute] = {};
      }

      state.products[productIndex]["stocks"][idAttribute][date] = quantity;
    }
  },
  actions: {
    async getProducts({ commit }, params = {}) {
      if (_.isEmpty(params)) {
        commit("ENABLE_LOADING");
      }

      try {
        const result = await ajax(
          this.state.apiUrl,
          "GET",
          _.extend({ action: "getProducts" }, params)
        );

        commit("SET_PRODUCTS", result);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        if (_.isEmpty(params)) {
          commit("DISABLE_LOADING");
        }
      }
    },

    async createAvailableDate({ commit }, params = {}) {
      commit("ENABLE_BUSY", params);

      const enableToast = true;

      if (enableToast) {
        Vue.toasted.show(
          `Updating product ${params.idProduct}, date ${params.date} to quantity ${params.quantity}`,
          { icon: "timer-sand" }
        );
      }

      try {
        await ajax(
          this.state.apiUrl,
          "GET",
          _.extend({ action: "createAvailableDate" }, params)
        );

        commit("UPDATE_PRODUCT_STOCK_BY_DATE", params);
        if (enableToast) {
          Vue.toasted.success(
            `Updated product ${params.idProduct}, date ${params.date} to quantity ${params.quantity}`,
            { icon: "check-circle" }
          );
        }
      } catch (error) {
        if (enableToast) {
          Vue.toasted.error(error.message, { icon: "alert" });
        }

        commit("SET_ERROR", error.message);
      } finally {
        commit("DISABLE_BUSY", params);
      }
    }
  },
  modules: {}
});

export default store;
