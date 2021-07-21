import { SchemaDirectiveVisitor } from 'apollo-server'
import type { GraphQLField } from 'graphql'
import { defaultTypeResolver } from 'graphql'

export class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultTypeResolver } = field
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result.toUpperCase()
      }
      return result
    }
  }
}
