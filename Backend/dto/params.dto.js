const Joi = require("joi");


class ParamsDTO {
    id = Joi.object().keys({
        id: Joi.number().integer().positive().required()
    });
    id_user = Joi.object().keys({
        id_user: Joi.number().integer().positive().required()
    });
    id_friend = Joi.object().keys({
        id_friend: Joi.number().integer().positive().required()
    });
    id_technology = Joi.object().keys({
        id_technology: Joi.number().integer().positive().required(),
        id_user: Joi.number().integer().positive().required()
    });
}


module.exports = ParamsDTO;