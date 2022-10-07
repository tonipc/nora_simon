"use strict";

$(document).ready(() => {
  parasails.registerPage("nora-front-inventory-packs", {
    data: {
      dates: [],
      currentDate: new Date().toISOString().split("T")[0],
      steps: [],
      currentStep: 1,
      menus: [],
      currentMenu: 3,
      options: [],
      currentOption: 1,

      daysName: [],
    },
    beforeMount: function () {
      this.steps = window.noraInventoryData.steps || [];
      this.menus = window.noraInventoryData.menus || [];
      this.options =
        _.result(
          _.find(this.menus, (menu) => menu.id === this.currentMenu),
          "options"
        ) || [];

      this.dates = window.noraInventoryData.dates || [];
      this.daysName = window.noraInventoryData.daysName || [];
    },
    mounted: async function () {
      //…
      try {
        const result = await Cloud.testApi.with({
          testNumber: 12345,
          testString: "aeiou",
          testBoolean: true,
        });

        console.log({ result });
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      //…
    },
    watch: {
      currentDate(value) {
        console.log({ wathCurrentDate: value });
      },

      currentMenu(value) {
        const menu = _.find(this.menus, (item) => item.id === value);

        this.options = menu.options || [];
      },
    },
  });
});
