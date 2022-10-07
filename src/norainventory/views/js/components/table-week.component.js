/**
 * <table-week></table-week>
 */

parasails.registerComponent("tableWeek", {
  props: {
    disableSaturdays: {
      type: Boolean,
      default: false,
    },

    disableSundays: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * How many weeks after, before or 0 for this week
       */
      currentWeek: 0,

      products: [],

      loading: false,
    };
  },
  computed: {
    /**
     * If week is current, previous weeks are unavailable
     */
    disabledPrevious() {
      return this.currentWeek === 0;
    },

    /**
     * Today date
     *
     * @example Tue Apr 13 2021 12:02:15 GMT-0500 (Colombia Standard Time)
     */
    today() {
      return new Date();
    },

    /**
     * Numerical 0-6 day of the week
     *
     * @example 2
     */
    dayOfTheWeek() {
      return this.today.getDay();
    },

    /**
     * Human readable date for the current week
     *
     * @example Tue Apr 13 2021 00:00:00 GMT-0500 (Colombia Standard Time)
     */
    currentWeekFirstDayDate() {
      return new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        this.today.getDate() + 7 * this.currentWeek
      );
    },

    /**
     * Array of week dates
     *
     * @example [
     *   'Thu Apr 15 2021 00:00:00 GMT-0500 (Colombia Standard Time)',
     *   'Fri Apr 16 2021 00:00:00 GMT-0500 (Colombia Standard Time)',
     *   ...
     *   'Wed Apr 21 2021 00:00:00 GMT-0500 (Colombia Standard Time)'
     * ]
     */
    weekDates() {
      return _.map(_.range(7), (i) => this.getDatePastDays(i));
    },

    /**
     * Date to be used in form
     *
     * @example [
     *   '2021-04-15',
     *   '2021-04-16',
     *   ...
     *   '2021-04-21'
     * ]
     */
    machineWeekDates() {
      return _.map(
        _.range(7),
        (i) => this.weekDates[i].toISOString().split("T")[0]
      );
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
    readableWeekDates() {
      return _.map(this.weekDates, (date) => this.getDateFormat(date));
    },

    colspan() {
      let value = 7;
      if (!this.disableSaturdays) {
        value++;
      }

      if (this.disableSundays) {
        value++;
      }

      return value;
    },
  },
  template: `
  <section>
    <div class="d-flex justify-content-between">
      <div><button type="button" @click="clickPreviousWeek" :class="['btn', 'btn-secondary', disabledPrevious ? 'disabled' : '']">Previous Week</button></div>
      <div>
        <!--div class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2">
          <button class="btn btn-outline-success my-2 my-sm-0">Buscar</button>
        </div-->
      </div>
      <div><button type="button" @click="clickNextWeek" class="btn btn-secondary">Next Week</button></div>
    </div>
    <hr>

    <display-loading v-if="loading"></display-loading>

    <div v-else class="table-responsive">
      <table class="table table-striped">
        <tr class="tr-title">
          <th class="th-title">Categoria</th>
          <th class="th-title">Product</th>
          <template v-for="(day, i) in _.range(7)">
            <th class="th-title th-vertical" :key="i" v-if="displayColumnByDayOfTheWeek(i)">
              <span class="text-v-dir">{{ readableWeekDates[day] }} </span>
            </th>
          </template>
        </tr>
        <template v-for="(product, index) in products">
          <tr :key="product.id" :class="['table_item', hasAttributes(product) ? 'alone' : '', index % 2 ? 'table-secondary' : '', 'product-' + product.id]">
            <td class="catname">{{ product.categoryName }}</td>
            <template v-if="hasAttributes(product)">
              <td :colspan="colspan" class="name">{{ product.name }}</td>
              </template>
              <template v-else>
              <td class="name">{{ product.name }}</td>
              <template v-for="(val, j) in readableWeekDates">
                <td class="text-center" v-if="displayColumnByDayOfTheWeek(j)" :key="j"><input type="number" :value="getValue(j, product.id)" @input="onInput($event, machineWeekDates[j], product.id)"></input></td>
              </template>
            </template>
          </tr>
          <template v-if="hasAttributes(product)">
            <tr v-for="attribute in product.attributes" :key="product.id + '-' + attribute.id" :class="'product-' + product.id + '-' + attribute.id">
              <td></td>
              <td>{{ product.name }} - {{ attribute.name }}</td>
              <template v-for="(day, j) in readableWeekDates">
                <td class="text-center" v-if="displayColumnByDayOfTheWeek(j)" :key="j"><input type="number" :value="getValue(j, product.id, attribute.id)" @input="onInput($event, machineWeekDates[j], product.id, attribute.id)"></input></td>
              </template>
            </tr>
          </template>
        </template>
      </table>
    </div>
  </section>
  `,
  async mounted() {
    this.loading = true;
    try {
      this.products = await Cloud.getProducts();
    } catch (error) {
      console.error({ error });
    } finally {
      this.loading = false;
    }

    this.debounced = _.debounce(this.updateStockByDate, 500);
  },
  methods: {
    /**
     * Previous week
     */
    clickPreviousWeek() {
      if (this.currentWeek - 1 >= 0) {
        this.currentWeek--;
      }
    },

    /**
     * Next week
     */
    clickNextWeek() {
      this.currentWeek++;
    },

    /**
     * Explore dates array and get result by index
     * 0 - Sunday and 6 - Saturday
     *
     * @param {number} i
     * @returns
     */
    displayColumnByDayOfTheWeek(i) {
      const dayOfTheWeek = this.weekDates[i].getDay();

      const displayDay =
        ![0, 6].includes(dayOfTheWeek) ||
        (dayOfTheWeek === 6 && !this.disableSaturdays) ||
        (dayOfTheWeek === 0 && !this.disableSundays);

      return displayDay;
    },

    /**
     * Get dates for the current + n days
     *
     * @param {number} days
     * @returns
     */
    getDatePastDays(days = 0) {
      return new Date(
        this.currentWeekFirstDayDate.getFullYear(),
        this.currentWeekFirstDayDate.getMonth(),
        this.currentWeekFirstDayDate.getDate() + days
      );
    },

    /**
     * Extract date withou time
     *
     * @param {object} date
     * @returns
     */
    getDateFormat(date) {
      return date.toLocaleDateString("es-ES", { dateStyle: "full" });
    },

    /**
     * Value of the v-model stock input field
     *
     * @param {number} index Date index table
     * @param {string} productId
     * @param {string} attributeId
     * @returns
     */
    getValue(index, productId, attributeId = null) {
      const requiredDate = this.machineWeekDates[index];
      const product = _.find(
        this.products,
        (product) => product.id === productId
      );

      let stock;
      if (attributeId) {
        stock = product.stocks?.[attributeId]?.[requiredDate] || 0;
      } else {
        stock = product.stocks?.["0"]?.[requiredDate] || 0;
      }

      return stock;
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
     * @param {number | null} idAttribute Attribute Id
     */
    onInput(e, date, idProduct, idAttribute = null) {
      this.debounced(e.target.value, date, idProduct, idAttribute);
    },

    /**
     * Call API service to update stock on input
     *
     * @param {object} product
     * @param {object} date
     */
    async updateStockByDate(stock, date, idProduct, idAttribute = 0) {
      try {
        const result = await Cloud.createProductStockByDate.with({
          date,
          stock,
          idProduct,
          idAttribute: idAttribute || undefined,
        });

        const productIndex = _.findIndex(
          this.products,
          (product) => product.id == idProduct
        );

        if (_.isUndefined(this.products[productIndex]["stocks"][idAttribute])) {
          this.products[productIndex]["stocks"][idAttribute] = {
            date: stock,
          };
        } else {
          this.products[productIndex]["stocks"][idAttribute][date] = stock;
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
