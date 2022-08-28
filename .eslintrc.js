module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
    },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ],
        "extensions": [
          ".ts",
          ".tsx"
        ]
      }
    }
  },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/indent": ["error", 2]
    }
}
