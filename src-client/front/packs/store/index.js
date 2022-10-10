import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import VueEvents from 'vue-events';

Vue.use(Vuex);
Vue.use(VueEvents);

const { noraInventoryData } = window;

const {
  apiUrl,
  categories,
  dates,
  defaultLocale,
  emitEvents,
  featuresWithValues,
  featuresToFilter,
  menus,
  redirectAutoToCart,
  steps,
  summarySettings,
  translations,
  truncProductTitle
} = noraInventoryData;

import ajax from "@/common/ajax";
import processEvents from "@/common/process-events";

/**
 * Verify if it's possible to add more products in the current step
 */
const addMoreProductsInCurrentStepAllowed = ({
  currentStepDetails,
  currentStep,
  basket
}) => {
  if (
    _.isUndefined(currentStepDetails) ||
    _.isUndefined(currentStepDetails.quantity)
  ) {
    return true;
  }

  const maxQuantity = Number(currentStepDetails.quantity);
  const productsInThisStep = _.reduce(
    basket,
    (prev, curr) =>
      prev + (curr.id_step === currentStep ? Number(curr.quantity) : 0),
    0
  );

  return productsInThisStep < maxQuantity;
};

/**
 * Set current step to the next step available
 */
const setNextStep = state => {
  const stepIndex = _.findIndex(
    state.steps,
    step => step.id === state.currentStep
  );

  const nextStep = stepIndex + 1;

  if (nextStep !== state.steps.length) {
    state.currentStep = state.steps[nextStep].id;
  }
};

