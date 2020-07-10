import { Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';

@InputType()
class InputProduct {
    @Field()
    name?: string;

    @Field()
    description?: string;
}

@ObjectType()
class Product {

    @Field()
    name?: string;

    @Field()
    description?: string;
}

@Resolver()
class ProductResolver {

    @Query(() => Product)
    product() {
        return {name: "Hola", description: "K ase"}
    }

    @Mutation(()=> Product)
    saveProduct() {
        return {name: "Mutate", description: "Meeeee"}
    }
}

export default ProductResolver;