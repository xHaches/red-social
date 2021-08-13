const Joi = require("joi");

class TechnologyDTO {

    post = Joi.object().keys({
        title: Joi.string().max(50).required(),
    });
    put = Joi.object().keys({
        title: Joi.string().max(50),
    });
}

module.exports = TechnologyDTO;