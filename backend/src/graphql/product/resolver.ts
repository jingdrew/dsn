const userResolver = {
    product: async ({ name }: { name: string }) => {
        return { key: name, value: "something is happening" };
    },
};

export default userResolver;