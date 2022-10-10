<template>
  <div class="mr-1 summary-quantity">
    <div class="summary-quantity-content">
      <div class="summary-quantity-left">
        <label for="menuQuantity" class="summary-quantity-label">{{
          trans("quantity")
        }}</label>
      </div>
      <div class="summary-quantity-right">
        <select
          v-if="inputType === 'select'"
          id="menuQuantity"
          name="quantity"
          class="summary-quantity-select"
          @input="$emit('input', Number($event.target.value))"
        >
          <option v-for="qty in selectOptions" :key="qty" :value="qty">
            {{ qty }}
          </option>
        </select>
        <div
          v-else-if="inputType === 'number'"
          class="grid-area summary-quantity-input-group"
        >
          <input
            id="menuQuantity"
            type="number"
            class="grid-area--left summary-quantity-input"
            :value="value"
            @input="$emit('input', Number($event.target.value))"
          />
          <button
            class="grid-area--up summary-quantity-button"
            @click="clickAddQuantity"
          >
            <span class="mdi mdi-chevron-up"></span>
          </button>
          <button
            class="grid-area--down summary-quantity-button"
            @click="clickRemoveQuantity"
          >
            <span class="mdi mdi-chevron-down"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "SummaryQuantity",
  props: {
    inputType: {
      type: String,
      default: "number" // 'number' | 'select'
    },
    selectOptions: {
      type: Array,
      default: () => _.range(1, 10)
    },
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    clickAddQuantity() {
      this.$emit("input", this.value + 1);
    },
    
    clickRemoveQuantity() {
      this.$emit("input", this.value > 0 ? this.value - 1 : 0);
    }
  }
};
</script>

<style lang="scss">
.summary-quantity {
  display: flex;
  justify-content: flex-end;
  margin-block-start: 20px;
  .summary-quantity-content {
    width: 265px;
    height: 56px;
    padding-block-start: 12px;
    padding-block-end: 12px;
    padding-inline-start: 12px;
    padding-inline-end: 12px;
    border-radius: 4px;
    border: solid 1px #14171b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .summary-quantity-left {
      align-self: center;
      .summary-quantity-label {
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        text-align: left;
        color: #14171b;
        margin: 0;
      }
    }
    .summary-quantity-right {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.6;
      letter-spacing: normal;
      text-align: left;
      color: #14171b;
      align-self: center;
      .summary-quantity-input {
        border: none;
        width: 50px;
        text-align: center;
      }
      .summary-quantity-select {
        border: none;
        width: 50px;
      }
      .summary-quantity-input-group {
        margin: 0;
        .summary-quantity-button {
          background-color: transparent;
          border: none;
        }
      }
      .grid-area {
        display: grid;
        grid-template-areas:
          "left up"
          "left down";
        .grid-area--left {
          grid-area: left;
        }
        .grid-area--up {
          grid-area: up;
        }
        .grid-area--down {
          grid-area: down;
        }
      }
    }
  }
}
</style>
