const Joi = require("joi");


class ParamsDTO {
    id = Joi.object().keys({
        id: Joi.number().integer().positive().required()
    });
}


module.exports = ParamsDTO;