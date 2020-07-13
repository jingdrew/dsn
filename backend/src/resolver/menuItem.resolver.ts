import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { IsAuthorized } from '../middleware/authorize.middleware';
import { ClientFilter, ClientInput } from '../typedef/client.typedef';
import { ApolloError } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { MenuItem } from '../entity/menuItem.entity';
import { ItemInput } from '../typedef/item.typedef';
import { Tax } from '../entity/tax.entity';
import { Product } from '../entity/product.entity';

@Resolver()
export class MenuItemResolver {
  @Query(() => [MenuItem])
  @UseMiddleware(IsAuthorized)
  async clients(@Arg('filter', { nullable: true }) filter?: ClientFilter) {
    if (filter) {
    }
    return await MenuItem.find();
  }

  @Mutation(() => MenuItem)
  @UseMiddleware(IsAuthorized)
  async saveItem(@Arg('input') input: ItemInput) {
    try {
      await validateOrReject(input);
      const tax = await Tax.findOne(input.taxId);
      if (!tax) return new ApolloError('Tax is invalid.', '400');
      const product = await Product.findOne(input.productId);
      if (!product) return new ApolloError('Product is invalid.', '400');

      const item = new MenuItem(input.code, input.price, tax, product);
      if (await item.save()) {
        return item;
      }
      return new ApolloError('Unexpected error occurred.', '500');
    } catch (e) {
      console.log(e);
      return new ApolloError(
        e.detail ?? 'Unexpected error occurred.',
        e.code ?? '500'
      );
    }
  }
}
