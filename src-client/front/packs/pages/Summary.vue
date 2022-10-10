<template>
  <section id="summary-page">
    <div class="summary-header">
      <h3 class="summary-title">
        {{ trans("summary_title") }}
      </h3>
      <h4 class="summary-subtitle">
        {{ trans("summary_subtitle") }}
      </h4>
    </div>
    <div class="container summary-content">
      <div class="d-flex justify-content-between summary-content-header">
        <div class="summary-content-header-left">
          {{ formattedDate }}
        </div>
        <div class="summary-content-header-right">
          {{ currentMenuDetails.label }}
        </div>
      </div>
      <div class="row mt-1 summary-products">
        <div
          v-for="(product, index) in productsInBasket"
          :key="index"
          class="col-xs-6 col-md-6 pr-1 summary-product"
        >
          <div class="card summary-product-card">
            <div class="row summary-product-card-row">
              <div class="col-xs-8 col-md-8 summary-product-left">
                <div class="card-body summary-product-left-content">
                  <h5 class="summary-product-name">
                    {{ trunc(product.name) }}
                  </h5>
                  <div class ="product-attribute-upselling"  v-if="product.upselling > 0">
                      Suplemento adicional {{ parseFloat(product.upselling).toFixed(2)}}€
                  </div>
                </div>
              </div>
              <div class="col-xs-4 col-md-4 summary-product-right">
                <div class="summary-product-right-img">
                  <!-- eslint-disable -->
                  <img
                    v-if="product.cover"
                    class="img-fluid"
                    :src="product.cover.small.url"
                    alt="product.name"
                    loading="lazy"
                  />
                  <img
                    v-else
                    class="img-fluid"
                    :src="urls.no_picture_image.bySize.small_default.url"
                    loading="lazy"
                  />
                  <!-- eslint-enable -->
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-between summary-product-card-footer"
            >
              <template v-if="currentMenuDetails.type === 'product_pack'">
                <div class="summary-product-card-footer-price">
                  <span>x{{ product.quantity }}</span>
                </div>
                <div
                  class="summary-product-card-footer-edit"
                  role="button"
                  @click="editItem(product)"
                >
                  <span>{{ trans("edit") }}</span>
                </div>
              </template>
              <template v-else>
                <div class="summary-product-card-footer-price"  v-if="showPrices">
                  <span>{{ product.price }}</span>
                </div>
                <div class="summary-product-card-footer-quantity">
                  <span
                    role="button"
                    class="material-icons"
                    @click="clickRemove(product)"
                  >
                    remove_circle
                  </span>
                  <span>{{ product.quantity }}</span>
                  <span
                    role="button"
                    class="material-icons"
                    @click="clickAdd(product)"
                  >
                    add_circle
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <summary-quantity
      v-if="currentMenuDetails.type === 'product_pack'"
      v-model="quantity"
      :input-type="summarySettings.quantityType"
      :select-options="summarySettings.quantityInputs"
    />

    <products-sidebar
      v-if="displayUpselling"
      v-model="extraBasket"
      class="ml-1"
      :products="products"
    />

    <!-- eslint-disable -->
    <section class="mx-1 summary-content-description">
      <div
        class="summary-content-description-short"
        v-html="currentMenuDetails.description_short"
      ></div>

      <div
        class="summary-content-description-long"
        v-html="currentMenuDetails.description"
      ></div>
    </section>
    <!-- eslint-enable -->

    <div class="mx-1 summary-total" v-if="showPrices">
      <div class="summary-total-title">
        <span>Total:</span>
      </div>
      <div class="summary-total-price">
        {{ localeTotalProductsPrice }}
      </div>
    </div>

    <summary-buttons
      v-if="!isEmpty"
      :busy="busy"
      :loading="loading"
      :continue-label="continueLabel"
      :more-label="trans('add_more_products')"
      :two-buttons="summarySettings.twoButtons"
      @add-to-cart="clickAddToCart"
      @add-more-products="clickAddMoreProducts"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
import _ from "lodash";

import ProductsSidebar from "@/components/ProductsSidebar";
import SummaryButtons from "@/components/SummaryButtons.vue";
import SummaryQuantity from "@/components/SummaryQuantity.vue";

