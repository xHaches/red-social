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
                msg: 'Hable con el aministrador'
            });
        }
    }

    async getUserByPK(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.getUserByPK({id});
            if(user.error){
                return res.status(user.status).json({msg: user.msg});
            }
            return res.json(user);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }
    
    async newUser(req, res) {
        const userData = req.body;
        const { img } = req.files;
        try {
            const user = await userService.newUser({ img, ...userData });
            if(user.error) {
                return res.status(user.status).json({
                    msg: user.msg
                })
            }
            await user.save();
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }

    async putUser(req, res) {
        const { id } = req.params;
        const userData = req.body;
        const { img } = req.files;
        try {
            const user = await userService.putUser({ id, body: userData, img });
            if (user.error) {
                return res.status(400).json({ msg: user.msg });
            }
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.deleteUser({ id });
            if (user.error) {
                return res.status(user.status).json({ msg: user.msg });
            }
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }
}

module.exports = UserController;