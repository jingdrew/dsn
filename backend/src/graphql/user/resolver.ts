const userResolver = {
    user: async ({ email, password }: { email: string, password: string }) => {
        return { key: email, value: password };
    },
};

export default userResolver;