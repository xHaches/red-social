const bcryptjs = require('bcryptjs');

const UserService = require('./user.service');
const JWTService = require('./jwt.service');

const jwtService = new JWTService();
const userService = new UserService();

class AuthService {
    async login ({email, password})  {
        const user = await userService.getUserByEmail({email});
        const validPassword = bcryptjs.compareSync(password+'', user.password);

        if(!validPassword) {
            return {
                error: true,
                msg: 'Email o password incorrectos',
                status: 400
            }
        }
        delete user.dataValues.password;

        const token = await jwtService.generateJWT(user);
        return {
            user,
            token
        }
    }
}

module.exports = AuthService;