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

    async getFriendshipByPK({ id }) {
        const friendship = await Friendship.findByPk(id);
        return friendship; 
    }

   
    async getFriendshipByUser({ id_user }) {
        const friendship = await Friendship.findOne({
            where: { id_user }
        });
        return friendship;
    }

    async newFriendship ({ accepted, id_friend, id_user }) {
        const friendship = await Friendship.create({
            accepted, 
            id_user,
            id_friend
        });
        await friendship.save();
        return friendship;
    }

    async putFriendship({ id, body }) {
        const { accepted } = body;
        const friendship = await Friendship.findByPk(id);
        await friendship.update({ accepted });
        return friendship;
    }

    async deleteFriendship({ id }) {
        const friendship = await Friendship.findByPk(id);
        if (!friendship.accepted || !friendship){
            return;
        }
        await friendship.update({ accepted:false });
        return friendship;
    }

};


module.exports = FriendshipService;