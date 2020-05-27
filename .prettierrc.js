/**
 * @See https://prettier.io/docs/en/options.html
 * @Message jsx tsx 使用 双引号
 * @Message js 使用单引号
 * @Message 末尾分号
 * @Message ...
 */
module.exports = {
  /** 单行字符数，超出换行 */
  printWidth: 160,
  /** tab缩进空格 n */
  tabWidth: 2,
  /** true[使用tab缩进符缩进]; false[使用空格缩进] */
  useTabs: false,
  /** 行尾是否需要分号 */
  semi: true,
  /** 双引号 */
  quotes: false,
  /** 单引号 */
  singleQuote: true,
  /** jsx 单引号 */
  jsxSingleQuote: false,
  /** 行末尾逗号 [<es5|none|all>] */
  trailingComma: 'none',
  /** 大括号内的首尾空格 eg:{ 首尾空格 ExtendsClassWrap 首尾空格 } */
  bracketSpacing: true, //
  /** jsx 标签的反尖括号换行 */
  jsxBracketSameLine: false,
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
  commentFormat: true,
  /** typescript */
  parser: 'typescript'
};
