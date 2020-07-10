import * as yup from 'yup';

export const validateSignUpInput = (args: any) => {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        username: yup.string().min(6).required(),
        password: yup.string().min(6).required(),
    });
    return schema.validateSync(args);
};

export const validateAuthInput = (args: any) => {
    const schema = yup.object().shape({
        username: yup.string().min(6).required(),
        password: yup.string().min(6).required(),
    });
    return schema.validateSync(args);
}