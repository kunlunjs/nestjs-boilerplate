# nestjs-boilerplate

#### 介绍
NestJS 项目模板，集成多种 Examples，根据实际项目需要自行裁剪

#### 软件架构


#### 安装教程

```bash
npm i -g pnpm # 使用 pnpm 作为包管理器
pnpm i -g @nestjs/cli typescript nvm nrm pm2 # 用 nvm 管理 NodeJS 版本， 用 nrm 管理 npm 源，  pm2 作为守护进程工具
nvm install 15.11.0 # 安装 NodeJS 15.11.0 版本
nvm use 15.11.0 # 使用 15.11.0 版本
pnpm i #安装本地依赖

# 安装数据库
docker-compose up -d
```

#### 使用说明

`pnpm i` 安装依赖
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
# 创建数据库：nestjs
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


#### 配置

`nestconfig.json` 用于指定服务启动的入口文件及格式，可以缺失（默认src/main.ts）
`nest info` 输出当前操作系统及安装的 nest 相关信息

```
AppModule consumer -> next()
  Module consumer ->
  Module consumer ->
AppModule consumer ->
ModuleControllerGuard ->
   ModuleMethodGuard ->
      全局拦截器 1 ->
      ...
      全局拦截器 n ->
         业务模块控制器拦截器 1 ->
         ...
         业务模块控制器拦截器 n -> 
            业务模块方法拦截器 1 ->
            ...
            业务模块方法拦截器 n ->
               业务模块控制器管道 1 ->
               ...
               业务模块控制器管道 n
                  业务模块方法管道 1 ->
                  ...
                  业务模块方法管道 n ->
                     方法 ->
                     service 1 ->
                     ...
                     service n ->
                     方法 ->
            业务模块方法拦截器 n ->
            ...
            业务模块方法拦截器 1 ->
         业务模块控制器拦截器 n ->
         ...
         业务模块控制器拦截器 1 ->
      全局拦截器 n ->
      ...
      全局拦截器 1 ->
```

## // TODO
- 多 MongoDB 数据库支持
- 丰富 validation example
- 基于 [joi](https://joi.dev/api/?v=17.4.0) 的 [pipe](https://docs.nestjs.com/pipes#pipes) 的校验案例
- 完善 Swagger
- 丰富 Mock 扩展
- 上传文件
- 国际化i18

## NestJS 教程

1. [NestJS 核心概念与能力体系介绍]()
2. [配置项目目录结构、代码规范、热更新等]()
3. [前置基础知识：Class、Decorator、TypeScript、reflect-metadata、RxJS]()
4. [NestJS 基于数据流动的架构]()
5. [NestJS API 概览]()
6. [如何使用 NestJS 创建一个简单 RESTful API 接口]()
7. [用为请求增加校验（Pipe）]()
8. [请求校验高级篇（一）：自定义校验函数]()
9. [请求校验高级篇（二）：自定义校验返回]()
10. [上传文件]()
11. [异常处理（Filter）]()
12. [通过统一响应 JSON 结构来理解 Interceptor]()
13. [如何增加“请求 ——> 响应”日志]()
14. [日志高级篇]()
15. [缓存的使用]()
16. [如何统一配置环境变量、数据库配置等]()
17. [理解 Module（普通模块、动态模块、全局模块）]()
18. [理解 Service 和 Provider]()
19. [登录鉴权的方式及使用]()
20. [权限验证的几种方式及使用]()
21. [通过路由权限保护来理解 Guard]()
22. [权限高级篇]()
23. [自定义装饰器]()
24. [理解 Middleware]()
25. [如何生成在线 Swagger 文档]()
26. [如何做国际化]()
27. [如何使用微服务]()
28. [如何集成 GRPC]()
29. [TypeORM 介绍及使用]()
30. [集成 TypeORM + MongoDB]()
31. [集成 Mongoose + MongoDB]()
32. [集成 TypeORM + PostgreSQL]()
33. [集成 TypeORM + MySQL]()
34. [集成 Sequelize]()
35. [集成 PrismaJS]()
36. [微信和支付宝支付 Example]()
37. [如何开发 GraphQL 接口]()
38. [GraphQL 高级篇]()
39. [Model-View-Controller]()
40. [静态文件服务]()]()
41. [Server Sent Event]()
42. [集成 Websocket 和 Socket.io]()
43. [支持 Serverless]()
44. [集成消息队列]()
45. [集成定时任务]()
46. [集成 ElasticSearch]()
47. [健康检查]()
48. [NestJS 生命周期]()
49. [如何集成 NextJS]()
50. [测试]()
51. [接入异常、性能等服务监控系统]()
52. [NestJS 核心思想与源码概述]()
53. [项目实战]()