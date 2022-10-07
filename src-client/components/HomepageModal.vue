<template>
  <section id="homepage-modal">
    <button
      ref="buttonOpenHomeModal"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#staticBackdrop"
    >
      Launch static backdrop modal {{ currentDate }}
    </button>

    <!-- Modal -->
    <div
      id="staticBackdrop"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content homepage-content">
          <div class="modal-header">
            <button
              ref="homepageModalClose"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <homepage-header :page-title="pageTitle"></homepage-header>
            <homepage-content></homepage-content>
          </div>
          <div class="modal-footer">
            <homepage-footer></homepage-footer>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Button trigger modal -->
</template>

<script>
import HomepageContent from "@/components/HomepageContent.vue";
import HomepageHeader from "@/components/HomepageHeader.vue";
import HomepageFooter from "@/components/HomepageFooter.vue";

export default {
  name: "HomepageModal",
  components: {
    HomepageHeader,
    HomepageContent,
    HomepageFooter
  },
  props: {
    pageTitle: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.$refs.buttonOpenHomeModal.click();
  }
};
</script>

<style lang="scss">
#homepage-modal {
  .homepage-header {
    border-bottom: none;
  }

  .homepage-footer {
    border-top: none;
  }
  @media (min-width: 1200px) {
    .modal-xl {
      max-width: 1140px;
    }
  }
}
</style>
