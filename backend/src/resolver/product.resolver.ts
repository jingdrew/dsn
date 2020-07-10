import { Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Product } from '../typedef/product.typedef';
import { IsAuthorized } from '../middleware/authorize.middleware';

@Resolver()
class ProductResolver {

    @Query()
    @UseMiddleware(IsAuthorized)
    product(): Product {
        return { name: 'Hola', description: 'K ase' };
    }

    @Mutation(() => Product)
    saveProduct() {
        return { name: 'Mutate', description: 'Meeeee' };
    }
}

export default ProductResolver;