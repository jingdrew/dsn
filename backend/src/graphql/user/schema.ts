const userSchema = ` 
    type User {
        username: String
        password: String
    }
    
    type Query {
        user: User
    }
    
    type Mutation {
        save(username: String!): User
    }
`;

export default userSchema;