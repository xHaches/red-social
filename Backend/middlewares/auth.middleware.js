const { User } = require("../models");

const Joi = require("joi");
const { AuthDTO } = require("../dto");

const jwt = require('jsonwebtoken');

const authDTO = new AuthDTO();

class AuthMidlewares {
    
    async checkEmailAndPassword(req, res, next) {
        try{
            await Joi.attempt(req.body, authDTO.emailAndPassword);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async validateToken(req, res, next) {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }
        try {
            const {data} = jwt.verify(token, process.env.JWT_SEED);
            const user = await User.findByPk(data.id);
            if(!user || !user.status ) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe en DB'
                });
            }
            // Se agrega al req el usuario descodificado para tratarlo despues con el middleware validateAdminRole
            req.user = user;
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }

    async validateAdminRole(req, res, next) {
        // Del middleware validatetoke
        const { user } = req;
        try {
            const admin = await User.findByPk(user.id);
            if (admin.role !== 'ADMIN') {
                return res.status(403).json({
                    msg: 'no tienes autorización'
                });
            }
            return next();
            
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }
}

module.exports = AuthMidlewares;