# Nest 项目目标

[API 文档](http://nestjs-doc.exceptionfound.com/globals.html)

Node.js 并不遵循请求/响应多线程无状态模型(Multi-Threaded Stateless Model) ，在这种模型中，每个请求都由一个单独的线程处理。因此，使用单例实例对于我们的应用程序是完全安全的。

作为 Node.js 基础脚手架模板，以后所有前端部门基于 Nest 的项目都要基于此脚手架，需要完成的每个功能特性（最小可用） example 都要可以用，全部特性包含如下：

1. [80% ] 厘清 Nest 核心概念和流程（module、service、provider、middleware、pipe、guard、exception filter、interceptor、custom decorator 等），输出文档 docs/
2. [80% ] 封装常用 middleware、pipe、guard、exception filter、interceptor
3. [100%] 支持 RESTful APIs
4. [60% ] 支持 GraphQL，支持原生 graphql、 Apollo Server，custom scalar、custom directive、calculate complexity
5. [80% ] 接口支持校验、自定义返回 transform
6. [60% ] 支持多数据库连接（MongoDB、PostgreSQL、MongoDB
7. [50% ] 数据库操作支持 TypeOrm、Monggose、Prisma
8. [100%] 支持内存缓存、基于 Redis 的缓存操作
9. [100%] 支持 MVC（render engine），渲染引擎包括 handlebars、ejs 等
10. [50% ] 支持消息队列
11. [100%] 支持定时任务
12. [    ] 支持 ElasticSearch
13. [    ] 支持多种鉴权方式：cookie/session、jwt token
14. [100%] 基于 nodemon、nest start --dev 的热更新
15. [20% ] 完善的测试                 
