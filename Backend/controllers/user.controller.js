const UserService = require("../services/user.service");

const userService = new UserService();


class UserController {
    
    async getUsers(req, res) {
        try{
            const users = await userService.getUsers();
            return res.json(users);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el aministrador'
            });
        }
    }

    async getUserByPK(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.getUserByPK({id});
            if(user.error){
                return res.status(user.status).json({error: user.msg});
            }
            return res.json(user);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el aministrador'
            });
        }
    }
    
    async newUser(req, res) {
        const userData = req.body;
        const { img } = req.files;
        try {
            const user = await userService.newUser(img, { ...userData });
            if(user.error) {
                return res.status(user.status).json({
                    error: user.msg
                })
            }
            await user.save();
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el aministrador'
            });
        }
    }

    async putUser(req, res) {
        const { id } = req.params;
        const userData = req.body;
        const { img } = req.files;
        try {
            const user = await userService.putUser(img, { id, body: userData });
            if (user.error) {
                return res.status(400).json({ error: user.msg });
            }
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el aministrador'
            });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.deleteUser({ id });
            if (user.error) {
                return res.status(user.status).json({ error: user.msg });
            }
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el aministrador'
            });
        }
    }
}

module.exports = UserController;