<template>
  <div v-cloak class="row stepper-horizontal">
    <div class="col-md-12">
      <div class="stepper">
        <div
          v-for="step in visibleSteps"
          :key="step.id"
          :class="getClass(step)"
          class="stepper-item"
        >
          <div
            role="button"
            class="stepper-item-button"
            @click="onClick(step.id)"
          >
            <div class="circle stepper-item-button-icon">
              <template v-if="step.icon">
                <i :class="['mdi', 'mdi-' + step.icon]"></i>
              </template>
              <template v-else-if="step.text">
                <span>{{ step.text }}</span>
              </template>
            </div>
            <div class="label stepper-item-button-text">
              {{ step.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "HorizontalStepper",
  props: {
    /**
     * @example [
     *   { id: 1, icon?: 'food', text?: "1", class?="warning" label: "Menu" }
     * ]
     */
    steps: {
      type: Array,
      default: () => []
    },

    value: {
      type: Number,
      required: true
    },

    hideSteps: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      "currentStep",
      "currentOptionSteps",
      "currentMenuOptionStepIds",
      "lastStep",
      "basket"
    ]),
    visibleSteps() {
      if (this.hideSteps) {
        let index = 1;
        const filtered = _.filter(
          this.steps,
          step =>
            _.includes(this.currentMenuOptionStepIds, step.id) ||
            step.id === this.lastStep.id
        );

        _.each(filtered, step => {
          step.text = String(index);

          // Add max quantity for each step
          step.quantity = Number(
            _.result(
              _.find(this.currentOptionSteps, s => s.id === step.id),
              "quantity"
            )
          );

          // Include checked icon for completed step
          const stepDetail = _.find(
            this.currentOptionSteps,
            s => s.id === step.id
          );
          if (
            !this.canAddMoreProductsByStep(stepDetail, this.basket) &&
            step.quantity > 0
          ) {
            step.icon = "check";
          } else {
            step.icon = undefined;
          }

          index++;
        });

        return filtered;
      }

      return this.steps;
    }
  },
  watch: {
    currentStep(curr) {
      if (curr && !_.includes(this.currentMenuOptionStepIds, curr)) {
        this.$emit("input", this.getNextStep(curr));
      } else {
        this.$emit("input", curr);
      }
    }
  },
  mounted() {
    if (!_.includes(this.currentMenuOptionStepIds, this.value)) {
      this.$emit("input", this.getNextStep(this.value));
    }
  },
  methods: {
    canAddMoreProductsByStep(step, basket) {
      if (_.isUndefined(step) || _.isUndefined(step.quantity)) {
        return true;
      }

      const maxQuantity = Number(step.quantity);
      const productsInThisStep = _.reduce(
        basket,
        (prev, curr) =>
          prev + (curr.id_step === step.id ? Number(curr.quantity) : 0),
        0
      );

      return productsInThisStep < maxQuantity;
    },
    getClass(step) {
      // When all steps visible, mark unavailable steps with warning
      if (
        step.id &&
        !_.includes(this.currentMenuOptionStepIds, step.id) &&
        step.id !== this.lastStep.id
      ) {
        return "warning";
      }

      // Marke current step as active
      if (this.value === step.id) {
        return "active";
      }

      // Mark fulfilled steps as completed
      if (
        !this.canAddMoreProductsByStep(
          _.find(this.currentOptionSteps, s => s.id),
          this.basket
        ) &&
        this.lastStep.id !== step.id &&
        step.quantity
      ) {
        return "completed";
      }
    },
    getNextStep(value) {
      const index = _.findIndex(this.steps, s => s.id === value);
      return _.result(this.steps[index + 1], "id");
    },
    onClick(id) {
      this.$emit("input", id);
    }
  }
};
</script>

<style lang="scss">
.stepper-horizontal {
  .primary-color {
    background-color: #4285f4 !important;
  }

  .success-color {
    background-color: #066b17 !important;
  }

  .danger-color {
    background-color: #ff3547 !important;
  }

  $--stepper-black: #14171b !default;
  $--stepper-gray: #cecece !default;
  $--stepper-white: #fff !default;
  $--stepper-circle-size: 2.813rem !default;
  $--stepper-font-size: 1.5rem !default;

  .stepper {
    padding: 0 1.5rem;
    padding: 1.5rem;
    margin: 1em -1.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    counter-reset: section;
    position: relative;
    display: flex;
    justify-content: space-between;
    .stepper-item {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      transition: 0.5s;
      .stepper-item-button {
        padding: 1.5rem;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
        .circle {
          display: inline-block;
          width: $--stepper-circle-size;
          height: $--stepper-circle-size;
          margin-right: 0.5rem;
          line-height: 2.313rem;
          color: $--stepper-gray;
          text-align: center;
          background: transparent;
          border: 2px solid $--stepper-gray;
          border-radius: 50%;
          font-size: $--stepper-font-size;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
        }
        .label {
          display: inline-block;
          color: rgba(0, 0, 0, 0.38);
          margin-top: 0.63rem;
        }
      }
      &.active {
        .stepper-item-button {
          .circle {
            color: $--stepper-white;
            background-color: $--stepper-black;
            border: 2px solid $--stepper-black;
          }
          .label {
            font-weight: 600;
            color: $--stepper-black;
          }
        }
      }
      &.completed {
        .stepper-item-button {
          .circle {
            color: $--stepper-white;
            background-color: $--stepper-black;
          }
          .label {
            font-weight: 600;
            color: $--stepper-black;
          }
        }
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      &:not(:last-child) {
        &:after {
          position: relative;
          flex: 1;
          height: 1px;
          margin: 0.5rem 0 0 0;
          content: "";
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
      &:not(:first-child) {
        &:before {
          position: relative;
          flex: 1;
          height: 1px;
          margin: 0.5rem 0 0 0;
          content: "";
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  @media (max-width: 47.9375rem) {
    .stepper {
      flex-direction: column;
      .stepper-item {
        flex-direction: column;
        align-items: flex-start;
        .stepper-item-button {
          .label {
            flex-flow: column nowrap;
            order: 2;
            margin-top: 0.2rem;
          }
          &:not(:last-child) {
            &:after {
              position: absolute;
              top: 3.75rem;
              left: 2.19rem;
              width: 1px;
              height: calc(100% - 40px);
              content: "";
            }
          }
        }
      }
    }
  }

  .stepper > li:not(:last-of-type) {
    margin-bottom: 0 !important;
  }
}
</style>
