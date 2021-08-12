const Joi = require("joi")


const { ParamsDTO } = require('../dto');

const paramsDTO = new ParamsDTO();

class ParamsMiddlewares {
    async checkId (req, res, next) {
        try{
            await Joi.attempt(req.params, paramsDTO.id);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}


module.exports = ParamsMiddlewares