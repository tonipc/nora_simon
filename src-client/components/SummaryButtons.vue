<template>
  <section class="summary-footer">
    <template v-if="twoButtons">
      <div class="d-flex justify-content-center summary-two-buttons">
        <div class="summary-two-buttons-more">
          <button
            class="btn btn-primary summary-footer-button summary-footer-button--more"
            role="button"
            :disabled="loading || busy"
            @click="$emit('add-more-products')"
          >
            <span
              v-if="busy"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            {{ moreLabel }}
          </button>
        </div>
        <div class="summary-two-buttons-order">
          <button
            class="btn btn-primary summary-footer-button summary-footer-button--add"
            role="button"
            :disabled="loading || busy"
            @click="$emit('add-to-cart')"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            {{ continueLabel }}
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="d-flex flex-row-reverse">
        <div class="mr-1 summary-footer-buttons">
          <button
            class="btn btn-primary summary-footer-button summary-footer-button--add"
            role="button"
            :disabled="loading || busy"
            @click="$emit('add-to-cart')"
          >
            <span
              v-if="loading || busy"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            {{ trans("add_to_cart") }}
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: "SummaryButtons",
  props: {
    moreLabel: {
      type: String,
      default: ""
    },
    continueLabel: {
      type: String,
      default: ""
    },
    busy: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    twoButtons: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
$spinner-width: 2rem;
$spinner-height: $spinner-width;
$spinner-border-width: 0.25em;

$spinner-width-sm: 1rem;
$spinner-height-sm: $spinner-width-sm;
$spinner-border-width-sm: 0.2em;

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.spinner-border {
  display: inline-block;
  width: $spinner-width;
  height: $spinner-height;
  vertical-align: text-bottom;
  border: $spinner-border-width solid currentColor;
  border-right-color: transparent;
  // stylelint-disable-next-line property-disallowed-list
  border-radius: 50%;
  animation: 0.75s linear infinite spinner-border;
}

.spinner-border-sm {
  width: $spinner-width-sm;
  height: $spinner-height-sm;
  border-width: $spinner-border-width-sm;
}

.summary-footer {
  margin-block-start: 69px;
  .summary-footer-button {
    width: 300px;
    height: 60px;
    box-shadow: none;
  }

  .summary-footer-button--add {
    border: solid 1px #707070;
    background-color: #14171b;
    color: white;
  }

  .summary-footer-button--more {
    border: solid 1px #14171b;
  }

  .summary-two-buttons {
    gap: 25px;
  }
}
</style>