export default {
  name: "SummaryPage",
  components: {
    ProductsSidebar,
    SummaryButtons,
    SummaryQuantity
  },
  data() {
    return {
      busy: false, // Left button
      loading: false, // Right button
      open: true,
      extraBasket: [],
      quantity: 1
    };
  },
  computed: {
    ...mapGetters([
      "basket",
      "categories",
      "currentDate",
      "currentMenu",
      "currentMenuDetails",
      "currentOptionDetails",
      "defaultLocale",
      "emitEvents",
      "products",
      "summarySettings",
      "showPrices",
      "truncProductTitle"
    ]),
    localeTotalProductsPrice() {
      return (Number.isNaN(this.totalProductsPrice)?0:this.totalProductsPrice)
      .toLocaleString(this.defaultLocale, {
        style: "currency",
        currency: window.prestashop.currency.iso_code
      });
    },
    continueLabel() {
      return this.summarySettings.isEmptyCart
        ? this.trans("proceed_to_checkout")
        : this.trans("review_and_confirm_payment");
    },
    displayUpselling() {
      return this.currentMenuDetails.upselling === "1";
    },
    formattedDate() {
      return DateTime.fromISO(this.currentDate, {
        locale: this.defaultLocale
      }).toLocaleString(DateTime.DATE_HUGE);
    },
    isEmpty() {
      return _.isEmpty(this.basket);
    },
    urls() {
      return window.prestashop.urls;
    },
    productsInBasket() {
      return _.map(this.basket, p => {
        const products = this.$store.getters["products"];
        const product = _.find(
          products,
          prod =>
            Number(prod.id) === p.id_product &&
            prod.id_product_attribute === p.id_product_attribute
        );

        return {
          id: product.id,
          id_product: Number(product.id),
          id_product_attribute: Number(product.id_product_attribute),
          url: product.url,
          cover: product.cover,
          name: product.name,
          quantity: p.quantity,
          quantity_available: product.quantity,
          price: product.price,
          upselling: product.upselling,
          priceAmount: product.price_amount,
          attributes: product.attributes
        };
      });
    },
    totalProductsPrice() {
      return this.totalExtraBasketPrice + this.totalBasketPrice;
    },
    totalExtraBasketPrice() {
      if (_.isEmpty(this.extraBasket)) {
        return 0;
      }

      return _.reduce(
        this.extraBasket,
        (prev, curr) => prev + curr.price_amount * curr.quantity,
        0
      );
    },
    totalBasketPrice() {
      let price = 0;

      if (
        this.currentOptionDetails.type === "product_pack" &&
        this.currentOptionDetails.price_amount
      ) {
        price = this.currentOptionDetails.price_amount + this.currentMenuDetails.product_additional_cost;
      } else {
        price = _.reduce(
          this.productsInBasket,
          (prev, curr) => prev + curr.priceAmount * curr.quantity,
          0
        );
      }

      return (this.quantity * Math.round(price * 100)) / 100;
    }
  },
  watch: {
    quantity(qty) {
      if (qty === 0) {
        this.reset();
      }
    }
  },
  mounted() {
    this.currentCategory = Number(
      _.result(_.first(this.mappedCategories), "id")
    );
  },
  methods: {
    clickAdd(item) {
      console.log({ item });
      const product = _.find(
        this.basket,
        b =>
          b.id_product === item.id_product &&
          b.id_product_attribute === item.id_product_attribute
      );

      console.log({ product });
      this.$store.commit("ADD_PRODUCT_TO_BASKET", product);
    },
    clickRemove(item) {
      const product = _.find(
        this.basket,
        b =>
          b.id_product === item.id_product &&
          b.id_product_attribute === item.id_product_attribute
      );
      this.$store.commit("REMOVE_PRODUCT_FROM_BASKET", product);
    },
    async addExtraProductsToCart() {
      // Add extras to the cart
      if (!_.isEmpty(this.extraBasket)) {
        let extrasData = [];
        _.each(this.extraBasket, prod => {
          extrasData.push([
            prod.quantity,
            prod.id_product,
            prod.id_product_attribute
          ]);
        });

        await this.$store.dispatch("addExtraProductsToCart", {
          product_info: extrasData,
          date: this.currentDate,
          id_product_step_pack: this.currentMenu,
          name: this.currentMenuDetails.label
        });
      }
    },
    async addMainProductsToCart() {
      // Add standard products to the cart
      const productsData = [];

      _.each(this.basket, prod => {
        productsData.push([
          prod.quantity,
          prod.id_product,
          prod.id_product_attribute
        ]);
      });

      const action =
        this.currentMenuDetails.type === "product_pack"
          ? "createProductPack"
          : "createCartRule";

      await this.$store.dispatch(action, {
        product_info: productsData,
        date: this.currentDate,
        id_product_step_pack: this.currentMenu,
        name: this.currentMenuDetails.label,
        quantity: this.quantity
      });
    },
    async clickAddMoreProducts() {
      try {
        this.busy = true;
        await this.addMainProductsToCart();
        await this.addExtraProductsToCart();
      } catch (error) {
        console.error(error);
      } finally {
        this.reset();

        // this.busy = false;
      }
    },
    async clickAddToCart() {
      try {
        this.loading = true;
        await this.addMainProductsToCart();
        await this.addExtraProductsToCart();
      } catch (error) {
        console.error(error);
      } finally {
        // PrestaShop events to display added to the cart confirmation
        if (this.summarySettings.redirectAutoTo) {
          this.redirectToController();
        } else {
          this.reset();
          this.loading = false;
        }
      }
    },
    redirectToController() {
      const { cartUrl, orderUrl, isEmptyCart } = this.summarySettings;

      
      if (isEmptyCart) {
        window.location = orderUrl;
      } else {
        window.location = cartUrl;
      }
      
    },
    editItem(product) {
      const step = _.result(
        _.find(
          this.basket,
          b =>
            b.id_product === product.id_product &&
            b.id_product_attribute === product.id_product_attribute
        ),
        "id_step"
      );

      this.$store.commit("SET_CURRENT_STEP", step);
    },
    empty(str) {
      return _.isUndefined(str) || _.isNull(str) || !str;
    },
    reset() {
      if (
        this.summarySettings.twoButtons &&
        this.summarySettings.redirectAutoTo
      ) {
        window.location.href = window.location.href; // eslint-disable-line
      } else {
        this.extraBasket = [];
        this.quantity = 1;
        this.$store.commit("RESET_OPTION");
        this.$store.commit("RESET_STEP");
        this.$store.commit("RESET_BASKET");
      }
    },
    toggle() {
      this.open = !this.open;
    },
    trunc(str) {
      if (this.truncProductTitle) {
        return _.truncate(str, {
          length: 30,
          separator: "..."
        });
      }

      return str;
    }
  }
};
</script>

