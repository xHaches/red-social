const Joi = require("joi");

class AuthDTO {
    emailAndPassword = Joi.object().keys({
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(6).max(50).required(),
    });
}

module.exports = AuthDTO;