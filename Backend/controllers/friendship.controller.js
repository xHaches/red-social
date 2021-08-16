const FriendshipService = require("../services/friendship.service");


const friendshipService = new FriendshipService();

class FriendshipController {
    
    async getFriendships(req, res) {
        try{
            const friendship = await friendshipService.getFriendships();
            return res.json(friendship);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
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
}

module.exports = FriendshipController;