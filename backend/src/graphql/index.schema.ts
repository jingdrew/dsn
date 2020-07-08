import { userSchema } from './user/schema';
import { productSchema } from './product/schema';

const rootSchema = {
    user: userSchema,
    product: productSchema
}

export default userSchema;