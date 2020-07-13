import { registerEnumType } from 'type-graphql';

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum OrderStatus {
    CREATED = 'CREATED',
    PREPARING = 'PREPARING',
    DELIVERING = 'DELIVERING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    UNDELIVERED = 'UNDELIVERED'
}

registerEnumType(SortOrder, {
    name: 'SortOrder'
});

registerEnumType(OrderStatus, {
    name: 'OrderStatus'
});
