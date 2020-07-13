export const parseCode = (code: number) => {
    switch (code) {
        case 200:
            return 'SUCCESS';
        case 201:
            return 'CREATED';
        case 400:
            return 'BAD_REQUEST';
        case 401:
            return 'NOT_AUTHORIZED';
        case 403:
            return 'RESOURCE_IS_FORBIDDEN';
        case 404:
            return 'RESOURCE_NOT_FOUND';
        default:
            return 'INTERNAL_SERVER_ERROR';
    }
};