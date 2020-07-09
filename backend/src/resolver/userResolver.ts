export default {
    Query: {
        user: () => ( { username: 'Jing', password: 'Du' } )
    },

    Mutation: {
        signUp: async (source: any, args: any) => {
            console.log('2 -> ' + args.input.username);
            return { username: 'username', password: 'Du' };
        }
    }
};