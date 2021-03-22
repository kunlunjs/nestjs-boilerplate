# nestjs-boilerplate

#### 介绍
nestjs example 集合

#### 软件架构


#### 安装教程

`nvm install 15.11.0`
`nvm use 15.11.0`
`npm i -g pnpm` 使用 pnpm 作为包管理器
`pnpm i -g @nestjs/cli`
`pnpm i -g typescript`
`pnpm i -g nvm` 管理 NodeJS 版本
`pnpm i -g nrm` 管理 npm 源
`pnpm i -g pm2` pm2 作为守护进程工具
`pnpm i` 安装本地依赖

#### 使用说明

`pnpm start:nodemon` 启动开发环境
`pnpm start:prod` 启动生产环境

#### 参与贡献


#### 特技

nestconfig.json 用于指定服务启动的入口文件及格式，可以缺失（默认src/main.ts）
`nest info` 输出当前操作系统及安装的 nest 相关信息