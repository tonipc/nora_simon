module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true
  },
  extends: [
    // add more generic rulesets here, such as:
    "eslint:recommended",
    "plugin:vue/recommended"
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  globals: {
    $: true
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off"
  }
};