const store = new Vuex.Store({
  state: {
    // Global values
    dates,
    menus,
    steps,
    categories,
    featuresWithValues,

    // @TODO: From configuration
    emitEvents,
    truncProductTitle,
    featuresToFilter,
    redirectAutoToCart,
    summarySettings,

    apiUrl,
    translations,
    defaultLocale,
    showPrices: window.noraInventoryData.showPrices,
    isLoggued: window.noraInventoryData.isLoggued,

    // v-model
    currentDate: "",
    currentMenu: 0,
    currentOption: 0,
    currentStep: 0,
    upsellingValue: 0,
    nextFriday: "",
    nextFridayIndex: 0,
    swiper: {},

    // MENU
    // Medio menu
    currentMenuDetails: {},

    // OPTIONS
    // 1 primero y 1 segundo
    currentOptionDetails: {},
    currentMenuOptions: [], // For selected menu

    // STEPS
    // (1) primero - (2) segundo - (3) postre
    currentStepDetails: {},
    currentOptionSteps: [], // For selected option

    loading: false,
    products: [],
    errors: [],
    basket: []
  },
  getters: {
    emitEvents: state => state.emitEvents,
    truncProductTitle: state => state.truncProductTitle,
    featuresToFilter: state => state.featuresToFilter,
    redirectAutoToCart: state => state.redirectAutoToCart,
    summarySettings: state => state.summarySettings,

    allowMoreProductsInCurrentStep: state =>
      addMoreProductsInCurrentStepAllowed(state),

    /** Products selected array */
    basket: state => state.basket,
    categories: state => state.categories,
    featuresWithValues: state => state.featuresWithValues,

    /**
     * Locale string
     * @example 'es-ES'
     */
    defaultLocale: state => state.defaultLocale,

    /** Front api url */
    apiUrl: state => state.apiUrl,

    /**
     * Available days array
     * @example ['2021-04-21', '2021-04-22']
     */
    dates: state => state.dates,

    /** Menus list */
    menus: state => state.menus,

    /**
     * Options object for current menu
     * @example {id: 1, label: '1 primero y 1 segundo', price: 10.95, steps: [
     *   {id: 1, quantity: 2, name: 'Primero'},
     *   {id: 2, quantity: 1, name: 'Segundo'},
     * ]}
     */
    options: state => state.currentMenuOptions,

    /** Steps list */
    steps: state => state.steps,

    /** Products list */
    products: state => state.products,


    /** Show prices **/
    showPrices: state => state.showPrices,

    /** Is loggued **/
    isLoggued: state => state.isLoggued,

    /** Products list by current date */
    productsByCurrentStep: state => {
      const step = _.find(state.steps, s => s.id === state.currentStep);
      let products = _.filter(state.products, p =>
        _.includes(step.categories, p.id_category_default)
      );

      return _.filter(products, p =>
        _.reduce(
          p.attributes,
          (prev, curr) =>
            prev && _.includes(step.attributes, curr["id_attribute"]),
          true
        )
      );
    },

    /**
     * Selected date
     * @example '2021-04-23'
     */
    currentDate: state => state.currentDate,

    /**
     * Selected menu
     * @example: 1
     */
    currentMenu: state => state.currentMenu,

    /**
     * Current menu object
     * @example {id: 1, label: 'Menu'}
     */
    currentMenuDetails: state => state.currentMenuDetails,

    /**
     * Selected option id
     * @example 2
     */
    currentOption: state => state.currentOption,

    /**
     * Selected option object
     * @example {id: 1, label: '1 primero y 1 segundo', price: 10.95}
     */
    currentOptionDetails: state => state.currentOptionDetails,

    currentOptionSteps: state => state.currentOptionSteps,

    /**
     * Selected step id
     * @example 1
     */
    currentStep: state => state.currentStep,


    /**
     * Selected step id
     * @example 1
     */
    upsellingValue: state => state.upsellingValue,


    /**
     * Selected step object
     * @example {id: 1, label: 'Primero', text: 1, categories: [3, 4, 5]}
     */
    currentStepDetails: state => state.currentStepDetails,

    /**
     * Steps id availables from selected menu and option
     * @example: [1, 2]
     */
    currentMenuOptionStepIds: state =>
      _.map(state.currentOptionSteps, s => s.id),

    /** Loading state */
    loading: state => state.loading,

    /** Errors array */
    errors: state => state.errors,

    /** Last error string */
    lastError: state => state.errors[0],

    /** Last step object */
    lastStep: state => _.last(state.steps),

    /** Is last step boolean */
    isLastStep: state => {
      const stepIndex = _.findIndex(
        state.steps,
        step => step.id === state.currentStep
      );

      return (
        _.result(_.last(state.steps), "id") ===
        _.result(state.steps[stepIndex], "id")
      );
    }
  },
  mutations: {
    ENABLE_LOADING: state => (state.loading = true),
    DISABLE_LOADING: state => (state.loading = false),
    SET_CURRENT_DATE: (state, date) => (state.currentDate = date),
    SET_CURRENT_MENU: (state, id) => {
      state.currentMenu = id;
      state.currentMenuDetails = _.find(
        state.menus,
        m => m.id === state.currentMenu
      );
      state.currentMenuOptions = state.currentMenuDetails.options;
    },
    SET_CURRENT_OPTION: (state, id) => {
      state.currentOption = id;
      state.currentOptionDetails = _.find(
        state.currentMenuOptions,
        o => o.id === state.currentOption
      );
      state.currentOptionSteps = state.currentOptionDetails.steps;
    },
    SET_CURRENT_STEP: (state, id) => {
      state.currentStep = id;
      state.currentStepDetails = _.find(
        state.currentOptionSteps,
        s => s.id === state.currentStep
      );
    },
    SET_ERROR: (state, error) => state.errors.unshift(error),
    SET_PRODUCTS: (state, products) => (state.products = products),
    RESET_ERRORS: state => (state.errors = []).apiUrl,
    RESET_OPTION: state => {
      // Get options from the current menu
      const options = _.result(
        _.find(state.menus, menu => menu.id === state.currentMenu),
        "options"
      );

      state.currentOption = _.result(
        _.find(options, o => o.id === state.currentOption),
        "id"
      );
      state.currentOptionDetails = _.find(
        state.currentMenuOptions,
        o => o.id === state.currentOption
      );
      state.currentOptionSteps = state.currentOptionDetails.steps;
    },
    RESET_STEP: state => {
      let availableStepIds;
      // Get options from the current menu
      const options = _.result(
        _.find(state.menus, menu => menu.id === state.currentMenu),
        "options"
      );

      if (_.isEmpty(options)) {
        availableStepIds = _.map(state.steps, s => s.id);
      } else {
        // From the selected menu options, get the available steps
        availableStepIds = _.map(
          _.result(
            _.find(options, o => o.id === state.currentOption),
            "steps"
          ),
          o => o.id
        );
      }

      // Set current step
      state.currentStep = _.first(availableStepIds);
      state.currentStepDetails = _.find(
        state.currentOptionSteps,
        s => s.id === state.currentStep
      );
    },
    RESET_BASKET: state => {
      state.basket = [];
    },
    REMOVE_PRODUCT_FROM_BASKET: (state, params) => {
      // Find if the product has been added to the current state
      // Help to fullfil the step product limit
      const index = _.findIndex(
        state.basket,
        p =>
          p.id_product === Number(params.id_product) &&
          p.id_product_attribute === params.id_product_attribute &&
          p.id_menu === params.id_menu &&
          p.id_option === params.id_option &&
          p.id_step === params.id_step &&
          p.date === params.date
      );

      if (index > -1 && state.basket[index].quantity > 1) {
        state.basket[index].quantity--;
      } else {
        state.basket.splice(index, 1);
      }
    },
    ADD_PRODUCT_TO_BASKET: (state, params) => {
      // Find if the product has been added to the current state
      // Help to fullfil the step product limit
      const index = _.findIndex(
        state.basket,
        p =>
          Number(p.id_product) === Number(params.id_product) &&
          p.id_product_attribute === params.id_product_attribute &&
          p.id_menu === params.id_menu &&
          p.id_option === params.id_option &&
          p.id_step === params.id_step &&
          p.date === params.date
      );

      // Else add the article to the selection
      if (index === -1) {
        state.basket.push({
          id_product: Number(params.id_product),
          id_product_attribute: params.id_product_attribute,
          id_menu: params.id_menu,
          id_option: params.id_option,
          id_step: params.id_step,
          date: params.date,
          quantity: 1
        });
      } else {
        // Check if it's allowed to increase in a new article
        state.basket[index].quantity++;
      }

      if (state.currentMenuDetails.type === "product_pack") {
        // Set next step
        // first check if there are more products to add
        // last increment current step in one

        const canAddMoreProducts = addMoreProductsInCurrentStepAllowed(state);

        if (!canAddMoreProducts) {
          setNextStep(state);
        }
      }
    },
    SET_NEXT_STEP: state => setNextStep(state)
  },
  actions: {
    async getTotalProducts(_ctx, params) {
      try {
        await ajax(
          this.state.apiUrl,
          "GET",
          _.extend({ action: "getTotalProducts" }, params)
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts({ commit }, params = {}) {
      commit("ENABLE_LOADING");

      try {

        console.log('getProductsByDate');
        const result = await ajax(
          this.state.apiUrl,
          "GET",
          _.extend({ action: "getProductsByDate" }, params)
        );

        commit("SET_PRODUCTS", result);
      
      } catch (error) {
        commit("SET_ERROR", error.message);

      }

      commit("DISABLE_LOADING");
    },

    /**
     * Create a product pack and add it to the cart
     *
     * @param {Store} context
     * @param {object} params
     */
    async createProductPack({ commit }, params) {
      commit("ENABLE_LOADING");

      try {
        const cartInfo = await ajax(
          this.state.apiUrl,
          "GET",
          _.extend(params, { action: "createProductPack" })
        );

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

        await processEvents({
          actionURL,
          query,
          redirectAutoTo: summarySettings.redirectAutoTo
        });
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("DISABLE_LOADING");
      }
    },

    async createCartRule({ commit }, params) {
      commit("ENABLE_LOADING");

      try {
        const cartInfo = await ajax(
          this.state.apiUrl,
          "GET",
          _.extend(params, { action: "createCartRule" })
        );

        const actionURL = cartInfo.cart_url;
        const staticToken = cartInfo.static_token;

        let index = 1;
        const length = params.product_info.length;
        for (let data of params.product_info) {
          const query = new URLSearchParams();
          query.append("id_product", data[1]);
          query.append("id_product_attribute", data[2]);
          query.append("id_customization", 0);
          query.append("qty", data[0]);
          query.append("add", 1);
          query.append("token", staticToken);
          query.append("action", "update");
          query.append("date", params.date);

          const isLast = index === length;
          await processEvents({
            actionURL,
            query,
            emit: isLast,
            redirectAutoTo: summarySettings.redirectAutoTo
          });
          index++;
        }
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("DISABLE_LOADING");
      }
    },

    async addExtraProductsToCart({ commit }, params) {
      commit("ENABLE_LOADING");

      try {
        const cartInfo = await ajax(
          this.state.apiUrl,
          "GET",
          _.extend(params, { action: "createCartRule" })
        );

        const actionURL = cartInfo.cart_url;
        const staticToken = cartInfo.static_token;

        for (let data of params.product_info) {
          const query = new URLSearchParams();
          query.append("id_product", data[1]);
          query.append("id_product_attribute", data[2]);
          query.append("id_customization", 0);
          query.append("qty", data[0]);
          query.append("add", 1);
          query.append("token", staticToken);
          query.append("action", "update");
          query.append("date", params.date);

          await processEvents({ actionURL, query, emit: false });
        }
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("DISABLE_LOADING");
      }
    }
  },
  modules: {}
});

export default store;
