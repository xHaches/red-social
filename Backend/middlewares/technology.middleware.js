const Joi = require("joi");
const { TechnologyDTO } = require("../dto");


const technologyDto = new TechnologyDTO();

class TechnologyMiddlewares {
    
    async checkPostTechnology(req, res, next) {
        try{
            await Joi.attempt(req.body, technologyDto.post);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async checkPutTechnology(req, res, next) {
        try{
            await Joi.attempt(req.body, technologyDto.put);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = TechnologyMiddlewares;