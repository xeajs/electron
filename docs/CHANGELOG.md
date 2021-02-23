# CHANGELOG

## V2.2.2 `2021-02-22`

- 修复npm包 `styled-jsx` 版本升级问题 `https://github.com/vercel/styled-jsx/issues/695`
- 代码优化

## V2.2.1 `(2020-12-22)`

- 全新的简化的demo界面
- 自定义滚动条样式
- 代码简化
- 清理过期无用文件
- 优化项目结构
- 替换styled-jsx 的vscode插件，弃用烂尾不维护的插件项目
- 添加渲染进程异常监听，错误日志收集。适用于渲染进程出错无法正常显示窗口
- 内置日志系统的日志输出过滤终端颜色字符集的字符输出
- 系统内置默认软件图标
- 根据package.json 自动设置外部存储目录和AppID，添加开发启动时自动显示相关信息
- 修复 app.asar.unpacked 目录在 跨系统下的不一致导致的部署目录异常问题
- 弃用app.asar.unpacked, 所有文件打包到app.asar，确保跨系统有统一表现
- 缩减命名空间内容，抽离全局软件配置单独管理，拆分软件配置模块，前端界面模块，后台业务模块
- 抽离 打包配置到 electron-builder-config.js
- 添加Windows下的注册表管理，自定义url协议调起软件 `xeajs://`
- 添加菜单快捷键，慎用全局快捷键
- 弃用 babel-plugin-import， 添加 antd主题定制配置功能
- 配置 ts版本对应的 @types， 自定义 koa.ctx.request.body 类型， 排除tslint时候的 @types报错
- 修改CI打包号，自动改名，实现逻辑，以环境变量 BUILD_NUMBER 为准 `npm run test:build:ci`
- 取消使用 koa-compress。会导致服务响应 WaitingTTFB 时间过长
- 打包速度优化和webpack配置

## V2.2.0

- bug

## V2.0.1

- bug

## V1.0.0 `(2020-08-28)`

- 项目创建
- 添加配置文件 config.js、可配置项目打包和运行时配置
- .xea 工程，内置构建打包工具
- views 初始化界面结构搭建
- serve 初始化主进程结构搭建
- global 初始化全局方法和命名空间
- 本地数据持久化、配置文件、本地存储目录
- 构建打包，图标，输出，根据打包系统环境自动打包
- 自定义系统控制器，Mac和Windows
- typings 项目Typescript配置
- types 初始化项目基础类型配置
- public 初始化项目默认资源
- prettierr 配置
- eslint 配置
- tslint 配置。基于子进程启动 tsc -w监控，可开关控制
- 配置npm镜像
- tsconfig.json 配置
- vscode 编辑器配置
- Event 发布订阅工具。主进程和所有渲染进程都可发布和订阅到消息， 为了统筹管理发布订阅，eventname必须是手动枚举列表内的项
