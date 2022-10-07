<template>
  <section>
    <loading-spinner v-if="loading"></loading-spinner>
    <products-list v-else :listing="listing"></products-list>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

import ProductsList from "@/components/ProductsList.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "StepsPage",
  components: {
    ProductsList,
    LoadingSpinner
  },
  computed: {
    ...mapGetters([
      "currentDate",
      "errors",
      "productsByCurrentStep",
      "loading"
    ]),
    listing() {
      return {
        label: this.trans("listing_label"),
        products: this.productsByCurrentStep
      };
    },
    isEmpty() {
      return _.isEmpty(this.listing.products);
    }
  }
};
</script>
