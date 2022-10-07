<template>
  <section>
    <div class="d-flex justify-content-between">
      <div>
        <button
          type="button"
          :class="['btn', 'btn-primary', disabledPrevious ? 'disabled' : '']"
          @click="clickPreviousWeek"
        >
          {{ trans("previous_week") }}
        </button>
      </div>
      <div></div>
      <div>
        <button type="button" class="btn btn-primary" @click="clickNextWeek">
          {{ trans("next_week") }}
        </button>
      </div>
    </div>
    <hr />

    <loading-spinner v-if="loading"></loading-spinner>

    <div v-else class="table-responsive">
      <table class="table table-striped">
        <tr class="tr-title">
          <th class="th-title" width="25%">
            <p>{{ trans("categories") }}</p>
            <input-field
              v-model="searchByCategoryName"
              input-name="seachByCategory"
            ></input-field>
          </th>
          <th class="th-title" width="25%">
            <p>{{ trans("products") }}</p>
            <input-field
              v-model="searchByProductName"
              input-name="seachByProductName"
            ></input-field>
          </th>
          <th class="th-title">
            <p>{{ trans("ID") }}</p>
          </th>
          <th class="th-title">
            <p>{{ trans("active") }}</p>
            <checkbox-field v-model="searchByActive"></checkbox-field>
          </th>
          <template v-for="(day, i) in range">
            <th :key="i" class="th-title th-vertical" :class="getClassByDay(i)">
              <span class="text-v-dir">{{ weekFormated[day] }} </span>
            </th>
          </template>
        </tr>
        <template v-for="(product, index) in products">
          <tr
            :key="product.id"
            :class="[
              'table_item',
              hasAttributes(product) ? 'alone' : '',
              index % 2 ? 'table-secondary' : '',
              'product-' + product.id
            ]"
          >
            {{/** Category Name */}}
            <td class="catname">
              {{ product.categoryName }}
            </td>

            {{/** Product Name */}}
            <template v-if="hasAttributes(product)">
              <td class="name">
                {{ product.name }}
              </td>
              <td class="text-center active-value">
                {{ product.id }}
              </td>
              <td class="text-center active-value">
                {{ product.active ? 1 : 0 }}
              </td>
              <td colspan="7"></td>
            </template>

            <template v-else>
              <td class="name">
                {{ product.name }}
              </td>
              <td class="text-center active-value">
                {{ product.id }}
              </td>
              <td class="text-center active-value">
                {{ product.active ? 1 : 0 }}
              </td>
              <template v-for="(val, j) in weekFormated">
                <td :key="j" class="text-center" :class="getClassByDay(j)">
                  {{/** Input NO Attributes */}}
                  <input
                    type="number"
                    :disabled="!displayColumnByDayOfTheWeek(j)"
                    :value="getValue(j, product.id)"
                    @input="onInput($event, weekIsoDate[j], product.id)"
                  />
                </td>
              </template>
            </template>
          </tr>

          {{/** Product Attributes Name */}}
          <template v-if="hasAttributes(product)">
            <tr
              v-for="attribute in product.attributes"
              :key="product.id + '-' + attribute.id"
              :class="'product-' + product.id + '-' + attribute.id"
            >
              <td></td>
              <td>{{ product.name }} - {{ attribute.name }}</td>
              <td class="text-center active-value" >{{ attribute.id }}</td>
              <td></td>
              <template v-for="(day, j) in weekFormated">
                <td :key="j" class="text-center" :class="getClassByDay(j)">
                  {{/** Input WITH Attributes */}}
                  <input
                    type="number"
                    :disabled="!displayColumnByDayOfTheWeek(j)"
                    :value="getValue(j, product.id, attribute.id)"
                    @input="
                      onInput($event, weekIsoDate[j], product.id, attribute.id)
                    "
                  />
                </td>
              </template>
            </tr>
          </template>
        </template>
      </table>
    </div>
  </section>
</template>

<script>
import { range, map, debounce, isUndefined, findIndex, isArray } from "lodash";
const _ = { range, map, debounce, isUndefined, findIndex, isArray };
import { DateTime } from "luxon";
import { mapGetters } from "vuex";

import LoadingSpinner from "./LoadingSpinner.vue";
import InputField from "./InputField.vue";
import CheckboxField from "./CheckboxField.vue";

