<template>
  <section class="d-flex justify-content-center features-list">
    <div
      v-for="(feature, index) in mappedFeatures"
      :key="index"
      :class="[
        `feature-${feature.id_feature}-value-${feature.id_feature_value}`,
        'feature-list-item'
      ]"
      :data-id-feature="feature.id_feature"
      :data-id-feature-value="feature.id_feature_value"
    >
      <div class="feature-list-item-name">
        {{ feature.name }}
      </div>
      <div class="d-flex align-items-center feature-list-item-value">
        <div class="rounded-circle feature-list-item-value-icon">
          {{ feature.initials }}
        </div>
        <div class="feature-list-item-value-text"></div>
        {{ feature.value }}
      </div>
    </div>
  </section>
</template>

<script>
import _ from "lodash";

export default {
  name: "FeaturesList",
  props: {
    features: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    mappedFeatures() {
      return _.map(this.features, f =>
        _.extend(f, {
          initials: f.value
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
        })
      );
    }
  }
};
</script>