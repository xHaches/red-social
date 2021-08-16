const { Friendship } = require("../models");


class FriendshipService {

    async getFriendships() {
        const friendships = await Friendship.findAll({
            where: {
                accepted: true
            }
        });
        return friendships;
    }

    async getFriendShipsByUserId({ id }) {
        const friendships = await Friendship.findAll({
            where: {
                accepted: true,
                id_user: id
            }
        });
        return friendships;
    }

    async getFriendShipsRequestsByUserId({ id }) {
        const friendships = await Friendship.findAll({
            where: {
                accepted: false,
                id_user: id
            }
        });
        return friendships;
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

   
    async getFriendshipByUser({ id_user, id_friend }) {
        const friendship = await Friendship.findOne({
            where: { id_user, id_friend }
        });
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