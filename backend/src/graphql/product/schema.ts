const productSchema = `
    type Query {
        product: Product
    }
    
    type Mutation {
        save(name: String!): Product
    }
    
    type Product {
        name: String
        description: String
    }
`;

export default productSchema;