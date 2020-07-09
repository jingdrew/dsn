export default {
    Query: {
        product: () => ( { name: 'Birra', description: 'Que emborracha' } )
    },
    Mutation: {
        saveProduct: (name: string) => ( { name: name, description: 'Que emborracha' } )
    }
};