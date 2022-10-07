<template>
  <section v-if="product && showPrices">
    <template v-if="product.has_discount">
      <span class="sr-only">{{ trans("regular_price") }}</span>
      <span class="regular-price">{{ product.regular_price }}</span>
      <span
        v-if="product.discount_percentage"
        class="discount-percentage discount-product"
      >
        {{ product.discount_percentage }}
      </span>
      <span v-else class="discount-amount discount-product">{{
        product.discount_amount_to_display
      }}</span>
    </template>

    <span class="sr-only">{{ trans("price") }}</span>
    <span class="price">{{ product.price }}</span>
  </section>
</template>

<script>

import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "ProductPrice",
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: { //Get the getters from idex.js
    ...mapGetters([
      "showPrices",
    ])
  }
};
</script>
