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
