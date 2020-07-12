import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { IsAuthorized } from '../middleware/authorize.middleware';
import { ApolloError } from 'apollo-server-express';
import { validateOrReject } from 'class-validator';
import { ClientFilter, ClientInput } from '../typedef/client.typedef';
import { Client } from '../entity/client.entity';

@Resolver()
export class ClientResolver {

    @Query(() => [Client])
    @UseMiddleware(IsAuthorized)
    async clients(@Arg('filter', { nullable: true }) filter?: ClientFilter) {
        try {
            if (filter) {
                if (filter.id) {
                    return await Client.find({ where: { id: filter.id } });
                } else if (filter.email) {
                    return await Client.find({ where: { email: filter.email } });
                } else if (filter.phoneNumber){
                    return await Client.find({ where: { phoneNumber: filter.phoneNumber } });
                } else {
                    let whereClause = [];
                    if (filter.nameLike) {
                        whereClause.push(`"Client"."fullName" ILIKE '%${filter.nameLike}%'`)
                    }
                    if (filter.addressLike) {
                        whereClause.push(`"Client"."address" ILIKE '%${filter.addressLike}%'`)
                    }
                    return await Client.find({
                        where: whereClause,
                        take: filter.limit,
                        skip: filter.skip,
                        order: {
                            id: filter.order
                        }
                    });
                }
            } else {
                filter = new ClientFilter();
            }
            return await Client.find({
                take: filter.limit,
                skip: filter.skip,
                order: {
                    id: filter.order
                }
            });
        } catch (e) {
            return new ApolloError(e.details ?? 'Unexpected error occurred.', e.code ?? '500');
        }
    }

    @Mutation(() => Client)
    @UseMiddleware(IsAuthorized)
    async saveClient(@Arg('input') input: ClientInput) {
        try {
            await validateOrReject(input);
                const client = new Client(input.fullName, input.address, input.email, input.phoneNumber);
            if (await client.save()) {
                return client;
            }
            return new ApolloError('Unexpected error occurred.', '500');
        } catch (e) {
            return new ApolloError(e.details ?? 'Unexpected error occurred.', e.code ?? '500');
        }
    }
}