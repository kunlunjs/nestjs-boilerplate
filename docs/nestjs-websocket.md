# WebSocket & socket.io

## WebSocket

依赖
- `ws`
- `@types/ws`
- `@nestjs/platform-ws`
- `@nestjs/websockets`


```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new WsAdapter(app))
  //...
}
// src/modules/events/websocket-events.gateway.ts
// src/modules/events/websocket-events.module.ts
```

## socket.io

依赖
- `socket.io`
- `@types/socket.io`
- `socket.io-redis`
- `@types/socket.io-redis`
- `@nestjs/websockets`
- `@nestjs/platform-socket.io`


```ts
// src/modules/events/adapter/redis-io.adapter.ts
// src/modules/events/socket.io-events.gateway.ts
// src/modules/events/socket.io-events.module.ts
```