<template>
  <div class="d-flex justify-content-center product-list-navigation">
    <button
      role="button"
      class="btn btn-default product-list-navigation-button"
      @click="$emit('click')"
    >
      {{ trans("make_an_order") }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonNavigation"
};
</script>

<style lang="scss">
.product-list-navigation {
  margin-block-end: 100px;
  .product-list-navigation-button {
    width: 291px;
    height: 60px;
    background-color: #14171b;
    color: white;
  }
}
</style>
