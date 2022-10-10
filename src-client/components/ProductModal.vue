<template>
  <transition name="modal" :css="false" @leave="leave">
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header product-modal-header">
            <button
              ref="buttonClose"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body product-modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="d-flex justify-content-center product-image">
                  <img
                    v-if="product.cover"
                    :src="product.cover.bySize.large_default.url"
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
                    src="urls.no_picture_image.bySize.large_default.url"
                    class="img-fluid"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <h2 class="card-title h3 product-modal-title">
                  {{ product.name }}
                </h2>
                <h3 class="h6 product-subtitle product-modal-subtitle">
                  {{ product.category_name }}
                </h3>
                <!-- eslint-disable -->
                <div
                  class="product-modal-description-short"
                  v-html="product.description_short"
                ></div>
                <div class = "nutritional_title"  v-if = "nutritionalInfo"> 
                     {{ trans("nutricionales_cien") }}
                </div>
                <div class = "valores_nutricionales" v-if = "nutritionalInfo" >
                  <div class = "nutritional">
                    <div class = "valor">
                      {{nutritionalInfo.values.calorias.toFixed(2)}}
                    </div>
                    <div class ="nutriTitle">
                       {{ trans("calorias") }}
                    </div>
                  </div>
                  <div class = "nutritional">
                    <div class = "valor">
                      {{nutritionalInfo.values.hidratos.toFixed(2)}}g
                    </div>
                    <div class ="nutriTitle">
                       {{ trans("hidratos") }}
                    </div>
                  </div>
                  <div class = "nutritional">
                    <div class = "valor">
                      {{nutritionalInfo.values.proteinas.toFixed(2)}}g
                    </div>
                    <div class ="nutriTitle">
                       {{ trans("proteina") }}
                    </div>
                  </div>
                  <div class = "nutritional">
                    <div class = "valor">
                      {{nutritionalInfo.values.grasas.toFixed(2)}}g
                    </div>
                    <div class ="nutriTitle">
                       {{ trans("grasas") }}
                    </div>
                  </div>
                   <div class = "nutritional">
                    <div class = "valor">
                      {{nutritionalInfo.values.grasas_saturadas.toFixed(2)}}g
                    </div>
                    <div class ="nutriTitle">
                       {{ trans("grasas_saturadas") }}
                    </div>
                  </div>
                  <div class = "nutritional">
                    <div class = "valor">
                      {{nutritionalInfo.values.hidratos.toFixed(2)}}g
                    </div>
                    <div class ="nutriTitle">
                       {{ trans("azucares") }}
                    </div>
                  </div>
                </div>
                <!-- eslint-enable -->
                <div class="product-modal-attributes">
                  <product-attributes
                    :attributes="attributes"
                  ></product-attributes>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 product-modal-features">
                <product-features :features="features"></product-features>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
          <div class="modal-footer product-modal-footer">
             <div class="col-md-6" v-if="product.quantity > 0">
                <button-section
                  :product="product"
                  :disabled="disabled"
                  :quantity-in-cart="quantityInCart"
                  :is-product-pack="isProductPack"
                  :is-product-selected="isProductSelected"
                  @add="clickAdd"
                  @remove="clickRemove"
                ></button-section>
              </div>
              <div class="col-md-6 out-of-stock" v-if="product.quantity <= 0">
                {{ trans("out_of_stock") }}
              </div>
             <div class="col-md-6">
              <div class = "trazas trazas-es">
               {{ trans("traces") }}
              </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from "lodash";
import ButtonSection from "@/components/ButtonSection";
import ProductFeatures from "@/components/ProductFeatures.vue";
import ProductAttributes from "@/components/ProductAttributes.vue";
import ajax from "@/common/ajax";

const { $, bowser } = window;

