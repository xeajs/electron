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

* 一键式进入开发模式，一键打包。良好的开发体验和交付体验
* electron 提供项目运行时
* nodejs 提供CLI 脚本能力
* webpack 提供React、Ts代码编译和构建
* 区分前端代码和主进程代码分开编译和引用
* 项目代码使用TS编写
* 提供常规的前端开发体验，热更新，webpack编译速度优化
* 基于 React.lazy 和 React.Suspense 实现前端路由懒加载
* eslint 提供代码 `eslint` 检测
* tsc 提供代码 `tslint` 检测、不输出文件，只进行静态类型检测
* sort-imports vscode 插件提供自动对 import 排序
* 内置 vscode 编辑器的项目配置
* 内置 `git 钩子` 代码提交到仓库时检测。检测es代码风格，检测ts静态类型
* 内置全局命名空间 `$$`, 提供全局自定义功能
* 内置自定义Event, 基于 ts 约束 订阅时间名字，挂载到 `$$`
* 内置类型判断辅助函数，挂载到 `$$`
* 内置配置持久化功能 自动检测/创建磁盘存储目录和文件
* 内置配置持久化功能 `setting`，持久化到磁盘 setting.json, 引用对象挂载到 `$$`
* 内置配置持久化功能 `nedb数据库`，持久化到磁盘，主进程自动引用
* 内置CI构建打包软件名称配版本号 `Application Setup Version-BUILD_NUMBER.exe|app|deb`
* 内置日志持久化，基于 `$$.log` 输出的日志，自动持久化收集到本地，日志默认保留7天，可配置

## styled-jsx

* 模式 css in js
* 框架 styled-jsx
* vscode css 代码高亮插件 vscode-styled-jsx
* vscode css 代码提示插件 styled-jsx Language Server 1.0.1
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

* Demo页面设计和优化，更好的便捷扩展
* 文档README优化

## CHANGELOG

See: [changelog](docs/CHANGELOG.md)

## 写在最后

1. 欢迎交流
1. 欢迎体验
1. 欢迎 Issues
1. 感谢 Star
1. 联系作者  [webhref.com](https://www.webhref.com/)
