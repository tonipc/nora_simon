const { $, prestashop } = window;

/**
 * Add to cart and emit PrestaShop events
 *
 * @param {string} actionURL
 * @param {any} query
 * @param {boolean} emit
 * @returns
 */
const processEvents = ({
  actionURL,
  query,
  emit = true,
  redirectAutoTo = true
}) => {
  return new Promise(resolve => {
    window.$.post(actionURL, query.toString(), null, "json")
      .then(resp => {
        if (emit && !redirectAutoTo) {
          prestashop.emit("updateCart", {
            reason: {
              idProduct: resp.id_product,
              idProductAttribute: resp.id_product_attribute,
              idCustomization: resp.id_customization,
              linkAction: "add-to-cart",
              cart: resp.cart
            },
            resp
          });
        }

        resolve();
      })
      .fail(resp => {
        prestashop.emit("handleError", {
          eventType: "addProductToCart",
          resp
        });

        resolve();
      });
  });
};

export default processEvents;
