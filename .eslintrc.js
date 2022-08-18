module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
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
        'prettier/prettier': [
            'error',
            {
                "endOfLine": "auto",
                "useTabs": false,
                'max-len': [1, { code: 10000 }]
            }
        ],
        "no-unused-vars": "off",
    }
}
