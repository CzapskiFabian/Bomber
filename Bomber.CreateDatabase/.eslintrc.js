module.exports = {
    "env": {
      "node": true,
      "mocha": true,
      "es6": true
    },
    "extends": [
      "eslint:recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module",
    },
    "plugins": [
      "mocha"
    ],
    "rules": {
      "no-console": "error",
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "comma-spacing": "error",
      "keyword-spacing": "error",
      "comma-dangle": ["error", "never"],
      "space-unary-ops": ["error", { "overrides": { '!': true } }],
      "space-infix-ops": "error",
      "no-shadow": "error",
      "prefer-const": "error",
      "mocha/no-exclusive-tests": "error",
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 0 }],
      "quote-props": ["error", "as-needed"],
      "max-len": ["error", 120, { "ignoreStrings": true }],
      "object-curly-spacing": ["error", "always"],
      "key-spacing": ["error", { "afterColon": true }]
    }
  };
  