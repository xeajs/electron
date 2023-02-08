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
    projectFolderIgnoreList: [/node_modules/]
  },
  extends: [
    'next/core-web-vitals',
    /** eslint */
    'eslint:recommended',
    /** eslint-plugin-react */
    'plugin:react/recommended',
    /** eslint-plugin-react-hooks */
    'plugin:react-hooks/recommended',
    /** @typescript-eslint/eslint-plugin */
    'plugin:@typescript-eslint/recommended',
    /** eslint-plugin-import */
    'plugin:import/recommended',
    /** eslint-plugin-prettier */
    'plugin:prettier/recommended',
    /** eslint-plugin-jsx-a11y */
    'plugin:jsx-a11y/recommended',
    /** eslint-config-prettier */
    'prettier'
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
    /** 禁用 debugger */
    'no-debugger': 'off',
    /** 禁用稀疏数组 */
    'no-sparse-arrays': 'off',
    /** 强制所有控制语句使用一致的括号风格 */
    curly: ['error', 'multi-line'],
    /** 要求使用 === 和 !== */
    eqeqeq: 'error',
    /** 禁止 if 语句中 return 语句之后有 else 块 */
    'no-else-return': 'error',
    /** 禁止出现空函数 */
    'no-empty-function': 'off',
    /** 禁用 eval() */
    'no-eval': 'error',
    /** 禁止扩展原生类型 */
    'no-extend-native': 'error',
    /** 禁止使用类似 eval() 的方法 */
    'no-implied-eval': 'error',
    /** 禁止使用多个空格 */
    'no-multi-spaces': 'error',
    /** 禁止使用 new 以避免产生副作用 */
    'no-new': 'error',
    /** 禁止对 Function 对象使用 new 操作符 */
    'no-new-func': 'error',
    /** 禁止对 String，Number 和 Boolean 使用 new 操作符 */
    'no-new-wrappers': 'error',
    /** 禁止在 return 语句中使用赋值语句 */
    'no-return-assign': 'error',
    /** 禁止自身比较 */
    'no-self-compare': 'error',
    /** 要求 IIFE 使用括号括起来 */
    'wrap-iife': 'off',
    /** 要求使用骆驼拼写法 */
    camelcase: ['error', { properties: 'never' }],
    /** 强制在关键字前后使用一致的空格 */
    'keyword-spacing': 'error',
    /** 要求构造函数首字母大写 */
    'new-cap': 'error',
    /** 禁用 Array 构造函数 */
    'no-array-constructor': 'error',
    /** 禁止出现多行空行 */
    'no-multiple-empty-lines': 'error',
    /** 禁用 Object 的构造函数 */
    'no-new-object': 'error',
    /** 强制在花括号内使用一致的换行符 */
    'object-curly-newline': ['error'],
    /** 强制在注释中 // 或 /* 使用一致的空格 */
    'spaced-comment': 'error',
    /** 要求或禁止使用分号代替 ASI */
    semi: ['error', 'never'],
    /** 要求箭头函数的参数使用圆括号 */
    'arrow-parens': 'error',
    /** 禁止重复模块导入 */
    'no-duplicate-imports': 'error',
    /** 禁用不必要的构造函数 */
    'no-useless-constructor': 'error',
    /** 要求使用 let 或 const 而不是 var */
    'no-var': 'error',
    /** 要求使用 const 声明那些声明后不再被修改的变量 */
    'prefer-const': 'error',
    /** 强制剩余和扩展运算符及其表达式之间有空格 */
    'rest-spread-spacing': 'error',
    /** react 匿名函数组件 */
    'react/display-name': 'off',
    /** 不使用react自身的类型检查，使用ts的  */
    'react/prop-types': 'off',
    // https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    /** react hooks 空数组 */
    'react-hooks/exhaustive-deps': 'off',
    /** 强制使用一致的类型断言 */
    '@typescript-eslint/consistent-type-assertions': 'error',
    /** 需要函数和类方法的显式返回类型 */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** 导出函数和类的公共类方法需要显式返回和参数类型 */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /** 禁止未使用的变量 */
    '@typescript-eslint/no-unused-vars': 'off',
    /** 禁止空函数 */
    '@typescript-eslint/no-empty-function': 'off',
    /** 禁止声明空接口 */
    '@typescript-eslint/no-empty-interface': 'error',
    /** 禁止使用any类型 */
    '@typescript-eslint/no-explicit-any': 'off',
    /** 需要在类型注释周围保持一致的间距 */
    '@typescript-eslint/type-annotation-spacing': 'error',
    /** 强制默认参数放在最后 */
    '@typescript-eslint/default-param-last': 'error',
    /** 禁止重复的班级成员 */
    '@typescript-eslint/no-dupe-class-members': 'error',
    /** 禁止不必要的括号 */
    '@typescript-eslint/no-extra-parens': 'off',
    /** 驼峰命名 */
    '@typescript-eslint/camelcase': 'off',
    /** 禁止混淆this */
    '@typescript-eslint/no-this-alias': 'off',
    /** 禁止在 import 语句之外使用 require 语句 */
    '@typescript-eslint/no-var-requires': 'off',
    /** 禁止使用特定类型 */
    '@typescript-eslint/ban-types': 'off',

    /** 导入的模块内部有未解决的lint问题 */
    'import/no-unresolved': 'off',
    /** 确保命名导入对应于远程文件中的命名导出 */
    'import/named': 'off',

    /** 事件绑定 */
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',

    /** prettier 语法格式 */
    'prettier/prettier': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-named-as-default': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {}
};
