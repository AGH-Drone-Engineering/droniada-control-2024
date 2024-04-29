module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "indent": "off",
    "linebreak-style": "off",
    "quotes": "off",
    "semi": "off",
    "comma-dangle": "off",
    "no-trailing-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-irregular-whitespace": "off",
    "jsx-quotes": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-boolean-value": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-multi-spaces": "off",
    "react/jsx-space-before-closing": "off",
    "react/jsx-wrap-multilines": "off",
    "react/no-children-prop": "off",
    "react/no-danger": "off",
    "react/no-danger-with-children": "off",
    "react/no-deprecated": "off",
    "react/no-did-mount-set-state": "off",
    "react/no-did-update-set-state": "off",
    "react/no-direct-mutation-state": "off",
    "react/no-find-dom-node": "off",
    "react/no-is-mounted": "off",
    "react/no-render-return-value": "off",
    "react/no-set-state": "off",
    "react/no-string-refs": "off",
    "react/no-this-in-sfc": "off",
    "react/no-typos": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unknown-property": "off",
    "react/no-unsafe": "off",
    "react/no-unused-prop-types": "off",
    "react/no-unused-state": "off",
    "react/prefer-es6-class": "off",
    "react/prefer-stateless-function": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/require-optimization": "off",
    "react/self-closing-comp": "off",
    "react/sort-comp": "off",
    "react/sort-prop-types": "off",
    "react/style-prop-object": "off",
    "react/void-dom-elements-no-children": "off"
  }
}
