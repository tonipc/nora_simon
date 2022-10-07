<template>
  <div class="d-flex justify-content-around my-5 horizontal-buttons">
    <div v-for="item in items" :key="item.id">
      <button
        type="button"
        :class="[
          'btn',
          'btn-outline-dark',
          getButtonSize(),
          item.id === value ? 'active' : ''
        ]"
        @click="$emit('input', item.id)"
      >
        <slot :item="item">
          {{ item.label }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalButtons",
  props: {
    items: {
      type: Array,
      default: () => []
    },

    buttonSize: {
      type: String,
      default: ""
    },

    value: {
      type: Number,
      required: true
    },

    colorStyle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    getButtonSize() {
      switch (this.buttonSize) {
        case "large":
          return "btn-lg";
        case "small":
          return "btn-sm";
        default:
          return "";
      }
    }
  }
};
</script>
