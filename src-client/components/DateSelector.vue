<template>
  <div v-cloak class="date-selector">
    <div class="card bg-dark text-white date-selector-card">
      <img
        class="card-img date-selector-card-img"
        src="/modules/norainventory/views/img/change_date_background.png"
        alt="Background image"
        loading="lazy"
      />
      <div
        class="card-img-overlay d-flex justify-content-center align-items-center date-selector-card-content"
      >
        <div
          class="d-flex flex-column justify-content-center date-selector-content-left"
        >
          <div class="date-selector-content-left-title">
            <h1>{{ trans("change_date_info") }}</h1>
          </div>
          <div class="date-selector-content-left-subtitle">
            <h2>{{ titleText }} {{ getFormatedDate(selectedDate) }}</h2>
          </div>
        </div>
        <div
          class="d-flex flex-column justify-content-center date-selector-content-right"
        >
          <button
            type="buton"
            class="btn btn-lg date-selector-content-button"
            data-toggle="modal"
            data-target="#changeDateModal"
          >
            {{ buttonText.toUpperCase() }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      id="changeDateModal"
      class="modal fade change-date-modal"
      tabindex="-1"
      aria-labelledby="changeDateModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg change-date-modal-dialog">
        <div class="modal-content change-date-modal-dialog-content">
          <div class="modal-header change-date-modal-dialog-content-header">
            <!-- <h5 class="modal-title" id="changeDateModalLabel">
              Modal title
            </h5> -->
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body change-date-modal-dialog-content-body">
            <h3 class="change-date-modal-title">
              {{ trans("change_date_title") }}
            </h3>
            <h4 class="change-date-modal-subtitle">
              {{ trans("change_date_subtitle") }}
            </h4>
            <div class="d-flex justify-content-around date-selector-elements">
              <div v-for="(date, i) in availableDates" :key="i">
                <button
                  style="min-width=96px;"
                  type="button"
                  :class="[
                    'btn',
                    'btn-outline-dark',
                    date === selectedDate ? 'active' : ''
                  ]"
                  @click="onSelected(date)"
                >
                  <div class="d-flex flex-column">
                    <div>{{ getDayString(date) }}</div>
                    <div class="display-2">
                      {{ getDayNumber(date) }}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import _ from "lodash";

export default {
  name: "DateSelector",
  props: {
    availableDates: {
      type: Array,
      default: () => []
    },

    buttonText: {
      type: String,
      default: "Open"
    },

    titleText: {
      type: String,
      default: "Order for"
    }
  },
  data() {
    return {
      selectedDate: "",
      modal: false
    };
  },
  computed: {
    defaultLocale() {
      return this.$store.state.defaultLocale;
    }
  },
  mounted() {
    if (_.isArray(this.availableDates) && this.availableDates.length > 0) {
      this.selectedDate = _.first(this.availableDates);
    }
  },
  methods: {
    /**
     * @example 25
     */
    getDayNumber(date) {
      return DateTime.fromISO(date, { locale: this.defaultLocale }).day;
    },

    /**
     * @example 'jueves'
     */
    getDayString(date) {
      return DateTime.fromISO(date, { locale: this.defaultLocale }).weekdayLong;
    },

    /**
     * @example 'jueves, 15 de abril de 2021',
     */
    getFormatedDate(d) {
      return DateTime.fromISO(d, {
        locale: this.defaultLocale
      }).toLocaleString(DateTime.DATE_HUGE);
    },

    onOpen() {
      this.modal = true;
    },

    onClose() {
      this.modal = false;
    },

    onSelected(e) {
      this.selectedDate = e;
      this.$emit("input", e);
      this.modal = false;
    }
  }
};
</script>

<style lang="scss">
.date-selector {
  overflow: hidden;
  .date-selector-card {
    background-color: black;
    border: none;
  }
  .date-selector-card-img {
    object-fit: contain;
    opacity: 0.7;
  }
  .date-selector-content-left {
    margin-inline-end: 90px;
    .date-selector-content-left-title {
      h1 {
        font-size: 50px;
      }
      h2 {
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
      }
    }
  }
  .date-selector-content-right {
    .date-selector-content-button {
      width: 291px;
      height: 60px;
      background-color: white;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.31;
    }
  }
  .change-date-modal {
    .change-date-modal-dialog-content-header {
      border-bottom: none;
    }
    .change-date-modal-dialog-content-body {
      padding-block-start: 70px;
      padding-block-end: 70px;
      padding-inline-start: 158px;
      padding-inline-end: 158px;
      .change-date-modal-title {
        font-size: 30px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #373737;
        margin-block-end: 25px;
      }
      .change-date-modal-subtitle {
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.73;
        letter-spacing: normal;
        text-align: center;
        color: rgba(55, 55, 55, 0.75);
        margin-block-end: 51px;
      }
    }
  }
}
</style>
