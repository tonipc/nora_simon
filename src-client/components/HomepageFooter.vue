<template>
  <summary-buttons
    class="homepage-footer"
    :busy="busy"
    :loading="loading"
    :continue-label="trans('order_default_menu')"
    :more-label="trans('see_more')"
    :two-buttons="summarySettings.twoButtons"
    @add-to-cart="clickAddToCart"
    @add-more-products="clickMoreInfo"
  />
</template>

<script>
import { mapGetters } from "vuex";
import SummaryButtons from "@/components/SummaryButtons.vue";
import AsyncComputed from 'vue-async-computed'

export default {
  name: "HomepageFooter",
  components: {
    SummaryButtons
  },
  data() {
    return {
      busy: false, // Left button
      loading: false, // Right button
      quantity: 1
    };
  },
  computed: {
    ...mapGetters([
      "basket",
      "currentDate",
      "currentMenu",
      "currentMenuDetails",
      "summarySettings",
      "urls"
    ])
  },
  methods: {
    async addMainProductsToCart() {
      // Add standard products to the cart
      const productsData = [];

      this.basket.forEach(prod => {
        productsData.push([
          prod.quantity,
          prod.id_product,
          prod.id_product_attribute
        ]);
      });

      await this.$store.dispatch("createProductPack", {
        product_info: productsData,
        date: this.currentDate,
        id_product_step_pack: this.currentMenu,
        name: this.currentMenuDetails.label,
        quantity: this.quantity
      });
    },
    async clickAddToCart() {
      try {
        this.loading = true;
        await this.addMainProductsToCart();
      } catch (error) {
        console.error(error);
      } finally {
        this.redirectToController();
      }
    },
    clickMoreInfo() {
      // this.$refs.homepageModalClose.click();
      window.location = this.urls.packsUrl;
    },
    redirectToController() {
      const { cartUrl, orderUrl, isEmptyCart } = this.summarySettings;

      if (isEmptyCart) {
        window.location = orderUrl;
      } else {
        window.location = cartUrl;
      }
    }
  }
};
</script>
