const { Friendship , User} = require("../models");
const sequelize = require('../db/connection');
const { QueryTypes } = require('sequelize');


class FriendshipService {

// TRAE LA LISTA DE AMISTADES Y SU INFORMACION DE CADA UNO
    async getFriendShipsByUserId({ id }) {
        const friendships = await sequelize.query(`
        SELECT [Friendships].[id], [Friendships].[id_friend], [Friendships].[id_user], 
        [Friendships].[accepted], [User].[img], [User].[name], [User].[address], [User].[email], [User].[age], 
        [User].[studies], [User].[languages], [User].[linkedin], [User].[hobbies], [User].[status], [User].[id] 
        FROM [Friendships] LEFT OUTER JOIN [Users] AS [User] ON [Friendships].[id_friend] = [User].[id] 
        WHERE [Friendships].[accepted] = 1 AND [Friendships].[id_user] =  ?;
        `, {
            replacements: [id],
            type: QueryTypes.SELECT
        });
        return friendships;
    }
// TRAE LAS SOLICITUDES DE AMISTAD Y SU INFORMACION DE CADA UNO
    async getFriendShipsRequestsByUserId({ id }) {
        const friendships = await sequelize.query(`
        SELECT [Friendships].[id], [Friendships].[id_friend], [Friendships].[id_user], 
        [Friendships].[accepted], [User].[img], [User].[name], [User].[address], [User].[email], [User].[age], 
        [User].[studies], [User].[languages], [User].[linkedin], [User].[hobbies], [User].[status], [User].[id] 
        FROM [Friendships] LEFT OUTER JOIN [Users] AS [User] ON [Friendships].[id_friend] = [User].[id] 
        WHERE [Friendships].[accepted] = 0 AND [Friendships].[id_user] =  ?;
        `, {
            replacements: [id],
            type: QueryTypes.SELECT
        });
        console.log(friendships);
        return friendships;
    }

//TRAE A UN AMIGO EN ESPECIAL DEL USUARIO ( CON SU INFORMACION)
    async getFriendshipByUser({ id_user, id_friend }) {
        const friendship = await sequelize.query(`
            SELECT TOP 1 * FROM Users JOIN Friendships ON Users.id = Friendships.id_friend AND Users.[id] = ? 
            WHERE [Friendships].[id_user] = ?
        `, {
            replacements: [id_friend, id_user],
            type: QueryTypes.SELECT
        });
        console.log(friendship);
        return friendship[0];
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
        console.log(accepted);
        const friendship = await Friendship.findOne({where: { id_friend: id}});
        console.log(friendship);
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
        await friendship.destroy();
        if(!friendship) {
            return {
                error: true,
                msg: 'No se logró encontrar peticion solicitada',
                status: 400
            };
        }
        return friendship;
    }

};


module.exports = FriendshipService;