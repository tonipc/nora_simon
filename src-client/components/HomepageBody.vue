<template>
  <div class="homepage-body">
    <products-list
      roducts-list
      :listing="listing"
      :show-description="true"
    ></products-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsList from "@/components/ProductsList.vue";

export default {
  name: "HomepageBody",
  components: {
    ProductsList
  },
  computed: {
    ...mapGetters(["products"]),
    listing() {
      return {
        label: "",
        products: this.products
      };
    }
  }
};
</script>
