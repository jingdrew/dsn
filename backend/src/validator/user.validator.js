import Joi from '@hapi/joi';

const signupValidator = (req, res, next) => {
  const userSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const result = userSchema.validate(req.body);
  if (result.error)
    return res.status(400).json({ error: result.error.details[0].message });
  next();
};

const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object().keys({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const result = loginSchema.validate(req.body);
  if (result.error)
    return res.status(400).json({ error: result.error.details[0].message });
  next();
};

module.exports = { signupValidator, loginValidator };
