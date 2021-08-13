const Joi = require("joi");
const { QualificationDTO } = require("../dto");


const qualificationDto = new QualificationDTO();

class QualificationMiddlewares {
    
    async checkPostQualification(req, res, next) {
        try{
            await Joi.attempt(req.body, qualificationDto.post);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async checkPutQualification(req, res, next) {
        try{
            await Joi.attempt(req.body, qualificationDto.put);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = QualificationMiddlewares;