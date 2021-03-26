import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import pkg from '../package.json'

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion(pkg.version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('apis', app, document)
}
