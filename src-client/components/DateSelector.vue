<template>
  <div v-cloak class="date-selector">
    <div class="card bg-dark text-white date-selector-card">
      <img
        class="card-img date-selector-card-img"
        src="/modules/norainventory/views/img/change_date_background.png"
        alt="Background image"
        loading="lazy"
      />
      <div class="card-img-overlay d-flex justify-content-center align-items-center date-selector-card-content">
        <div class="d-flex flex-column justify-content-center date-selector-content-left">
          <div class="date-selector-content-left-title">
            <h1>{{ trans("change_date_info") }}</h1>
          </div>
          <div class="date-selector-content-left-subtitle">
            <h2>{{ titleText }} {{ getFormatedDate(selectedDate) }}</h2>
          </div>
        </div>
        <!--
        <div class="d-flex flex-column justify-content-center date-selector-content-right">
          <button
            type="buton"
            class="btn btn-lg date-selector-content-button"
            data-toggle="modal"
            data-target="#changeDateModal"
          >
            {{ buttonText.toUpperCase() }}
          </button>
        </div> -->
        <div class = "date-selector-main">
          <!-- Slider main container -->
          <div class="swiper">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">

              <div v-for="(date, i) in showDates" :key="i" class="swiper-slide" :class="{ passed: date.isPassed }">
                <button
                  style="min-width=96px;"
                  type="button"
                  :class="[
                    'btn',
                    'btn-outline-dark',
                    date.date === selectedDate ? 'active' : ''
                  ]"
                  @click="onSelected(date.date, i, date.isPassed)"
                >
                  <div class="d-flex flex-column">
                    <div>{{ getDayString(date.date) }}</div>
                    <div class="display-2">
                      {{ getDayNumber(date.date) }}
                    </div>
                  </div>
                </button>
              </div>
              
            </div>
            <!-- If we need navigation buttons -->
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
</script>

<script>
import { DateTime } from "luxon";
import _ from "lodash";
import VueEvents from 'vue-events';


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

    initialSlide: {
      type: Number,
      default: 0
    },

    titleText: {
      type: String,
      default: "Order for"
    },
    showDates: {
      type: Array,
      default: () => []
    },
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
  events: {
    dateChangeEvent(eventData){
       this.selectedDate = eventData;
    }
  }, 

  mounted() {

    //get current week
    let curr = new Date 
    let datesToShow = []
    //Magic: We get the current day of the monts, we substract the current day of the week and we add 1 (week starts on sunday in JS), and we have the date of last monday. The we just need to iterate
    for (let i = 1; i <= 5; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      datesToShow.push(day)
    }

    //Get next week: We get current date and add 7 days, so we can reuse same algorithm thatn before
    
    let nextWeek = new Date;
    nextWeek.setDate(nextWeek.getDate() + 7)
    for (let i = 1; i <= 5; i++) {
      let first = nextWeek.getDate() - nextWeek.getDay() + i 
      let day = new Date(nextWeek.setDate(first)).toISOString().slice(0, 10)
      datesToShow.push(day)
    }

    if (_.isArray(this.availableDates) && this.availableDates.length > 0) {
      this.selectedDate = _.first(this.availableDates);
    }

    this.initialSlide  = datesToShow.indexOf(this.selectedDate);

    var fridayFound = false;

    for (let i = 0; i < datesToShow.length; i++)
    {

      //check first friday and store it to global memory

      var d1 = new Date(datesToShow[i])

      if ( !fridayFound && (d1.getDay() == 5) )
      {
        this.$store.state.nextFriday = datesToShow[i];
        this.$store.state.nextFridayIndex = i;
        fridayFound = true
      }
      let isPassed = false;


      console.log(this.initialSlide)

      if ( i < this.initialSlide )
      {
        isPassed = true;
      }

      if ( isPassed || (this.availableDates.includes(datesToShow[i])) )
      {
        this.showDates.push({
          date: datesToShow[i],
          isPassed: isPassed
        })
      }
    }

    //Need to be in timeout to avoid initialization errors for Swiper   
    setTimeout(function(){

      this.$store.state.swiper = new Swiper('.swiper', {
        slidesPerView: 5,
        spaceBetween: 30,
        initialSlide:  this.initialSlide,
        centeredSlides: true,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
      });

    }.bind(this), 100)
      

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

      let dateStr = DateTime.fromISO(date, { locale: this.defaultLocale }).weekdayLong;
      dateStr = dateStr.slice(0, 3);

      return dateStr;
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

    onSelected(e, i, isPassed) {

      if (!isPassed)
      {
        this.$store.state.swiper.slideTo(i);
        this.selectedDate = e; 
        this.$emit("input", e);
        this.modal = false;
      }

    }
  }
};
</script>

<style lang="scss">

.date-selector-main 
{
  position: relative;
}

.swiper-button-next, .swiper-button-prev
{
  top: 42px !important;
  color: white !important;
}

.swiper-button-next 
{
  right: 0px !important;
}

.swiper-button-prev
{
  left: -43px !important;
}
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
