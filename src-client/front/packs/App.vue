<template>
  <div id="app">
    <date-selector
      v-if="displayDateSelectorInCurrentStep"
      v-model="currentDate"
      :available-dates="dates"
      :button-text="trans('change_day')"
      :title-text="trans('order_for')"
    ></date-selector>

    <horizontal-stepper
      v-if="displayStepSelectorInCurrentStep"
      key="steps"
      v-model="currentStep"
      class="horizontal-buttons--steps"
      :steps="steps"
    ></horizontal-stepper>

    <horizontal-buttons
      v-if="displayMenuSelectorInCurrentStep"
      key="menus"
      v-model="currentMenu"
      class="horizontal-buttons--menus"
      :items="menus"
      button-size="large"
    ></horizontal-buttons>

    <horizontal-buttons
      v-if="displayOptionSelectorInCurrentStep"
      key="options"
      v-model="currentOption"
      class="horizontal-buttons--options"
      :items="options"
      button-size="large"
    >
      <template v-slot="{ item }">
        <div class="d-flex flex-column">
          <div v-if="(item.type === 'product_pack') && showPrices">
            {{ item.price }}
          </div>
          <div>{{ item.label }}</div>
        </div>
      </template>
    </horizontal-buttons>

    <hr v-if="displaySeparatorInCurrentStep" class="summary-separator" />

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import DateSelector from "@/components/DateSelector.vue";
import HorizontalStepper from "@/components/HorizontalStepper.vue";
import HorizontalButtons from "@/components/HorizontalButtons.vue";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "App",
  components: {
    DateSelector,
    HorizontalStepper,
    HorizontalButtons
  },
  data() {
    return {
      currentDate: "",
      currentMenu: 0,
      currentOption: 0
    };
  },
  computed: {
    ...mapGetters([
      "currentMenuDetails",
      "dates",
      "isLastStep",
      "menus",
      "options",
      "steps",
      "showPrices",
      "products"
    ]),
    currentStep: {
      get() {
        return this.$store.getters["currentStep"];
      },
      set(val) {
        if (val) {
          this.$store.commit("SET_CURRENT_STEP", val);
        }
      }
    },
    displayDateSelectorInCurrentStep() {
      return this.$route.name !== "SummaryPage";
    },
    displayStepSelectorInCurrentStep() {
      return true;
    },
    displayMenuSelectorInCurrentStep() {
      return this.$route.name !== "SummaryPage";
    },
    displayOptionSelectorInCurrentStep() {
      return (
        this.$route.name !== "SummaryPage" &&
        this.currentMenuDetails.type === "product_pack"
      );
    },
    displaySeparatorInCurrentStep() {
      return this.$route.name === "SummaryPage";
    }
  },
  watch: {
    currentDate(value) {
      console.log('Fecha cambiada por el WATCH: ' + value);
      console.log('El WATCH de fecha, ejecutara los siguientes funciones encontradas en store/index.js, mutations: {}:');
      console.log('SET_CURRENT_DATE');
      console.log('RESET_BASKET');
      console.log('');
      this.$store.commit("SET_CURRENT_DATE", value);
      this.$store.commit("RESET_BASKET");
      this.$store.dispatch("getProducts", {
        date: value
      });
      console.log(this.products);
    },

    currentMenu(value) {
      console.log('Menu cambiado por el WATCH, ID: ' + value);
      if (value) {
        this.$store.commit("SET_CURRENT_MENU", value);
        this.currentOption = _.result(
          _.first(this.$store.getters.options),
          "id"
        );
        console.log('Opcion de menu cambiado por el WATCH:' + this.currentOption);
      }
    },

    currentOption(value) {
      console.log('Opcion cambiada por el WATCH, ID: ' + value);
      if (value) {
        this.$store.commit("SET_CURRENT_OPTION", value);
        this.$store.commit("RESET_STEP");
        this.$store.commit("RESET_BASKET");
      }
    },

    currentStep(value) {
      if (value) {
        this.$store.commit("SET_CURRENT_STEP", value);
      }

      if (value && !this.isLastStep) {
        this.$router.push({
          name: "StepsPage",
          params: {
            id: String(value)
          }
        });
      }
    },

    isLastStep(value) {
      console.log('es ultimo paso?: ' + value);
      if (value) {
        this.$router.push({ name: "SummaryPage" });
      }
    }
  },
  mounted: async function() {
    console.log('MOUNTED: Este bloque se ejecuta solo una vez despues de que el proyecto ya se haya montado');
    console.log('---------------- MOUNTED ----------------');
    if (!window.$)
    {
      console.log('no window$');
      await new Promise(r => setTimeout(r, 1000));
    }

    this.currentDate = _.first(this.$store.state.dates);

    if (this.$route.query.menu)
    {
      this.currentMenu = parseInt(this.$route.query.menu);
    }
    else
    {
      this.currentMenu = _.first(this.$store.state.menus).id;
    }
    console.log('MENU ID ' + this.currentMenu);

    console.log( "DATE " + this.currentDate);
    // this.currentStep = _.first(this.$store.state.steps).id;

    await this.$store.dispatch("getProducts", {
      date: this.currentDate
    });

    console.log('---------------- FIN MOUNTED ----------------');
  }
};
</script>