export default {
  name: "ProductModal",
  components: {
    ButtonSection,
    ProductFeatures,
    ProductAttributes
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isProductPack: {
      type: Boolean,
      default: false
    },
    isProductSelected: {
      type: Boolean,
      default: false
    },
    quantityInCart: {
      type: Number,
      default: 0
    },
    features: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    attributes() {
      return _.isEmpty(this.product.attributes)
        ? []
        : Object.values(this.product.attributes);
    }
  },
  asyncComputed: {
    nutritionalInfo() {

      const options = {
        action: "getValoresNutricionales",
        id: this.product.id
      };
      return ajax(this.$store.state.apiUrl, "GET", options);
    }
  },
  beforeMount: function() {
    this.isMobileSafari =
      typeof bowser !== "undefined" && bowser.mobile && bowser.safari;

    if (this.isMobileSafari) {
      this.originalScrollPosition = $(window).scrollTop();
    }
  },
  mounted: function() {
    // Immediately call out to the Bootstrap modal and tell it to show itself.
    window.$(this.$el).modal({
      // Set the modal backdrop to the 'static' option, which means it doesn't close the modal
      // when clicked.
      backdrop: "static",
      show: true
    });

    window.$(this.$el).on("hide.bs.modal", () => {
      // Undo any mobile safari workarounds we may have added.
      // (i.e. shed the wackiness)
      if (this.isMobileSafari) {
        // Remove style overrides on our modal dialog.
        window.$(this.$el).css({
          "overflow-y": "",
          position: "",
          left: "",
          top: ""
        });

        // Beckon to our siblings so they come out of hiding
        this.$get()
          .parent()
          .children()
          .not(this.$el)
          .css({
            display: ""
          });

        // Scroll to our original position when the modal was summoned.
        window.scrollTo(0, this.originalScrollPosition);
      } //ﬁ

      this._bsModalIsAnimatingOut = true;
      this.$emit("close");
    }); //œ

     window.$(this.$el).on("shown.bs.modal", () => {
      // If this is mobile safari, let's get wacky.
      if (this.isMobileSafari) {
        // Scroll to the top of the page.
        window.scrollTo(0, 0);
        this.$get()
          .parent()
          .children()
          .not(this.$el)
          .css({
            display: "none"
          });

        window.$(this.$el).css({
          "overflow-y": "auto!important",
          position: "absolute",
          left: "0",
          top: "0"
        });
      } //ﬁ

      // Focus our "focus-first" field, if relevant.
      // (but not on mobile, because it can get weird)
      if (
        typeof bowser !== "undefined" &&
        !bowser.mobile &&
        this.$find("[focus-first]").length > 0
      ) {
        this.$focus("[focus-first]");
      }

      this.$emit("opened");
      window.$(this.$el).off("shown.bs.modal");
    }); //ƒ

  },
  methods: {
    clickAdd(product) {
      if (this.isProductPack) {
        // Close modal
        this.$refs.buttonClose.click();
      }

      // Add item to the basket
      this.$emit("add", product);
    },
    clickRemove(product) {
      this.$emit("remove", product);
    },
    leave: function(el, done) {
      if (!this._bsModalIsAnimatingOut) {
        window.$(this.$el).modal("hide");
      } //ﬁ

      window.$(this.$el).on("hidden.bs.modal", () => {
        window.$(this.$el).off("hide.bs.modal");
        window.$(this.$el).off("hidden.bs.modal");
        window.$(this.$el).off("shown.bs.modal");
        done();
      }); //_∏_
    },
    trunc(str) {
      return _.truncate(str, {
        length: 30,
        separator: "..."
      });
    },
    empty(str) {
      return _.isUndefined(str) || _.isNull(str) || !str;
    }
  }
};
</script>

<style lang="scss">
#productModal {
  .product-modal-header {
    border-bottom: none;
  }

  .product-modal-body {
    .product-modal-title {
      font-size: 30px;
    }

    .product-modal-description-short {
      margin-block-start: 36px;
    }
  }

  .product-modal-footer {
    border-top: none;
    text-align: left;
  }

  .display-add-item {
    display: flex !important;
    justify-content: flex-start !important;
  }
}
</style>
