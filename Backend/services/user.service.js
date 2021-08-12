const { User } = require("../models");
const { ImgService } = require("./img.service");


const imgService = new ImgService();

class UserService {

    async getUsers() {
        const users = await User.findAll({
            where: {
                status: 1
            }
        });
        return users;
    }

    async getUserByPK({ id }) {
        const user = await User.findByPk(id);
        return user.status ? user : null; 
    }

    // Siempre usar argumentos por nombre, (con llaves)
    async getUserByEmail({ email }) {
        const user = await User.findOne({
            where: { email }
        });
        return user;
    }

    async newUser ({ img, name, address, email, password, age, studies, languages, linkedin, hobbies }) {
        const imgUrl = await imgService.newImage({img});
        const user = await User.create({
            img: imgUrl, 
            name, 
            address, 
            email, 
            password, 
            age, 
            studies, 
            languages, 
            linkedin, 
            hobbies, 
            role: 'USER', 
            status: 1
        });
        await user.save();
        return user;
    }

    async putUser({ id, body, img = null }) {
        // Obtener la img y los de mas campos por separado
        // Evitar que se cambien los roles y se desactiven cuentas
        const { role, status, ...rest } = body;
        const user = await User.findByPk(id);
        if (!user.status || !user){
            return;
        }
        // Si existe la img se actualiza con img en otro caso solo los de más campos
        if(img){
            const imgUrl = await imgService.putImg({img, user});
            await user.update({ ...rest, img: imgUrl });
            return user;
        }
        await user.update({ ...rest });
        return user;
    }

    async deleteUser({ id }) {
        const user = await User.findByPk(id);
        if (!user.status || !user){
            return;
        }
        // Status 0 eliminado, Status 1 Activado
        await user.update({ status: 0 });
        return user;
    }

}


module.exports = UserService;