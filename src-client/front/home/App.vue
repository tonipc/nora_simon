<template>
  <div class="homepage-content">
    <homepage-modal v-if="modalView" :page-title="pageTitle"></homepage-modal>
    <homepage-content v-else :page-title="pageTitle"></homepage-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import HomepageModal from "@/components/HomepageModal.vue";
import HomepageContent from "@/components/HomepageContent.vue";

export default {
  components: { HomepageModal, HomepageContent },
  computed: mapGetters(["modalView", "pageTitle"])
};
</script>

<style lang="scss">
.d-flex {
  display: flex !important;
}

.justify-content-center {
  justify-content: center !important;
}

.homepage-content {
  .features-list {
    margin-block-start: 50px;
    margin-block-end: 50px;
  }


  .homepage-title {
    max-width: 600px;
    margin-inline: auto;
    text-align: center;
  }

  .homepage-header {
    border-bottom: none;
  }

  .homepage-body {
    .products-row {
      margin-block-end: 0;
      .product-row-item {
        .product-card {
          margin-block-end: 0;
          padding-block-end: 0 !important;
          .product-card-title {
            min-height: 51px;
          }
        }
        .products-row-features {
          .product-homepage-feature {
            margin-block: 0;
          }
        }
        .product-list-actions {
          display: none !important;
        }
      }
    }
  }

  .homepage-footer {
    border-top: none;
    .summary-footer-button {
      margin-block-start: 0;
      width: 200px;
      height: 40px;
    }

    .summary-footer-button--more {
      background-color: white;
      color: #14171b;
    }
  }
}
</style>
