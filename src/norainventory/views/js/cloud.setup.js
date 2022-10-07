Cloud.setup({
  methods: {
    // noraInventoryApi: {
    //   verb: "POST",
    //   url: noraInventoryApi.baseUrl,
    //   params: noraInventoryApi.params,
    // },
    testServer: {
      verb: "GET",
      url: noraApiAdminTest,
      args: ["controller", "action", "ajax", "token"],
    },
    getProducts: {
      verb: "GET",
      url: noraApiAdminGetProducts,
      args: ["controller", "action", "ajax", "token"],
    },
    createProductStockByDate: {
      verb: "GET",
      url: noraApiAdminCreateAvailableDate,
      args: [
        // "controller",
        // "action",
        // "ajax",
        // "token",
        "date",
        "stock",
        "idProduct",
        "idAttribute",
      ],
    },
  },
});