<style lang="scss">
.summary-separator {
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  margin-block-end: 100px;
  margin-inline-start: -20px;
  margin-inline-end: -20px;
  background-color: #ffffff;
}

.horizontal-buttons {
  margin-block-end: 25px;
}

.d-none {
  display: none !important;
}

.btn {
  border-radius: 0px;
  background-color: transparent;
  color: #333;
}

.btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-secondary:focus,
.btn-outline-secondary.focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.btn-outline-secondary.disabled,
.btn-outline-secondary:disabled {
  color: #6c757d;
  background-color: transparent;
}

.btn-outline-secondary:not(:disabled):not(.disabled):active,
.btn-outline-secondary:not(:disabled):not(.disabled).active,
.show > .btn-outline-secondary.dropdown-toggle {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-secondary:not(:disabled):not(.disabled):active:focus,
.btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-secondary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
}

.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}

.flex-column {
  -ms-flex-direction: column !important;
  flex-direction: column !important;
}

.flex-row-reverse {
  -ms-flex-direction: row-reverse !important;
  flex-direction: row-reverse !important;
}

.modal-body > .d-flex > div > .btn {
  min-width: 96px;
}

.justify-content-around {
  -ms-flex-pack: distribute !important;
  justify-content: space-around !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.justify-content-center {
  -ms-flex-pack: center !important;
  justify-content: center !important;
}

.justify-content-end {
  justify-content: flex-end !important;
}

.align-items-center {
  align-items: center !important;
}

.modal-body > .justify-content-around > div > .btn {
  min-width: 96px;
}

.btn-dark {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-dark:hover {
  color: #fff;
  background-color: #23272b;
  border-color: #1d2124;
}

.btn-dark:focus,
.btn-dark.focus {
  color: #fff;
  background-color: #23272b;
  border-color: #1d2124;
  box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);
}

.btn-dark.disabled,
.btn-dark:disabled {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-dark:not(:disabled):not(.disabled):active,
.btn-dark:not(:disabled):not(.disabled).active,
.show > .btn-dark.dropdown-toggle {
  color: #fff;
  background-color: #1d2124;
  border-color: #171a1d;
}

.btn-dark:not(:disabled):not(.disabled):active:focus,
.btn-dark:not(:disabled):not(.disabled).active:focus,
.show > .btn-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);
}

.btn-outline-dark {
  color: #343a40;
  border-color: #343a40;
}

.btn-outline-dark:hover {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-outline-dark:focus,
.btn-outline-dark.focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

.btn-outline-dark.disabled,
.btn-outline-dark:disabled {
  color: #343a40;
  background-color: transparent;
}

.btn-outline-dark:not(:disabled):not(.disabled):active,
.btn-outline-dark:not(:disabled):not(.disabled).active,
.show > .btn-outline-dark.dropdown-toggle {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-outline-dark:not(:disabled):not(.disabled):active:focus,
.btn-outline-dark:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

.btn-lg,
.btn-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  /* border-radius: 0.3rem; */
}
</style>
