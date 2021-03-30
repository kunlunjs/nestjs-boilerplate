# nestjs-boilerplate

#### 介绍
NestJS Examples，收集、整理 NestJS 常用 example

#### 软件架构


#### 安装教程

```bash
nvm install 15.11.0
nvm use 15.11.0
npm i -g pnpm # 使用 pnpm 作为包管理器
pnpm i -g @nestjs/cli
pnpm i -g typescript
pnpm i -g nvm # 管理 NodeJS 版本
pnpm i -g nrm # 管理 npm 源
pnpm i -g pm2 pm2 # 作为守护进程工具
pnpm i #安装本地依赖

# 安装数据库
docker-compose up -d
```

#### 使用说明

`pnpm start:nodemon` 启动开发环境
`pnpm start:prod` 启动生产环境

如一个文件(config/development.env)已加入到 git track 并已 commit，这时想要加到 .gitignore 中
```bash
git rm -r --cached config/development.env
git add .
git commit -m "feat: 撤销已提交的敏感文件"
git push

# 安装相关数据库
docker-compose up -d 
# 查看是否运行成功
docker ps 
# 或 
docker container ls
# 进入容器内部打开 bash
docker exec -it <container-name> bash
# 进入数据库 repl
mongo -u <username> --authenticationDatabase <database-name>
# 创建数据库
use nestjs
```

为 MongoDB `nestjs` 数据库创建用户

```js
db.createUser(
   {
     user: "root",
     pwd: "1qaz2wsx",
     
     roles: [{"role":"dbAdmin","db":"nestjs"}],
    /* All built-in Roles 
     Database User Roles: read|readWrite
     Database Admin Roles: dbAdmin|dbOwner|userAdmin
     Cluster Admin Roles: clusterAdmin|clusterManager|clusterMonitor|hostManager
     Backup and Restoration Roles: backup|restore
     All-Database Roles: readAnyDatabase|readWriteAnyDatabase|userAdminAnyDatabase|dbAdminAnyDatabase
     Superuser Roles: root 
    */
    
    // authenticationRestrictions: [ {
    //     clientSource: ["192.168.0.0"],
    //     serverAddress: ["xxx.xxx.xxx.xxx"]
    //  } ],

    //mechanisms: [ "<SCRAM-SHA-1|SCRAM-SHA-256>", ... ], 

    //passwordDigestor: "<server|client>"
   }
)
```

#### 参与贡献


#### 特技

nestconfig.json 用于指定服务启动的入口文件及格式，可以缺失（默认src/main.ts）
`nest info` 输出当前操作系统及安装的 nest 相关信息

## // TODO
- 多 MongoDB 数据库支持
- 丰富 validation example
- 基于 [joi](https://joi.dev/api/?v=17.4.0) 的 [pipe](https://docs.nestjs.com/pipes#pipes) 的校验案例
- 完善 Swagger
- 丰富 Mock 扩展
- 上传文件
- 国际化i18

## 教程

1. 如何使用 NestJS 创建一个 RESTful API 接口
2. 项目目录结构及代码规范
3. 用为请求增加校验（Pipe）
4. 请求校验高级篇（一）：自定义校验函数
5. 请求校验高级篇（二）：自定义校验返回
6. 异常处理（Filter）
7. 统一响应 JSON 结构（Interceptor）
8. 如何增加“请求 ——> 响应”日志
9. 缓存的使用
10. 如何统一配置环境变量、数据库配置等
11. 理解 Module
12. 理解 Service
13. 理解 Provider
14. 理解 Guard
15. 如何生成 Swagger 文档
16. 国际化
17. 如何对接 MongoDB
18. 如何对接 PostgreSQL
19. 如何对接 MySQL
20. 如何开发 GraphQL 接口
21. GraphQL 高级篇
22. MVC
23. 静态文件服务
24. 如何在 NestJS 使用 Socket