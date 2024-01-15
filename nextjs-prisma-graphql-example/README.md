# Nextjs example
是基于 `Nextjs@14` 搭建的例子

## 介绍

### 技术

涉及（但不限于）以下技术:

- 核心/框架
  - [Node.js](https://nodejs.org/)
  - [Next.js](https://nextjs.org/)
  - [Prisma](https://www.prisma.io/)
  - [Graphql](https://the-guild.dev/)
  - [Pothos Graphql](https://pothos-graphql.dev/)
  - [React Query](https://tanstack.com/query)
  - [Shadcn UI](https://ui.shadcn.com/docs)
  - [Tailwind CSS](https://tailwindcss.com/docs)
- DB
  - PostgreSQL
- Tooling
  - [Graphql codegen](https://the-guild.dev/graphql/codegen/docs)
  - [Eslint](https://eslint.org/)
  - [Typescript](https://typescriptlang.org/)
  - [Jest](https://facebook.github.io/jest/)
  - [Docker](https://www.docker.com/)

如果是对使用某些工具或者技术有疑问，可以查看下面的文档:

- [Why Graphql?](docs/why-graphql.md)
- [Why Shadcn UI?](docs/why-shadcn.md)

### 项目结构

```
.
├── prisma
├── src
│   ├── app
│   ├── client
│   │   ├── components
│   │   ├── graphql
│   │   ├── utils
│   ├── server
│   │   ├── drives
│   │   ├── entities
│   │   ├── errors
│   │   ├── interfaces
│   │   ├── resolvers
│   │   ├── servers
│   │   ├── graphql-builder.ts
│   │   ├── graphql-schema.ts
│   ├── shared
│   ├── tests
│   │   ├── fixtures
```

- 源码都放在 `src` 目录
- Prisma 相关文件放在 `prisma` 目录

## 开发

### 条件

- `node` >= 18
- `pnpm`
- `docker` and `docker-compose`

### Get started

```bash
# 安装依赖
pnpm install

# Env
cp .env.example .env

# 启动 MySQL
docker-compose up -d

# Generate
pnpm generate

# 运行 server ，默认端口 3000
pnpm dev
```