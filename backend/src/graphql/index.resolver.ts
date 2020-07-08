import userResolver from './user/resolver';
import productResolver from './product/resolver';

const rootResolver = {
    user: userResolver,
    product: productResolver
}

export default rootResolver;