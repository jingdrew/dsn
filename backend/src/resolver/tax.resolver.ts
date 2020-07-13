import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { IsAuthorized } from '../middleware/authorize.middleware';
import { ApolloError } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { Tax } from '../entity/tax.entity';
import { TaxFilter, TaxInput } from '../typedef/tax.typedef';
import { parseCode } from '../helper/code.helper';

@Resolver()
export class TaxResolver {

    @Query(() => [Tax])
    @UseMiddleware(IsAuthorized)
    async taxes(@Arg("filter", {nullable: true}) filter: TaxFilter) {
        try {
            if (filter) {
                if (filter.id) {
                    return await Tax.find({ where: { id: filter.id } });
                } else {
                    if (filter.nameLike) {
                        return await Tax.find({
                            where: `"Tax"."name" ILIKE '%${filter.nameLike}%'`,
                            take: filter.limit,
                            skip: filter.skip,
                            order: {
                                id: filter.order
                            }
                        });
                    }
                }
            } else {
                filter = new TaxFilter();
            }
            return await Tax.find({
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

    @Mutation(() => Tax)
    @UseMiddleware(IsAuthorized)
    async saveTax(@Arg('input') input: TaxInput) {
        try {
            await validateOrReject(input);
            const tax = new Tax(input.name, input.description ?? "", input.value);
            if (await tax.save()) {
                return tax;
            }
            return new ApolloError('Unexpected error occurred.', parseCode(500));
        } catch (e) {
            return new ApolloError(e.detail ?? 'Unexpected error occurred.', e.code ?? parseCode(500));
        }
    }
}