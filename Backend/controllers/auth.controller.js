
const { AuthService } = require('../services')

const authService = new AuthService();

class AuthController {
    
    async login(req, res) {
        const { email, password } = req.body;
        try{
            const userAndToken = await authService.login({ email, password });
            return res.json(userAndToken);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }

}

module.exports = AuthController;