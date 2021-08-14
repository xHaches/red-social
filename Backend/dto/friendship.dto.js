const Joi = require("joi");

class FriendshipDTO {

    post = Joi.object().keys({
        accepted: Joi.boolean().required(),
    });
    put = Joi.object().keys({
        accepted: Joi.boolean()
    });
}

module.exports = FriendshipDTO;