const { $ } = window;

/**
 *
 * @param {strin} endpoint Url
 * @param {string} type GET, POST, PUT, DELETE
 * @param {object} data Params
 * @returns
 */
const ajax = function(endpoint, type, data) {
  return new Promise((resolve, reject) => {
    window.$.ajax({
        url: endpoint,
        type,
        data,
        success: resp => {
          resolve(resp);
          console.log('response ok');
        },
        error: err => {
          reject(err);
          console.log('response no ok');
        }
      });

  });
};

export default ajax;
