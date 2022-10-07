<template>
  <section class="product-buttons">
    <div v-if="isProductPack" class="display-select-item">
      <button
        class="btn btn-dark mt-1"
        :disabled="disabled"
        @click="clickAdd(product)"
      >
        <div v-if="isProductSelected">
          <div class="product-button-selected-info">
            {{ trans("selected_product") }} (x{{ quantityInCart }})
          </div>
        </div>
        <div v-else class="product-button-select">
          {{ trans("select_product") }}
        </div>
      </button>
      <div v-if="isProductSelected" class="product-button-selected-delete">
        <button class="btn btn-link text-danger">
          <span
            class="mdi mdi-24px mdi-delete-circle"
            @click="clickRemove(product)"
          ></span>
        </button>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center display-add-item">
      <div
        class="a-la-carte-icon a-la-carte-minus d-flex align-items-center"
        role="button"
        @click="clickRemove(product)"
      >
        <span class="material-icons">remove_circle</span>
      </div>
      <div class="a-la-carte-number">
        {{ quantityInCart }}
      </div>
      <div
        class="a-la-carte-icon a-la-carte-plus d-flex align-items-center"
        role="button"
        @click="clickAdd(product)"
      >
        <span class="material-icons">add_circle</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ButtonsSection",
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    quantityInCart: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isProductPack: {
      type: Boolean,
      default: true
    },
    isProductSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickAdd(product) {
      this.$emit("add", product);
    },
    clickRemove(product) {
      this.$emit("remove", product);
    }
  }
};
</script>

<style lang="scss">
.product-button-selected-delete {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
