<template>
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner"
};
</script>

<style scoped>
@-webkit-keyframes spinner-border {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner-border {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: 0.75s linear infinite spinner-border;
  animation: 0.75s linear infinite spinner-border;
}
</style>
