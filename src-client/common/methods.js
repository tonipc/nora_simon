export const addMainProductsToCart = async function(vm) {
  // Add standard products to the cart
  const productsData = [];

  vm.basket.forEach(prod => {
    productsData.push([
      prod.quantity,
      prod.id_product,
      prod.id_product_attribute
    ]);
  });

  await vm.$store.dispatch("createProductPack", {
    product_info: productsData,
    date: vm.currentDate,
    id_product_step_pack: vm.currentMenu,
    name: vm.currentMenuDetails.label,
    quantity: vm.quantity
  });
};

const mixins = {
  methods: {
    async addMainProductsToCart() {
      // Add standard products to the cart
      const productsData = [];

      this.basket.forEach(prod => {
        productsData.push([
          prod.quantity,
          prod.id_product,
          prod.id_product_attribute
        ]);
      });

      await this.$store.dispatch("createProductPack", {
        product_info: productsData,
        date: this.currentDate,
        id_product_step_pack: this.currentMenu,
        name: this.currentMenuDetails.label,
        quantity: this.quantity
      });
    }
  }
};

export default mixins;
