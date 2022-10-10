<template>
  <section id="product-pack" class="my-5">
    <features-list :features="featuresToFilter"></features-list>

    <section v-if="!isEmpty" id="products">
      <div
        :class="[
          'row',
          currentMenuDetails.type === 'product_pack'
            ? 'product-packs-row'
            : 'product-cart-row',
          'products-row'
        ]"
      >
        <div
          v-for="(product, index) in listing.products"
          :key="index"
          class="col-md-3 mb-3"
          :data-id-product="product.id_product"
          :data-id-product-attribute="product.id_product_attribute"
          :class="[
            `product-${product.id_product}-attribute-${product.id_product_attribute}`,
            'product-row-item'
          ]"
        >
          <div
            class="card h-100 product-card"
            :class="isProductSelected(product) ? 'selected' : ''"
          >
            <div v-if="product.fijo == 1 || product.new == 1 || product.best_seller == 1" class="product-info">
              <div v-if="product.new == 1" class="new-product">
                {{ trans("new_product") }}
              </div>
              <div v-else-if="product.fijo == 1" class="fijo-product">
                {{ trans("fijo") }}
              </div>
              <div v-else></div>
              <div v-if="product.best_seller == 1" class="best-seller">
                <img src="/modules/norainventory/img/star.png" :title="trans('best_seller')">
                <span> {{ trans("best_seller") }}</span>
              </div>
              <div v-else></div>
            </div>
            <div class="card-header product-card-header">
              <div
                class="d-flex justify-content-center product-image"
                role="button"
                @click="clickOpenProductModal(product)"
              >
                <img
                  v-if="product.cover"
                  :src="product.cover.bySize.home_default.url"
                  :alt="
                    !empty(product.cover.legend)
                      ? product.cover.legend
                      : trunc(product.name)
                  "
                  data-full-size-image-url="product.cover.large.url"
                  class="img-fluid"
                />
                <img
                  v-else
                  src="urls.no_picture_image.bySize.home_default.url"
                  class="img-fluid"
                />
              </div>
            </div>

            <div class="card-body product-card-body">
              <h2
                class="card-title h3 product-title product-card-title"
                role="button"
                @click="clickOpenProductModal(product)"
              >
                {{ trunc(product.name) }}
              </h2>

              <product-features
              class="products-row-features"
              :features="getProductFeatures(product, 6)"
              ></product-features>
              
              <div
                  v-for="(attribute, index) in Object.values(product.attributes)"
                  :key="index"
                  class="product-attribute-carta"
                >
                  <span class="attribute-name">{{ attribute.group }}: {{ attribute.name }}</span>
              </div>

              <div class="product-attribute-upselling"  v-if="product.upselling > 0">
                  Suplemento adicional {{ parseFloat(product.upselling).toFixed(2)}}€
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <div
                v-if="showDescription"
                class="card-text product-short-description"
                v-html="truncDesc(product.description_short)"
              ></div>


              <div v-if="!isProductPack" class="card-text product-card-attributes">
                <product-attributes
                  :attributes="Object.values(product.attributes) || []"
                ></product-attributes>
              </div>

              <div
                v-if="product.show_price && !isProductPack"
                class="product-price-and-shipping"
              >
                <product-price :product="product"></product-price>
              </div>
            </div>

            <div class="card-footer product-card-footer" v-if="product.quantity > 0" >
              <div class="d-flex justify-content-center product-list-actions">
                <button-section
                  :product="product"
                  :disabled="disabled"
                  :quantity-in-cart="quantityInCart(product)"
                  :is-product-pack="currentMenuDetails.type === 'product_pack'"
                  :is-product-selected="isProductSelected(product)"
                  @add="clickAdd"
                  @remove="clickRemove"
                ></button-section>
              </div>
            </div>
             <div class="card-footer product-card-footer out-of-stock" v-if="product.quantity <= 0" >
                  {{ trans("out_of_stock") }}
             </div>
          </div>

          <product-flags
            v-if="!isProductPack"
            :flags="getFlags(product.flags)"
          ></product-flags>
        </div>
      </div>

      <product-modal
        v-if="displayProductModal"
        :product="selectedProductModal"
        :disabled="disabled"
        :quantity-in-cart="quantityInCart(selectedProductModal)"
        :is-product-pack="currentMenuDetails.type === 'product_pack'"
        :is-product-selected="isProductSelected(selectedProductModal)"
        :features="getProductFeatures(selectedProductModal, 1)"
        @close="closeProductModal()"
        @add="clickAdd($event)"
        @remove="clickRemove($event)"
      ></product-modal>
    </section>

    <section v-if="isEmpty" class="empty" id="products">

      <!-- Temporal functionality for christmas -->
      <div class="weekend_no_products" v-if="currentMenuDetails.id == 6">
        <h2 style="color: black;text-align: center;font-size: 30px;font-weight: 900;">{{ trans("weekend_solo") }}</h2>
        <br>
        <h3>{{ trans("weekend_select") }}</h3>
        <br><br>
        <button
            type="buton"
            class="btn btn-lg date-selector-content-button"
            @click="changeToFriday()"
            style="background-color: black;color: white;border: 1px solid white;margin-bottom:30px;"
          >
            {{ trans("weekend_select_date") }}
        </button>
      </div>
      <!-- Temporal functionality for christmas -->
      <div class="weekend_no_products" v-if="currentMenuDetails.id == 24">
        <h2 style="color: black;text-align: center;font-size: 30px;font-weight: 900;">¿No te aparece ningun plato?</h2>
        <br>
        <h3>Selecciona la fecha en la que quieres recibir vuestro pedido y os aparecerán los distintos platos</h3>
        <br>
        <h3>Fechas de entrega: <b>23,24,30 y 31 de Diciembre</b></h3>
        <br><br>
        <button
            type="buton"
            class="btn btn-lg date-selector-content-button"
            data-toggle="modal"
            data-target="#changeDateModal"
            style="background-color: black;color: white;border: 1px solid white;margin-bottom:30px;"
          >
            SELECCIONAR FECHA
        </button>
        <br><br>
        Para cualquier otra duda o fecha de cena de navidad, por favor escribir a <a href="catering@norarealfood.com">catering@norarealfood.com</a>
      </div>
      
    </section>
    <button-navigation v-bind:class="{ stickyProceedButton: hasProducts }" v-if="!isEmpty && displayNavigationButton"
      @click="clickGoToNextStep()"
    ></button-navigation>
  </section>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import VueEvents from 'vue-events'

