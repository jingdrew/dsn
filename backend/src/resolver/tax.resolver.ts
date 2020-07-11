import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Product } from '../entity/product.entity';
import { IsAuthorized } from '../middleware/authorize.middleware';
import { ApolloError } from 'apollo-server-express';
import { ProductInput } from '../typedef/product.typedef';
import { validateOrReject } from 'class-validator';
import { Tax } from '../entity/tax.entity';
import { TaxInput } from '../typedef/tax.typedef';

@Resolver()
class TaxResolver {

    @Query(() => [Tax])
    @UseMiddleware(IsAuthorized)
    async taxes() {
        try {
            return await Product.find();
        } catch (e) {
            return new ApolloError(e.details ?? 'Unexpected error occurred.', e.code ?? '500');
        }
    }

    @Mutation(() => Tax)
    @UseMiddleware(IsAuthorized)
    async saveTax(@Arg('input') input: TaxInput) {
        try {
            await validateOrReject(input);
            const tax = new Tax(input.name, input.description ?? "", input.value);
            if (await tax.save()) {
                return tax;
            }
            return new ApolloError('Unexpected error occurred.', '500');
        } catch (e) {
            return new ApolloError(e.details ?? 'Unexpected error occurred.', e.code ?? '500');
        }
    }
}