module.exports = {
  /** 单行字符数，超出换行 */
  printWidth: 120,
  /** tab缩进空格 n */
  tabWidth: 2,
  /** true[使用tab缩进符缩进]; false[使用空格缩进] */
  useTabs: false,
  /** 行尾是否需要分号 */
  semi: false,
  /** 双引号 */
  quotes: false,
  /** 单引号 */
  singleQuote: true,
  /** jsx 单引号 */
  jsxSingleQuote: false,
  /** 行末尾逗号 [<es5|none|all>] */
  trailingComma: 'es5',
  /** 大括号内的首尾空格 eg:{ 首尾空格 ExtendsClassWrap 首尾空格 } */
  bracketSpacing: true, //

  /** jsx 标签的反尖括号换行 */
  /** v2.4.0 后弃用 */
  // jsxBracketSameLine: false,
  // v2.4.0 后启用
  bracketSameLine: false,

  /** 箭头函数，只有一个参数的时候，是否需要括号 <always=true|avoid=false> */
  arrowParens: 'always',
  /**
   * 每个文件格式化的范围是文件的全部内容
   * 从 rangeStart int = 0 开始格式化
   * 到 rangeEnd   int = Infinity 结束格式化
   * 从0到无穷大，整个文件
   */
  rangeStart: 0,
  rangeEnd: Infinity,
  /** 是否需要写文件开头的 @prettier */
  requirePragma: false,
  /** 是否需要自动在文件开头插入 @prettier */
  insertPragma: false,
  /** 使用的换行标准 <always|never|preserve> */
  proseWrap: 'preserve',
  /** 根据显示样式决定 html 要不要换行 */
  htmlWhitespaceSensitivity: 'css',
  /** 换行符 <lf|crlf|cr|auto> */
  endOfLine: 'auto',
  /** 注释格式化 */
  commentFormat: true
};
