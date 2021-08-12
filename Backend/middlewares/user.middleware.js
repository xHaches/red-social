const Joi = require("joi");
const UserDTO = require("../dto/user.dto");


const userDto = new UserDTO();

class UserMiddlewares {
    
    async checkPostUser(req, res, next) {
        try{
            await Joi.attempt(req.body, userDto.post);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async checkPutUser(req, res, next) {
        try{
            await Joi.attempt(req.body, userDto.put);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = UserMiddlewares