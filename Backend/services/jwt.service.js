const jwt = require('jsonwebtoken');

class JWTService {
    generateJWT (user) {
        return new Promise((resolve, reject) => {
            const payload = user;
            jwt.sign({data: payload}, process.env.JWT_SEED, {
                expiresIn: '24h'
            }, (err, token = '') => {
                if(err) {
                    console.log(err);
                    return reject({msg: 'No se pudo generar el token'});
                }
                resolve(token);
            });
        });

    }
}

module.exports = JWTService