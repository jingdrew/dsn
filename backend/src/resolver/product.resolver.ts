import { Args, Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Product } from '../entity/product.entity';
import { IsAuthorized } from '../middleware/authorize.middleware';
import { ProductFilter, ProductInput } from '../typedef/product.typedef';
import { validateOrReject } from 'class-validator';
import { ApolloError } from 'apollo-server-express';
import { parseCode } from '../helper/code.helper';

@Resolver()
export class ProductResolver {

    @Query(() => [Product])
    @UseMiddleware(IsAuthorized)
    async products(@Arg('filter', { nullable: true }) filter?: ProductFilter) {
        try {
            if (filter) {
                if (filter.id) {
                    return await Product.find({ where: { id: filter.id } });
                } else {
                    if (filter.nameLike) {
                        return await Product.find({
                            where: `"Product"."name" ILIKE '%${filter.nameLike}%'`,
                            take: filter.limit,
                            skip: filter.skip,
                            order: {
                                id: filter.order
                            }
                        });
                    }
                }
            } else {
                filter = new ProductFilter();
            }
            return await Product.find({
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

    @Mutation(() => Product)
    @UseMiddleware(IsAuthorized)
    async saveProduct(@Arg('input') input: ProductInput) {
        try {
            await validateOrReject(input);
            const product = new Product(input.name, input.description);
            if (await product.save()) {
                return product;
            }
            return new ApolloError('Unexpected error occurred.', parseCode(500));
        } catch (e) {
            return new ApolloError(e.detail ?? 'Unexpected error occurred.', e.code ?? parseCode(500));
        }
    }
}