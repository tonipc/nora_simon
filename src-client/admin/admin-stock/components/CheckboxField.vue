<template>
  <div class="form-group">
    <div class="d-flex justify-content-between">
      <div>
        <span
          role="button"
          :class="[
            'mdi',
            'mdi-check-circle',
            'mdi-18px',
            value === 1 ? 'text-success' : ''
          ]"
          @click="$emit('input', 1)"
        ></span>
      </div>
      <div>
        <span
          role="button"
          :class="[
            'mdi',
            'mdi-close-circle',
            'mdi-18px',
            value === 0 ? 'text-danger' : ''
          ]"
          @click="$emit('input', 0)"
        ></span>
      </div>
      <div>
        <span
          role="button"
          class="mdi mdi-filter-off mdi-18px"
          @click="$emit('input', null)"
        ></span>
      </div>
    </div class="d-flex justify-content-between">
  </div>
</template>

<script>
export default {
  name: "CheckboxField",
  props: ["value"]
};
</script>

<style lang="scss">
[role="button"] {
  cursor: pointer;
}
.form-group {
  min-height: 31px;
}
</style>
