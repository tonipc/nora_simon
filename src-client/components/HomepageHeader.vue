<template>
  <div v-if="pageTitle" class="homepage-header">
    <h5 id="staticBackdropLabel" class="modal-title homepage-title">
      {{ pageTitle }}
    </h5>
  </div>
</template>

<script>
export default {
  name: "HomepageHeader",
  props: {
    pageTitle: {
      type: String,
      default: ""
    }
  }
};
</script>
