/**
 * See: https://github.com/yannickcr/eslint-plugin-react
 * See：https://www.jianshu.com/p/a09a5a222a76
 * @参考 [https://github.com/ant-design/ant-design/]
 * https://juejin.im/post/5c662b47f265da2dcf626eac
 */
module.exports = {
  /** 以当前目录为根目录，不再向上查找 .eslintrc.js */
  root: true,
  env: {
    browser: false,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: '16.12.0'
    }
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    /** 强制要求 import 排序 */
    'no-undef': 'error',
    'sort-imports': 'error',
    'prettier/prettier': 'error',
    'func-call-spacing': 'off', // 函数名和执行它的括号之间禁止有空格
    'react/jsx-curly-spacing': 0,
    'no-confusing-arrow': ['error', { allowParens: false }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-confusing-arrow': 'off',
    'prefer-const': 'off'
  },
  globals: {
    window: true,
    global: true,
    console: true,
    require: true,
    Promise: true,
    Symbol: true,
    Reflect: true,
    Map: true,
    Proxy: true,
    Set: true,
    global: true,
    SPK: true,
    speakinInstanceGlobalObject: true,
    NodeListenPort: true,
    ArrayBuffer: true,
    XMLHttpRequest: true,
    Blob: true
  }
};
