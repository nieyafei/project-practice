# TS版本+craco配置

## 初始化环境
> yarn create react-app react-base-ts --template typescript

## 配置环境变量

> yarn add @craco/craco
> yarn add craco-less

## 配置Typescript环境

> yarn add react-router-dom @types/react-router-dom @types/react-redux react-redux redux

## 配置

> yarn add compression-webpack-plugin webpack-bundle-analyzer

**compression-webpack-plugin**: 打包生成gzip
**webpack-bundle-analyzer**： 分析build体积


## 配置端口号代理



## 目录
├── mock // 数据存放
├── src
│ ├── components // 组件
│ ├── pages // 页面
│ ├── utils // 公共
├── global // 全局