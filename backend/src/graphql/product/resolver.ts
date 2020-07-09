const productResolver = {
    Query: {
        product: () => ( { name: 'Birra', description: 'Que emborracha' } )
    },
    Mutation: {
        save: (name: string) => ( { name: name, description: 'Que emborracha' } )
    }
};

export default productResolver;