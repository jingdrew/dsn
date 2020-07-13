import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../entity/user.entity';
import { hashSync } from 'bcryptjs';
import { Tax } from '../../entity/tax.entity';
import { Client } from '../../entity/client.entity';
import { Product } from '../../entity/product.entity';
import { MenuItem } from '../../entity/menuItem.entity';

export default class CreateDataForDB implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const iva = await Tax.save(new Tax('IVA', 'Impuesto al valor agregado', 0.13));
        await User.save(new User(
            'kyito',
            hashSync('123456'),
            'Jing',
            'Du',
            'jingdu@gmail.com'));
        await factory(User)().createMany(10);
        await factory(Client)().createMany(180);
        const products = await factory(Product)().createMany(300);

        let items = [];
        for (let i = 0; i < 100; i++) {
            const code = Math.floor(Math.random() * 100000);
            const price = Math.floor(Math.random() * ( 6000 - 1500 + 1 )) + 1500;
            const product = products[Math.floor(Math.random() * products.length)];
            items.push(new MenuItem(code.toString(), price, iva, product));
        }
        await MenuItem.save(items);

    }
}