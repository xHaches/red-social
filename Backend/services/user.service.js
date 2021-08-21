const { User } = require("../models");
const { ImgService } = require("./img.service");

const bcryptjs = require('bcryptjs');


const imgService = new ImgService();

class UserService {

    async getUsers() {
        const users = await User.findAll({
            where: {
                status: 1,
            },
            attributes: [
                'address', 'age', 'email', 'hobbies', 'id', 'img', 'languages', 'linkedin', 'name', 'studies'
            ]
        });
        return users;
    }

    async getUserByPK({ id }) {
        const user = await User.findByPk(id);
        if(!user || !user.status) {
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        return user; 
    }

    // Siempre usar argumentos por nombre, (con llaves)
    async getUserByEmail({ email }) {
        const user = await User.findOne({
            where: { email }
        });
        console.log(user);
        if(!user || !user.status) {
            return {
                error: true,
                msg: 'Email o password son incorrectos',
                status: 400
            };
        }
        return user;
    }

    async newUser (img, { name, address, email, password, age, studies, languages, linkedin, hobbies }) {
        const userExists = await this.getUserByEmail({email});
        console.log(userExists);
        console.log(!!userExists);
        console.log(!userExists.error);
        if(!userExists.error) {
            return {
                error: true,
                msg: 'El usuario con ese E-mail ya existe',
                status: 400
            };
        }
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
        
        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        delete user.dataValues.password;
        return user;
    }

    async putUser(img, { id, body }) {
        // Obtener la img y los de mas campos por separado
        // Evitar que se cambien los roles y se desactiven cuentas
        const { role, status, password, ...rest } = body;
        const user = await User.findByPk(id);
        if (!user || !user.status){
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        // Si existe la img se actualiza con img en otro caso solo los de más campos
        if(img){
            const imgUrl = await imgService.putImg({img, user});
            await user.update({ ...rest, img: imgUrl });
            return user;
        }
        if(password === '123456'){
            await user.update({ ...rest });
            return user;
        }
        await user.update({ ...rest, password });
        return user;
    }

    async deleteUser({ id }) {
        const user = await User.findByPk(id);
        if (!user || !user.status){
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        // Status 0 eliminado, Status 1 Activado
        await user.update({ status: 0 });
        return user;
    }

}


module.exports = UserService;