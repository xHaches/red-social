const Joi = require("joi");

class QualificationDTO {

    post = Joi.object().keys({
        stars: Joi.number().precision(1).required()
    });
    put = Joi.object().keys({
        stars: Joi.number().precision(1)
    });
}

module.exports = QualificationDTO;