const { Friendship , User} = require("../models");


class FriendshipService {

// TRAE LA LISTA DE AMISTADES Y SU INFORMACION DE CADA UNO
    async getFriendShipsByUserId({ id }) {
        const friendships = await Friendship.findAll({
            include: {
                model: User,
                attributes: ['img','name','address','email','age','studies','languages','linkedin','hobbies','status', 'id']
            },
            where: {
                accepted: true,
                id_user: id
            }
        });
        return friendships;
    }
// TRAE LAS SOLICITUDES DE AMISTAD Y SU INFORMACION DE CADA UNO
    async getFriendShipsRequestsByUserId({ id }) {
        const friendships = await Friendship.findAll({
            include: {
                model: User,
                attributes: ['img','name','address','email','age','studies','languages','linkedin','hobbies','status', 'id']
            },
            where: {
                accepted: false,
                id_user: id
            }
        });
        return friendships;
    }

//TRAE A UN AMIGO EN ESPECIAL DEL USUARIO ( CON SU INFORMACION)
    async getFriendshipByUser({ id_user, id_friend }) {
        const friendship = await Friendship.findOne({
            include: {
                model: User,
                where:{ id: id_friend },
                attributes: ['img','name','address','email','age','studies','languages','linkedin','hobbies','status', 'id']
            },
            where: { id_user: id_user}
        });
        return friendship;
    }


    async getFriendshipByPK({ id }) {
        const friendship = await Friendship.findByPk(id);
        if(!friendship) {
            return {
                error: true,
                msg: 'No se logró encontrar peticion solicitada',
                status: 400
            };
        }
        return friendship; 
    }

   

    
    async newFriendship ({ id_friend, id_user }) {
        const friendship = await Friendship.create({
            accepted: false,
            id_user,
            id_friend
        });
        if(!friendship) {
            return {
                error: true,
                msg: 'No se logró la alta de la peticion solicitada',
                status: 400
            };
        }
        await friendship.save();
        return friendship;
    }

    async putFriendship({ id, body }) {
        const { accepted } = body;
        const friendship = await Friendship.findByPk(id);
        if(!friendship) {
            return {
                error: true,
                msg: 'No se logró encontrar peticion solicitada',
                status: 400
            };
        }
        await friendship.update({ accepted });
        return friendship;
    }

    async deleteFriendship({ id }) {
        const friendship = await Friendship.findByPk(id);
        if(!friendship) {
            return {
                error: true,
                msg: 'No se logró encontrar peticion solicitada',
                status: 400
            };
        }
        await friendship.update({ accepted:false });
        return friendship;
    }

};


module.exports = FriendshipService;