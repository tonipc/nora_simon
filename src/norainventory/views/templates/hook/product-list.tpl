<section id="product-pack" class="my-5">
    <features-list :features="featuresToFilter"></features-list>

    <section v-if="!isEmpty" id="products">
      <div
        :class="[
          'row',
          currentMenuDetails.type === 'product_pack'
            ? 'product-packs-row'
            : 'product-cart-row',
          'products-row'
        ]"
      >
        <div
          v-for="(product, index) in listing.products"
          :key="index"
          class="col-md-3 mb-3"
          :data-id-product="product.id_product"
          :data-id-product-attribute="product.id_product_attribute"
          :class="[
            `product-${product.id_product}-attribute-${product.id_product_attribute}`,
            'product-row-item'
          ]"
        >
          <div
            class="card h-100 product-card"
            :class="isProductSelected(product) ? 'selected' : ''"
          >
            <product-features
              class="products-row-features"
              :features="getProductFeatures(product)"
            ></product-features>

            <div class="card-header product-card-header">
              <div
                class="d-flex justify-content-center product-image"
                role="button"
                @click="clickOpenProductModal(product)"
              >
                <img
                  v-if="product.cover"
                  :src="product.cover.bySize.home_default.url"
                  :alt="
                    !empty(product.cover.legend)
                      ? product.cover.legend
                      : trunc(product.name)
                  "
                  data-full-size-image-url="product.cover.large.url"
                  class="img-fluid"
                />
                <img
                  v-else
                  src="urls.no_picture_image.bySize.home_default.url"
                  class="img-fluid"
                />
              </div>
            </div>

            <div class="card-body product-card-body">
              <h2
                class="card-title h3 product-title product-card-title"
                role="button"
                @click="clickOpenProductModal(product)"
              >
                {{ trunc(product.name) }}
              </h2>
              <div class="card-text product-card-attributes">
                <product-attributes
                  :attributes="Object.values(product.attributes) || []"
                ></product-attributes>
              </div>

              <div
                v-if="product.show_price && !isProductPack"
                class="product-price-and-shipping"
              >
                <product-price :product="product"></product-price>
              </div>
            </div>

            <div class="card-footer product-card-footer">
              <div class="d-flex justify-content-center product-list-actions">
                <button-section
                  :product="product"
                  :disabled="disabled"
                  :quantity-in-cart="quantityInCart(product)"
                  :is-product-pack="currentMenuDetails.type === 'product_pack'"
                  :is-product-selected="isProductSelected(product)"
                  @add="clickAdd"
                  @remove="clickRemove"
                ></button-section>
              </div>
            </div>
          </div>

          <product-flags
            v-if="!isProductPack"
            :flags="getFlags(product.flags)"
          ></product-flags>
        </div>
      </div>

      <product-modal
        v-if="displayProductModal"
        :product="selectedProductModal"
        :disabled="disabled"
        :quantity-in-cart="quantityInCart(selectedProductModal)"
        :is-product-pack="currentMenuDetails.type === 'product_pack'"
        :is-product-selected="isProductSelected(selectedProductModal)"
        :features="getProductFeatures(selectedProductModal)"
        @close="closeProductModal()"
        @add="clickAdd($event)"
        @remove="clickRemove($event)"
      ></product-modal>
    </section>

    <button-navigation
      v-if="displayNavigationButton"
      @click="clickGoToNextStep()"
    ></button-navigation>
  </section>
