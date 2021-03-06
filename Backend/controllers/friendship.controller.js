const FriendshipService = require("../services/friendship.service");


const friendshipService = new FriendshipService();

class FriendshipController {
    

// TRAE LA LISTA DE AMISTADES Y SU INFORMACION DE CADA UNO
    async getFriendShipsByUserId(req, res) {
        const { id } = req.params;
        try{
            const friendships = await friendshipService.getFriendShipsByUserId({ id });
            return res.json(friendships);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
// TRAE LAS SOLICITUDES DE AMISTAD Y SU INFORMACION DE CADA UNO
    async getFriendShipsRequestsByUserId(req, res) {
        const { id } = req.params;
        try{
            const friendships = await friendshipService.getFriendShipsRequestsByUserId({ id });
            return res.json(friendships);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
//TRAE A UN AMIGO EN ESPECIFICO DEL USUARIO ( CON SU INFORMACION)
    async getFriendShipByUser(req, res) {
        const { id_user, id_friend } = req.params;
        try{
            const friendship = await friendshipService.getFriendshipByUser({ id_user, id_friend });
            return res.json(friendship);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el aministrador'
            });
        }
    }

    async getFriendshipByPK(req, res) {
        const { id } = req.params;
        try {
            const friendship = await friendshipService.getFriendshipByPK({id});
            if(friendship.error){
                return res.status(friendship.status).json({error: friendship.msg});
            }
            return res.json(friendship);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
    
    async newFriendship(req, res) {
        const { id_user , id_friend }= req.params;
        const { accepted } = req.body
       
        try {
            const friendship = await friendshipService.newFriendship({ id_user , id_friend, accepted   });
            if(friendship.error){
                return res.status(friendship.status).json({error: friendship.msg});
            }
            await friendship.save();
            return res.json(friendship);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async putFriendship(req, res) {
        const { id } = req.params;
        const friendshipData = req.body;
        try {
            const friendship = await friendshipService.putFriendship({ id, body: friendshipData });
            if (friendship.error) {
                return res.status(friendship.status).json({ error: friendship.msg });
            }
            return res.json(friendship);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async deleteFriendship(req, res) {
        const { id } = req.params;
        try {
            const friendship = await friendshipService.deleteFriendship({ id });
            if(friendship.error){
                return res.status(friendship.status).json({error: friendship.msg});
            }
            return res.json(friendship);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async deleteFriend(req, res) {
        const { id_friend } = req.params;
        console.log(id_friend);
        try {
            const friendship = await friendshipService.deleteFriendship({ id_friend });
            if(friendship.error){
                return res.status(friendship.status).json({error: friendship.msg});
            }
            return res.json(friendship);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
}

module.exports = FriendshipController;