import FeaturesList from "@/components/FeaturesList.vue";
import ProductAttributes from "@/components/ProductAttributes.vue";
import ProductFlags from "@/components/ProductFlags.vue";
import ProductModal from "@/components/ProductModal.vue";
import ButtonSection from "@/components/ButtonSection.vue";
import ProductPrice from "@/components/ProductPrice.vue";
import ButtonNavigation from "@/components/ButtonNavigation.vue";
import ProductFeatures from "@/components/ProductFeatures.vue";

export default {
  name: "ProductsList",
  components: {
    ButtonSection,
    FeaturesList,
    ProductAttributes,
    ProductFlags,
    ProductModal,
    ProductPrice,
    ButtonNavigation,
    ProductFeatures
  },
  props: {
    listing: {
      type: Object,
      default: () => {}
    },
    showDescription: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      result: {},
      selectedProductModal: {},
      displayProductModal: false,
      hasProducts: false,
      productCounter: 0,
      selectedDate: ""
    };
  },
  computed: {
    ...mapGetters([
      "basket",
      "currentMenu",
      "currentOption",
      "currentStep",
      "currentDate",
      "currentMenuDetails",
      "featuresWithValues",
      "featuresToFilter",
      "truncProductTitle"
    ]),
    displayNavigationButton() {
      return this.currentMenuDetails.type === "cart_rule";
    },
    urls() {
      return window.prestashop.urls;
    },
    isEmpty() {
      return _.isEmpty(this.listing.products);
    },
    disabled() {
      return !this.$store.getters["allowMoreProductsInCurrentStep"];
    },
    isProductPack() {
      return this.currentMenuDetails.type === "product_pack";
    }
  },
  methods: {
    getProductFeatures(product, id_feature) {
      const productFeatures = product.features;
      const featuresWithValues = this.$store.getters["featuresWithValues"];

      let filterdFeatures = _.filter(featuresWithValues, fv =>
        _.find(
          productFeatures,
          f => f.value === fv.value && ((id_feature === false && fv.id_feature === f.id_feature) || (fv.id_feature == id_feature))
        )
      );

      let features = {};
      let values = {};

      _.each(
        filterdFeatures,
        f =>
          (features[f.id_feature] = { id: f.id_feature, name: f.name }) &&
          (_.isEmpty(values[f.id_feature])
            ? (values[f.id_feature] = [
                { id: f.id_feature_value, name: f.value }
              ])
            : values[f.id_feature].push({
                id: f.id_feature_value,
                name: f.value
              }))
      );

      const result = _.map(features, f => ({ ...f, values: values[f.id] }));

      return _.isEmpty(result) ? [] : result;
    },
    getFlags(flags) {
      if (_.isArray(flags)) {
        return flags;
      } else if (_.isObject(flags)) {
        return Object.values(flags);
      } else {
        return [];
      }
    },
    clickGoToNextStep() {
      this.$store.commit("SET_NEXT_STEP");
    },
    changeToFriday()
    {
      this.$store.state.swiper.slideTo( this.$store.state.nextFridayIndex) 
      this.$events.fire('dateChangeEvent', this.$store.state.nextFriday);
      
      this.$store.commit("SET_CURRENT_DATE", this.$store.state.nextFriday);
      this.$store.commit("RESET_BASKET");
      this.$store.dispatch("getProducts", {
        date: this.$store.state.nextFriday
      });
    },
    clickOpenProductModal(product) {
      this.displayProductModal = true;
      this.selectedProductModal = product;
    },
    closeProductModal() {
      this.displayProductModal = false;
      this.selectedProductModal = {};
    },
    isProductSelected(product) {
      const basket = this.basket;

      return Boolean(
        _.find(
          basket,
          item =>
            item.id_product === Number(product.id) &&
            item.id_product_attribute === product.id_product_attribute
        )
      );
    },
    quantityInCart(product) {
      const basket = this.basket;

      return (
        _.result(
          _.find(
            basket,
            item =>
              item.id_product === Number(product.id) &&
              item.id_product_attribute === product.id_product_attribute
          ),
          "quantity"
        ) || 0
      );
    },
    trunc(str) {
      if (this.truncProductTitle) {
        return _.truncate(str, {
          length: 30,
          separator: "..."
        });
      }

      return str;
    },
    truncDesc(str) {
      return _.truncate(str, {
        length: 200,
        separator: "..."
      });
    },
    empty(str) {
      return _.isUndefined(str) || _.isNull(str) || !str;
    },
    clickAdd(product) {

      //first check if uaser not loggued, if iots not just redirecto to login and do nothing
      if (!window.noraInventoryData.isLoggued)
      { 
        if (window.noraInventoryData.defaultLocale == 'es-ES')
        {
          window.location = "/es/iniciar-sesion";
        }
        else if (window.noraInventoryData.defaultLocale == 'ca-ES')
        {
          window.location = "/ca/inici%20de%20sessió";
        }
        return false;
      }

      this.productCounter++;
      this.hasProducts = true;

      if (!this.currentMenuDetails.product_additional_cost)
      {
        this.currentMenuDetails.product_additional_cost = parseFloat(product.upselling);
      }
      else
      {
        this.currentMenuDetails.product_additional_cost += parseFloat(product.upselling);
      }

      this.$store.commit(
        "ADD_PRODUCT_TO_BASKET",
        _.extend(product, {
          id_menu: this.currentMenu,
          id_option: this.currentOption,
          id_step: this.currentStep,
          date: this.currentDate
        })
      );
    },
    clickRemove(product) {

      //logic to control when to show the realizar pedido button as fixed bottom
      if (this.productCounter >0)
      {
        this.productCounter--;
      }
      if (this.productCounter == 0)
      {
        this.hasProducts = false;
      }

      this.$store.commit(
        "REMOVE_PRODUCT_FROM_BASKET",
        _.extend(product, {
          id_menu: this.currentMenu,
          id_option: this.currentOption,
          id_step: this.currentStep,
          date: this.currentDate
        })
      );
    }
  }
};
</script>

