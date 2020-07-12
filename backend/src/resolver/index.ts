import { UserResolver } from './user.resolver';
import { ClientResolver } from './client.resolver';
import { ProductResolver } from './product.resolver';
import { MenuItemResolver } from './menuItem.resolver';
import { OrderResolver } from './order.resolver';
import { TaxResolver } from './tax.resolver';
import { buildSchemaSync } from 'type-graphql';

export default buildSchemaSync({
    resolvers: [
        ClientResolver,
        ProductResolver,
        TaxResolver,
        UserResolver,
        MenuItemResolver,
        OrderResolver
    ]
});