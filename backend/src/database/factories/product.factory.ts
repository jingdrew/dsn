import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Product } from '../../entity/product.entity';

define(Product, (faker: typeof Faker) => {
    const name = faker.commerce.productName()
    const description = faker.lorem.sentence();

    return new Product(name, description);
});