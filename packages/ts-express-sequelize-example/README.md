# Express Fast Framework
是基于 `Express` 和 `TypeScript` 搭建的后端快速开发框架  
[![Build Status](https://travis-ci.com/michaelchan0101/express-fast-framework.svg?branch=development)](https://travis-ci.com/michaelchan0101/express-fast-framework)

## 介绍

### 技术

涉及（但不限于）以下技术:

- 核心/框架
  - [nodejs](https://nodejs.org/)
  - [express](https://expressjs.com/)
  - [swagger](https://swagger.io)
  - [jwt](https://www.jwt.io/)
- DB
  - MySQL
- Tooling
  - [eslint](https://eslint.org/)
  - [typescript](https://typescriptlang.org/)
  - [jest](https://facebook.github.io/jest/)
  - [docker](https://www.docker.com/)

### 项目结构

```
.

├── src
│   ├── cli
│   ├── config
│   ├── controllers
│   ├── drivers
│   ├── errors
│   ├── interfaces
│   ├── middlewares
│   ├── migrations
│   ├── models
│   ├── services
│   ├── tests
│   ├── transformers
│   ├── utils
│   ├── validators
│   ├── app.ts
│   └── index.ts
```

- 源码都放在 `src` 目录
- `cli` 里面有各种命令行执行的工具
- `app.js` 和 `index.js` 是入口文件

## 开发

### 条件

- `node` >= 12
- `yarn`
- `docker` and `docker-compose`

### Get started

```bash
# 安装以来
yarn install
# 启动 MySQL
docker-compose up -d
# 运行 server ，默认端口 3000
yarn dev
# 运行单元测试
yarn test
```