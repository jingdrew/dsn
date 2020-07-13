import { Arg, Mutation, Resolver } from 'type-graphql';
import { Order } from '../entity/order.entity';
import { OrderInput } from '../typedef/order.typedef';
import { validateOrReject } from 'class-validator';
import { ApolloError } from 'apollo-server-express';
import { parseCode } from '../helper/code.helper';
import { Client } from '../entity/client.entity';
import { MenuItem } from '../entity/menuItem.entity';

@Resolver()
export class OrderResolver {

    @Mutation(() => Order)
    async saveOrder(@Arg('input') input: OrderInput) {
        await validateOrReject(input);
        try {
            const client = await Client.findOne(input.clientId);
            if (!client) {
                return new ApolloError('Client not found.', parseCode(404));
            }
            const items = await MenuItem.findByIds(input.items);
            if (items.length == 0) {
                return new ApolloError('No menu item provided.', parseCode(400));
            }
            const order = new Order(input.ordNumber, input.notes, items, client, input.orderStatus);
            if (await order.save()) {
                return order;
            }
            return new ApolloError('Unexpected error occurred.', parseCode(500));
        } catch (e) {
            return new ApolloError(e.detail ?? 'Unexpected error occurred.', e.code ?? parseCode(500));
        }
    }

}