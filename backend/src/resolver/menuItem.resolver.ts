import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { IsAuthorized } from '../middleware/authorize.middleware';
import { ApolloError } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { MenuItem } from '../entity/menuItem.entity';
import { ItemFilter, ItemInput } from '../typedef/item.typedef';
import { Tax } from '../entity/tax.entity';
import { Product } from '../entity/product.entity';
import { parseCode } from '../helper/code.helper';

@Resolver()
export class MenuItemResolver {
    @Query(() => [MenuItem])
    @UseMiddleware(IsAuthorized)
    async menuItems(@Arg('filter', { nullable: true }) filter?: ItemFilter) {
        try {
            if (filter) {
                if (filter.code) {
                    return await MenuItem.find({ where: { code: filter.code } });
                }
            } else {
                filter = new ItemFilter();
            }
            return await MenuItem.find({
                take: filter.limit,
                skip: filter.skip,
                order: {
                    id: filter.order
                }
            });
        } catch (e) {
            console.log(e);
            return new ApolloError(e.detail ?? 'Unexpected error occurred.', e.code ?? parseCode(500));
        }
    }

    @Mutation(() => MenuItem)
    @UseMiddleware(IsAuthorized)
    async saveItem(@Arg('input') input: ItemInput) {
        try {
            await validateOrReject(input);
            const tax = await Tax.findOne(input.taxId);
            if (!tax) return new ApolloError('Tax is invalid.', parseCode(400));
            const product = await Product.findOne(input.productId);
            if (!product) return new ApolloError('Product is invalid.', parseCode(400));

            const item = new MenuItem(input.code, input.price, tax, product);
            if (await item.save()) {
                return item;
            }
            return new ApolloError('Unexpected error occurred.', parseCode(500));
        } catch (e) {
            console.log(e);
            return new ApolloError(
                e.detail ?? 'Unexpected error occurred.',
                e.code ?? parseCode(500)
            );
        }
    }
}