<style lang="scss">
#summary-page {
  padding: 51px 157px 54px 154px;
  border-radius: 6px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  .summary-title {
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #14171b;
  }
  .summary-subtitle {
    margin-block-start: 11px;
    margin-block-end: 43px;
    opacity: 0.75;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: #373737;
  }
  .summary-content {
    .summary-products {
      .summary-product {
        .summary-product-name {
          font-size: 16px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.38;
          letter-spacing: normal;
          text-align: left;
          color: #14171b;
          margin-block-start: 28px;
          margin-inline-start: 15px;
        }
        .summary-product-card-footer {
          background-color: white;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid rgba(0, 0, 0, 0.125);
          .summary-product-card-footer-edit {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 2;
            letter-spacing: normal;
            text-align: left;
            color: #696969;
          }
          .summary-product-card-footer-price {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 2;
            letter-spacing: normal;
            text-align: left;
            color: #14171b;
          }
        }
      }
    }
  }
  .summary-total {
    display: flex;
    justify-content: space-between;
    border-block-start: solid 1px #e6e6e6;
    padding-block-start: 21px;
    margin-block-start: 37px;

    .summary-total-title {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.35;
      letter-spacing: normal;
      text-align: left;
      color: #373737;
    }

    .summary-total-price {
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      text-align: right;
      color: #373737;
    }
  }
  .summary-content-description {
    margin-block-start: 30px;
  }
}
</style>
