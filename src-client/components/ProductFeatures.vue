<template>
  <section class="product-features">
    <div
      v-for="feature in features"
      :key="feature.id"
      :class="[
        `feature-${feature.id}`,
        'features-list',
        'product-modal-feature'
      ]"
    >
      <h3 class="product-modal-feature-title">
        {{ feature.name }}
      </h3>
      <div class="product-modal-feature-values">
        <div
          v-for="value in feature.values"
          :key="value.id"
          :class="[
            'd-flex',
            'flex-column',
            'align-items-center',
            `feature-${feature.id}-value-${value.id}`,
            'product-modal-feature-value'
          ]"
        >
          <div
            :class="[
              'd-flex',
              'justify-content-center',
              'align-items-center',
              'feature-list-item-value-icon',
              'product-modal-feature-value-icon',
              `icon-feature-${feature.id}-value-${value.id}`
            ]"
          >
            {{ getInitials(value.name) }}
          </div>
          <div
            class="product-modal-feature-value-text"
            v-text="value.name"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductFeatures",
  props: {
    features: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getInitials(text) {
      return text
        .split(" ")
        .map(t => t.charAt(0))
        .join("")
        .toUpperCase();
    }
  }
};
</script>

<style lang="scss">
.product-modal-feature-values {
  display: flex;
  gap: 18px;
  margin: 0;
  .product-modal-feature-value {
    .product-modal-feature-value-icon {
      border: 1px solid #14171b;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .product-modal-feature-value-text {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 3.47;
      letter-spacing: normal;
      text-align: center;
      color: #14171b;
    }
  }
}
</style>
