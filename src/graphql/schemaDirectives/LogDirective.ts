import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

/**
 * Example of a schema directive that logs the
 * annontated field name and value.
 */

export default class LogDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    field.resolve = async (source, args, ctx, info) => {
      // tslint:disable-next-line
      console.log(`${field.name}: ${source[field.name]}`);
      return source[field.name];
    };
  }
}
