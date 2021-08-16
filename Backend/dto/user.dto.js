const Joi = require("joi");

class UserDTO {

    post = Joi.object().keys({
        name: Joi.string().max(50).required(),
        address: Joi.string().max(50).required(),
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(6).max(50).required(),
        age: Joi.number().integer().positive().max(200).required(),
        studies: Joi.string().min(6).max(50).required(),
        languages: Joi.string().min(6).max(50).required(),
        linkedin: Joi.string().required(),
        hobbies: Joi.string().min(6).max(50).required(),
        img: Joi.optional(),
    });
    put = Joi.object().keys({
        name: Joi.string().max(50),
        address: Joi.string().max(50),
        email: Joi.string().max(50).email(),
        password: Joi.string().min(6).max(50),
        age: Joi.number().integer().positive().max(200),
        studies: Joi.string().min(6).max(50),
        languages: Joi.string().min(6).max(50),
        linkedin: Joi.string(),
        hobbies: Joi.string().min(6).max(50),
        img: Joi.optional(),
    });
}

module.exports = UserDTO;