<template>
  <ul v-if="flags" class="product-flags">
    <li
      v-for="(flag, f) in flags"
      :key="f"
      :class="['product-flag', flag.type || '']"
    >
      {{ flag.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProductFlags",
  props: {
    flags: {
      type: Array,
      default: () => {}
    }
  }
};
</script>
