import { Plugin } from '@nestjs/graphql'
import type {
  ApolloServerPlugin,
  GraphQLRequestListener
} from 'apollo-server-plugin-base'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(): GraphQLRequestListener {
    console.log('GraphQL request started')
    return {
      willSendResponse() {
        console.log('Will send response')
      }
    }
  }
}
