module.exports = {
  parser: 'postcss-comment', // postcss 解析器 支持注释插件
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('cssnano'),
    require('cssnext'),
    // require('autoprefixer')({
    //   overrideBrowserslist: ['last 2 versions'],
    //   flexbox: 'no-2009'
    // }),
    require('postcss-flexbugs-fixes')
  ]
};
