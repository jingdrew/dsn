import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../entity/user.entity';
import { hashSync } from 'bcryptjs';

define(User, (faker: typeof Faker) => {
    const username = faker.internet.userName();
    const password = hashSync(faker.internet.password(), 12);
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return new User(username, password, firstName, lastName, email);
});