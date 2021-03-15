# Model-View-Controller

## 支持哪些模板引擎？
- handlebars
- ejs

## 基本使用
```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, '../public'))
  app.setBaseViewsDir(join(__dirname, '../views'))
  app.setViewEngine('hbs')
  //...
}

//app.controller.ts
import {
  Controller,
  Get,
  Render
} from '@nestjs/common'

@Controller()
export class AppController {
  /**
   * MVC 渲染动态模板
   * http://localhost:3000/api/hbs
   */
  @Get('hbs')
  @Render('index') // views/index.hbs
  render() {
    return { message: 'Hello Handlebars!' }
  }
}

```