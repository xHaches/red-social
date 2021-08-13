const Joi = require("joi");
const { FriendshipDTO } = require("../dto");


const friendshipDTO = new FriendshipDTO();

class FriendshipMiddlewares {
    
    async checkPostFriendship(req, res, next) {
        try{
            await Joi.attempt(req.body, friendshipDTO.post);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async checkPutFriendship(req, res, next) {
        try{
            await Joi.attempt(req.body, friendshipDTO.put);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = FriendshipMiddlewares;