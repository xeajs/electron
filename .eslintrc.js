module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    debugLevel: false,
    useJSXTextNode: true,
    ecmaFeatures: {
      jsx: true
    },
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    projectFolderIgnoreList: [/node_modules/, /scripts/]
  },
  extends: [
    'eslint:recommended',
    /** =========================================================================== */
    /** ============================== eslint-config ============================== */
    /** =========================================================================== */
    /** eslint-config-prettier */
    'prettier',
    /** eslint-config-react-app */
    'react-app',
    /** =========================================================================== */
    /** ============================== eslint-plugin ============================== */
    /** =========================================================================== */
    /** eslint-plugin-prettier */
    'plugin:prettier/recommended',
    /** @typescript-eslint/eslint-plugin */
    'plugin:@typescript-eslint/recommended',
    /** eslint-plugin-react */
    'plugin:react/recommended',
    /** eslint-plugin-jsx-a11y */
    'plugin:jsx-a11y/recommended',
    /** eslint-plugin-import' */
    'plugin:import/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    /** ================================================================ */
    /** ================= 0 = off, 1 = warn, 2 = error ================= */
    /** ================================================================ */
    /** prettier 语法格式 */
    'prettier/prettier': 'error',
    /** 空类型 interface */
    '@typescript-eslint/no-empty-interface': 'off',
    /** _Var_Base_xxx*/
    '@typescript-eslint/camelcase': 'off',
    /** 空类型 interface */
    '@typescript-eslint/no-unused-vars': 'off',
    /** 允许缓存 this */
    '@typescript-eslint/no-this-alias': 'off',
    /** 空函数 */
    '@typescript-eslint/no-empty-function': 'off',
    /** 必须书写函数返回值类型 */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** 使用 require */
    '@typescript-eslint/no-var-requires': 'off',
    /** react hooks 空数组 */
    'react-hooks/exhaustive-deps': 'off',
    /** 事件绑定 */
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    /** 不使用var */
    'no-var': 'error',
    /** 不使用react自身的类型检查，使用ts的  */
    'react/prop-types': 'off',
    /** 不使用 console */
    'no-console': 'off',
    /** 不规则的空白不允许 */
    'no-irregular-whitespace': 'error',
    /** 指定数组的元素之间要以空格隔开(,后面) */
    'array-bracket-spacing': [2, 'never'],
    /** 导入的模块内部有未解决的lint问题 */
    'import/no-unresolved': 'off',
    /** react 匿名函数组件 */
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    window: true,
    console: true,
    require: true,
    Promise: true,
    Symbol: true,
    Reflect: true,
    Map: true,
    Proxy: true,
    Set: true,
    global: true,
    ArrayBuffer: true,
    Buffer: true,
    __DEV__: true,
    alert: true,
    FormData: true,
    XMLHttpRequest: true,
    fetch: true,
    Blob: true
  }
};
