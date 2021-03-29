import * as path from 'path'
import { ClientOptions, Transport } from '@nestjs/microservices'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero', // ['grpc-hero', 'grpc-hero2']
    protoPath: path.join(__dirname, './modules/grpc/grpc-hero.proto') // ['./grpc-hero.proto', './grpc-hero2.proto']
  }
}
