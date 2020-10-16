var path = require('path');
// node模块 懒加载
module.exports = function () {
  var envPath = process.env.NODE_ENV === 'development' ? './' : './resources/app.asar.unpacked/';
  return `
    var getModule = function () {
        var node = require("${envPath}public/plugins/${path.basename(this.resourcePath)}");
        getModule = function() {return node};
        return node;
    }
    Object.defineProperty(module,'exports',{
        configurable : true,
        enumerable : true,
        get(){
            return getModule();
        }
    });`;
};
