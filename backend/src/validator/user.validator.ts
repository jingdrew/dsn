import * as yup from 'yup';

export const signUpValidator = (arg: any) => {
    const userSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        username: yup.string().min(6).required(),
        password: yup.string().min(6).required(),
    });

    return userSchema.validate(arg).then(() => undefined).catch((e) => e);
};