export default {
  name: "TableWeek",
  components: { LoadingSpinner, CheckboxField, InputField },
  data() {
    return {
      searchByProductName: "",
      searchByCategoryName: "",
      searchByActive: null
    };
  },
  computed: {
    ...mapGetters([
      "busy",
      "currentWeek",
      "disableSaturdays",
      "disableSundays",
      "products",
      "loading",
      "saturday",
      "sunday",
      "week"
    ]),

    range() {
      return _.range(7);
    },
    /**
     * If week is current, previous weeks are unavailable
     */
    disabledPrevious() {
      return this.currentWeek === 0;
    },

    /**
     * Array of readable-format week dates
     *
     * @example [
     *   'jueves, 15 de abril de 2021',
     *   'viernes, 16 de abril de 2021',
     *   ...
     *   'miércoles, 21 de abril de 2021'
     * ]
     */
    weekFormated() {
      return _.map(this.week, date => date.toLocaleString(DateTime.DATE_HUGE));
    },

    weekIsoDate() {
      return _.map(this.week, date => date.toISODate());
    },

    weekWeekDay() {
      return _.map(this.week, date => date.weekday);
    }
  },
  watch: {
    searchByCategoryName(value) {
      console.log({ searchByCategoryName: value });
      this.debouncedFilterBy();
    },

    searchByProductName(value) {
      console.log({ searchByProductName: value });
      this.debouncedFilterBy();
    },

    searchByActive(value) {
      console.log({ searchByActive: value });
      this.debouncedFilterBy();
    }
  },
  async mounted() {
    await this.$store.dispatch("getProducts");

    this.debouncedUpdateStockByDate = _.debounce(this.updateStockByDate, 500);
    this.debouncedFilterBy = _.debounce(this.filterBy, 500);
  },
  methods: {
    async filterBy() {
      const params = {
        rows: true
      };

      if (this.searchByProductName) {
        params.name = this.searchByProductName;
      }

      if (this.searchByCategoryName) {
        params.category = this.searchByCategoryName;
      }

      if (this.searchByActive !== null) {
        params.active = this.searchByActive;
      }

      await this.$store.dispatch("getProducts", params);
    },
    getClassByDay(i) {
      let style = [];

      const weekday = this.weekWeekDay[i];

      if (weekday === this.saturday) {
        style.push("bg-warning");
      } else if (weekday === this.sunday) {
        style.push("bg-danger");
      }

      return style;
    },

    /**
     * Previous week
     */
    clickPreviousWeek() {
      if (this.currentWeek - 1 >= 0) {
        this.$store.commit("PREVIOUS_WEEK");
      }
    },

    /**
     * Next week
     */
    clickNextWeek() {
      this.$store.commit("NEXT_WEEK");
    },

    /**
     * Explore dates array and get result by index
     * 0 - Sunday and 6 - Saturday
     *
     * @param {number} i
     * @returns
     */
    displayColumnByDayOfTheWeek(i) {
      const dayOfTheWeek = this.week[i].weekday;

      const displayDay =
        ![this.saturday, this.sunday].includes(dayOfTheWeek) ||
        (dayOfTheWeek === this.saturday && !this.disableSaturdays) ||
        (dayOfTheWeek === this.sunday && !this.disableSundays);

      return displayDay;
    },

    // isFieldBusy(index, idProduct, idProductAttribute = 0) {
    //   const requiredDate = this.week[index].toISODate();
    //   const item = `${requiredDate}-${idProduct}-${+idProductAttribute}`;
    //   if (this.busy.includes(item)) {
    //     console.log({ item, busy: this.busy });
    //   }

    //   return this.busy.includes(item);
    // },

    /**
     * Value of the v-model stock input field
     *
     * @param {number} index Date index table
     * @param {string} productId
     * @param {string} attributeId
     * @returns
     */
    getValue(index, idProduct, idProductAttribute = 0) {
      const requiredDate = this.week[index].toISODate();
      const productIndex = this.getProductIndex(idProduct);

      if (
        _.isUndefined(this.products[productIndex]["stocks"]) ||
        _.isUndefined(
          this.products[productIndex]["stocks"][idProductAttribute]
        ) ||
        _.isUndefined(
          this.products[productIndex]["stocks"][idProductAttribute][
            requiredDate
          ]
        )
      ) {
        return 0;
      }

      return this.products[productIndex]["stocks"][idProductAttribute][
        requiredDate
      ];
    },

    getProductIndex(idProduct) {
      return _.findIndex(this.products, product => product.id == idProduct);
    },

    /**
     * Check if a product has attributes
     *
     * @param {object} product
     * @returns
     */
    hasAttributes(product) {
      return (
        !_.isUndefined(product.attributes) &&
        _.isArray(product.attributes) &&
        !!product.attributes.length
      );
    },

    /**
     *
     * @param {string} e Event
     * @param {string} date Selected date
     * @param {number} idProduct Product Id
     * @param {number | null} idProductAttribute Attribute Id
     */
    async onInput(e, date, idProduct, idProductAttribute = null) {
      await this.debouncedUpdateStockByDate(
        e.target.value,
        date,
        idProduct,
        idProductAttribute
      );
    },

    /**
     * Call API service to update stock on input
     *
     * @param {object} product
     * @param {object} date
     */
    async updateStockByDate(quantity, date, idProduct, idProductAttribute = 0) {
      try {
        await this.$store.dispatch("createAvailableDate", {
          date,
          quantity,
          idProduct,
          idProductAttribute
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  font-size: small;
  border-collapse: collapse !important;
  th {
    border: 1px solid lightgray;
    padding: 10px;
  }
  td {
    border: 1px solid lightgray;
    padding: 10px;
  }
}

table td {
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

table > tr > td:first-child,
table > tr > td:last-child {
  border-left: 1px solid lightgray !important;
  border-right: 1px solid lightgray !important;
}

table > tr > td:nth-child(2),
table > tr > td:nth-child(3) {
  border-inline-end: 1px solid lightgray;
}

.tr-title {
  height: 200px;
}

.th-title {
  vertical-align: bottom;
  text-align: center;
}

.th-title.th-vertical {
  height: 15rem;
  padding: 6px 0;
  width: 6rem;
  text-align: center;
  position: relative;
}

.text-v-dir {
  position: absolute;
  bottom: 0;
  display: inline-block;
  font-weight: 400;
  height: 20px;
  text-align: left;
  transform: rotate(-90deg);
  transform-origin: left;
  white-space: nowrap;
  width: 20px;
}

input[type="number"] {
  width: 60px !important;
  border: 1px solid lightgray;
  text-align: center;
}

@media (max-width: 575.98px) {
  .table-responsive-sm {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-sm > .table-bordered {
    border: 0;
  }
}
@media (max-width: 767.98px) {
  .table-responsive-md {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-md > .table-bordered {
    border: 0;
  }
}
@media (max-width: 991.98px) {
  .table-responsive-lg {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-lg > .table-bordered {
    border: 0;
  }
}
@media (max-width: 1199.98px) {
  .table-responsive-xl {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-xl > .table-bordered {
    border: 0;
  }
}
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.table-responsive > .table-bordered {
  border: 0;
}
</style>
