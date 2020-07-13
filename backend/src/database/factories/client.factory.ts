import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Client } from '../../entity/client.entity';

define(Client, (faker: typeof Faker) => {
    const fullName = faker.name.findName();
    const address = faker.address.streetAddress();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.phoneNumber();

    return new Client(fullName, address, email, phoneNumber);
});