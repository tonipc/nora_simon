<template>
  <div class = "container">
    <div class="card homepage-content">
      <div class="card-body">
        <homepage-header
          class="card-title"
          :page-title="pageTitle"
        ></homepage-header>
        <homepage-body></homepage-body>
        <homepage-footer></homepage-footer>
      </div>
    </div>
  </div>
</template>

<script>
import HomepageBody from "@/components/HomepageBody.vue";
import HomepageHeader from "@/components/HomepageHeader.vue";
import HomepageFooter from "@/components/HomepageFooter.vue";

export default {
  name: "HomepageContent",
  components: {
    HomepageHeader,
    HomepageBody,
    HomepageFooter
  },
  props: {
    pageTitle: {
      type: String,
      default: ""
    }
  }
};
</script>
