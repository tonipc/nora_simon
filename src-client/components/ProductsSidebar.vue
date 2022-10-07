<template>
  <div id="extras">
    <div>
      <strong>Extras:</strong>
      <span v-for="(article, index) in basketFormatted" :key="index">
        ({{ article.quantity }}) {{ article.name }}
      </span>
      <button class="btn btn-outline-secondary btn-edit-extras" @click="toggle">
        {{ trans("edit") }}
      </button>
    </div>
    <simple-drawer
      v-if="open"
      align="right"
      :closeable="true"
      @close="clickCancel()"
    >
      <div class="content">
        <!-- eslint-disable -->
        <div class="title" v-html="lastStep.description_short"></div>
        <div class="description" v-html="lastStep.description"></div>
        <!-- eslint-enable -->
        <horizontal-buttons
          key="categories"
          v-model="currentCategory"
          :items="mappedCategories"
        ></horizontal-buttons>

        <div class="products">
          <div class="products_container_popup">
            <template v-for="(product, index) in mappedProducts">
              <div :key="product.id" class="row">
                <div class="col-xs-3 col-md-3">
                  <img
                    v-if="product.cover"
                    :src="product.cover.bySize.small_default.url"
                    :alt="
                      !empty(product.cover.legend)
                        ? product.cover.legend
                        : trunc(product.name)
                    "
                  />
                  <img
                    v-else
                    src="urls.no_picture_image.bySize.small_default.url"
                  />
                </div>
                <div class="col-xs-9 col-md-9">
                  <div class="row">
                    <div class="col-xs-8 col-md-8">
                      <h5 class="mt-0 product-name">
                        {{ product.name }}
                      </h5>
                      <h4 class="mt-0 product-price" v-if="showPrices">
                        {{ product.price }}
                      </h4>
                    </div>
                    <div class="col-xs-4 col-md-4 add-quantity-buttons">
                      <span
                        role="button"
                        class="mdi mdi-minus-circle"
                        @click="clickDecreaseExtra(product)"
                      ></span>
                      <span>{{ getExtraProductQuantity(product) }}</span>
                      <span
                        role="button"
                        class="mdi mdi-plus-circle"
                        @click="clickIncreaseExtra(product)"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div :key="`line-${index}`" class="line"></div>
            </template>
          </div>
          <div class="d-flex flex-column buttons-lateral-popup">
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-lg btn-outline-secondary btn-confirm"
                @click="clickConfirm()"
              >
                {{ trans("button_extra_confirm") }}
              </button>
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn btn-light btn-cancel" @click="clickCancel()">
                {{ trans("button_extra_cancel") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </simple-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SimpleDrawer from "vue-simple-drawer";

import HorizontalButtons from "@/components/HorizontalButtons";
import _ from "lodash";

export default {
  name: "ProductsSidebar",
  components: {
    HorizontalButtons,
    SimpleDrawer
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: true,
      currentCategory: 0,
      extraBasket: []
    };
  },
  computed: {
    ...mapGetters(["basket", "currentDate", "lastStep", "categories", "showPrices"]),
    basketFormatted() {
      return _.map(this.extraBasket, item => {
        const name = _.result(
          _.find(this.categories, cat => {
            const idCategoryDefault = _.result(
              _.find(
                this.products,
                prod => String(prod.id) === String(item.id_product)
              ),
              "id_category_default"
            );

            return String(cat.id_category) === String(idCategoryDefault);
          }),
          "name"
        );

        return {
          quantity: item.quantity,
          name
        };
      });
    },
    mappedCategories() {
      const mapped = _.map(this.categories, cat => ({
        id: Number(cat.id_category),
        label: cat.name
      }));

      return _.filter(mapped, cat =>
        _.includes(this.lastStep.categories, String(cat.id))
      );
    },
    isEmpty() {
      return _.isEmpty(this.basket);
    },
    urls() {
      return window.prestashop.urls;
    },
    mappedProducts() {
      return _.filter(
        this.products,
        p => String(this.currentCategory) === String(p.id_category_default)
      );
    }
  },
  watch: {
    value(val) {
      this.extraBasket = val;
    },
    extraBasket(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    this.extraBasket = this.value;

    this.currentCategory = Number(
      _.result(_.first(this.mappedCategories), "id")
    );
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    empty(str) {
      return _.isUndefined(str) || _.isNull(str) || !str;
    },
    trunc(str) {
      return _.truncate(str, {
        length: 30,
        separator: "..."
      });
    },
    getExtraProductQuantity(product) {
      return (
        _.result(
          _.find(
            this.extraBasket,
            p =>
              p.id_product === product.id &&
              p.id_product_attribute === product.id_product_attribute &&
              p.date === this.currentDate
          ),
          "quantity"
        ) || 0
      );
    },
    clickCancel() {
      this.extraBasket = [];
      this.toggle();
    },
    clickConfirm() {
      this.$emit("input", this.extraBasket);
      this.toggle();
    },
    clickIncreaseExtra(product) {
      this.updateExtraProducts(
        {
          id_product: product.id,
          id_product_attribute: product.id_product_attribute,
          price_amount: product.price_amount
        },
        1
      );
    },
    clickDecreaseExtra(product) {
      this.updateExtraProducts(
        {
          id_product: product.id,
          id_product_attribute: product.id_product_attribute,
          price_amount: product.price_amount
        },
        -1
      );
    },
    /**
     * @param {object} product
     * @param {number} delta +1 / -1
     */
    updateExtraProducts(product, delta) {
      const index = _.findIndex(
        this.extraBasket,
        p =>
          p.id_product === product.id_product &&
          p.id_product_attribute === product.id_product_attribute &&
          p.date === this.currentDate
      );

      if (index > -1) {
        if (delta === 1) {
          this.extraBasket[index].quantity++;
        } else if (this.extraBasket[index].quantity > 0) {
          this.extraBasket[index].quantity--;
        }

        if (this.extraBasket[index].quantity === 0) {
          _.remove(this.extraBasket, {
            id_product: product.id_product,
            id_product_attribute: product.id_product_attribute,
            date: this.currentDate
          });
        }
      } else {
        if (delta === 1) {
          this.extraBasket.push({
            id_product: product.id_product,
            id_product_attribute: product.id_product_attribute,
            price_amount: product.price_amount,
            quantity: 1,
            date: this.currentDate
          });
        }
      }
    }
  }
};
</script>

<style lang="scss">
#extras {
  $--simple-drawer-bg-color: white !important;
  $--simple-drawer-fg-color: white !important;
  $--simple-drawer-softorange: #373737;
  $--simple-drawer-tomatored: #373737;
  @import "~vue-simple-drawer/src/_index.scss";

  .vue-simple-drawer {
    .content {
      width: 441px;
      height: 100vh;
      margin: 0;
      padding: 91px 17px 69px 12px;
      background-color: #ffffff;
      .title p {
        width: 322px;
        height: 96px;
        margin: 0 68px 22.7px 18px;
        font-family: CormorantGaramond;
        font-size: 35px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: #14171b;
      }
      .description p {
        width: 354px;
        height: 74px;
        margin: 22.7px 33.5px 23.3px 20.5px;
        opacity: 0.75;
        font-family: OpenSans;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.63;
        letter-spacing: normal;
        text-align: left;
        color: #373737;
      }
      .products {
        margin-block-start: 60px;
        display: flex;
        flex-direction: column;
        gap: 17px;
        color: #333;
        .line {
          width: 381px;
          height: 0;
          margin: 24px 5px 0 0;
          opacity: 0.25;
          border: solid 1px #707070;
          &:last-child {
            display: none;
          }
        }
        .add-quantity-buttons {
          font-size: 20px;
        }
        .product-name {
          color: #14171b;
        }
        .product-price {
          color: #5e5e5e;
        }
        .btn-confirm {
          text-transform: uppercase;
          border: solid 1px #14171b;
          padding-block-start: 18px;
          padding-block-end: 18px;
          padding-inline-start: 97px;
          padding-inline-end: 97px;
          border-radius: 0px;
        }
        .btn-cancel {
          background-color: transparent;
          border: none;
          margin-block-start: 23px;
        }
      }
    }
  }

  .btn-edit-extras {
    border: none;
    text-decoration: underline;
    &:hover {
      background-color: transparent;
      color: inherit;
    }
  }
}
</style>
