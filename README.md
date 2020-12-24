# @xeajs/electron

快速开始、渐进式、沉浸式、高可用、可配置、模块化、语义化、一键开发、一键打包。

## 系统架构

<!-- https://www.jianguoyun.com -->
<span style="background: #f1f1f1;display: inline-block;">
  <img src="docs/screenshot/framework.png">
</span>

## Install

```bash

git clone https://github.com/xeajs/electron myapp

```

## 跨端

* exe Windows7、Window10 (x86、x64)
* app Darwin (Mac Os)
* deb Linux (Ubuntu)

## 技术栈

### `内核`

```js
electron                  ==>   客户端运行时
electron-builder          ==>   客户端打包
```

### `主进程 - 本地服务服务端`

```js
Typescript
node
koa
nedb            ==>   Node嵌入式数据库、本地持久化、加密
...
```

### `渲染进程 - 窗口界面`

```js
Typescript
React
React-router
Mobx
axios
antd
dayjs             ==>   日期处理工具、轻量级
...
```

### `CLI 构建`

```js
webpack
babel
babel/preset-typescript
...
```

### `CLI 效率、工具`

```js
prettier
eslint                    ==>   可配置开关、开发环境运行时
tslint                    ==>   可配置开关、开发环境运行时、子进程基于 tsc -w
husky
lint-staged
...
```

## 核心能力

* 提供持久化到本地磁盘的能力
  * 自动检测/创建磁盘存储目录和文件
  * 开箱即用的数据库环境 `nedb Nodejs 嵌入式数据库`
  * 开箱即用的持久化配置文件 `setting.json`, `并在渲染进程基于mobx实时更新`
  * 开箱即用的日志收集能力，和日志过期管理 `$$.log`
  * 开放的扩展能力

* 提供开箱即用高度可配置的前端工程化打包环境
  * 一键进入开发模式
  * 一键打包构建软件包
  * 自动分配版本打包号 （如：`Application Setup Version-BUILD_NUMBER.exe|app|deb`）
  * 主进程编辑热重启
  * 渲染进程编辑热替换 （热替换可以保留类似表单上次编辑的内容，体验更好）
  * 内置git钩子，钩子触发 eslint 和 tslint，触发周期为 `git commit`
  * 内置工程化脚本，可高度定制，自定义二次配置
  * 内置代码编译脚本和Typescript编译 （Typescript为主）

* 内置全局命名空间 `$$`, 提供全局自定义功能
  * $$.Event 内置发布订阅辅助工具，基于 ts 约束 订阅事件名字
  * $$.log 开箱即用的日志系统
  * $$.** 通用工具函数 查看 `typings`
* 业务代码全程使用`Typescript`编写
* 工程化相关代码使用 `Nodejs、JavaScript` 编写
* 区分前端代码和主进程代码分开编译和引用
* 内置 vscode 编辑器的项目配置
* sort-imports vscode 插件提供自动对 import 排序
* `antd`组件库 主题配置
* 基于 React.lazy 和 React.Suspense 实现前端路由懒加载
* styled-jsx `css in js 方案`

## styled-jsx

* 模式 css in js
* 框架 styled-jsx
* vscode 插件
  * github [https://github.com/Divlo/](https://github.com/Divlo/)
  * 代码高亮插件 插件市场搜索 `divlo.vscode-styled-jsx-syntax`
  * 代码提示插件 插件市场搜索 `divlo.vscode-styled-jsx-languageserver`
* 注意事项, 样式输出报错， 大括号换行无法检测到样式
* @See: <https://github.com/Grimones/vscode-styled-jsx-languageserver/issues/2>

<h4 style="color: red;">错误写法</h4>

```jsx
<style jsx>
  {`
      .app-style {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
      }
  `}
</style>
```

<h4 style="color: green;">正确写法</h4>

``` jsx
 <style jsx>{`
    .app-style {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
`}</style>

```

## TODO

* [Issues](https://github.com/xeajs/electron/issues)

## CHANGELOG

* [changelog](docs/CHANGELOG.md)

## 写在最后

1. 欢迎交流
1. 欢迎体验
1. 欢迎 Issues
1. 感谢 Star
1. [联系作者](https://xeajs.gitee.io/about)