<style lang="scss">
#product-pack {
  .products-row-features {
    //position: absolute;
    .features-list {
      margin: 0;
    }
    .product-modal-feature-title {
      display: none;
    }
    .product-modal-feature-value-icon {
      width: 24px;
      height: 24px;
      font-size: 0.8rem;
    }
    .product-modal-feature-value-text {
      display: none;
    }
  }
  margin-block-start: 50px;
  .features-list {
    margin-block-start: 50px;
    margin-block-end: 50px;
  }

  .product-cart-row {
    .product-row-item {
      .product-card {
        min-height: 502px;
      }
    }
  }

  #products {
    .card {
      padding-block-end: 51px;
      .product-card-title {
        font-size: 1rem;
      }
    }

    .card-footer,
    .card-header {
      border: none;
      background-color: transparent;
    }

    .selected {
      border: 3px solid #14171b;

      .product-description {
        width: 100% !important;
      }

      .thumbnail {
        img {
          top: 3px !important;
        }
      }
    }

    .a-la-carte-number {
      width: 18px;
      height: 43px;
      margin: 0 29px;
      font-size: 32px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.34;
      letter-spacing: normal;
      text-align: center;
      color: #14171b;
    }

    .a-la-carte-icon {
      .material-icons {
        width: 18px;
        height: 43px;
        margin: 0 29px;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.34;
        letter-spacing: normal;
        text-align: center;
        color: #14171b;
      }
    }

    .product-card-attributes {
      display: none;
    }

    .product-price-and-shipping {
      margin-block-start: 30px;
      margin-block-end: 30px;
      .price {
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: normal;
        text-align: center;
        color: #696969;
      }
    }
  }
}
</style>
