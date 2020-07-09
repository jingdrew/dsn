const userResolver = {
    Query: {
        user: () => ( { username: 'Jing', password: 'Du' } )
    },

    Mutation: {
        user: (username: string) => ( { username: username, password: 'Du' } )
    }
};

export default userResolver;