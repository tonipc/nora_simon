<template>
  <section>
    <div
      v-for="(attribute, index) in attributes"
      :key="index"
      class="product-modal-attribute"
    >
      <strong class="attribute-group-name">{{ attribute.group }}</strong>
      :
      <span class="attribute-name">{{ attribute.name }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductAttributes",
  props: {
    attributes: {
      type: Array,
      default: () => []
    }
  }
};
</script>
