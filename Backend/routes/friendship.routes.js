const Router = require('express');
const FriendshipController = require('../controllers/friendship.controller');
const { ParamsMiddlewares, FriendshipMiddlewares } = require('../middlewares');

const router = Router();

const friendshipController = new FriendshipController();

const paramsMiddlewares = new ParamsMiddlewares();
const friendshipMiddlewares = new FriendshipMiddlewares();

router.get('/', [
], friendshipController.getFriendships);

router.get('/:id', [
    paramsMiddlewares.checkId
], friendshipController.getFriendshipByPK);


router.post('/:id_user/:id_friend', [
    friendshipMiddlewares.checkPostFriendship
], friendshipController.newFriendship);

router.put('/:id', [
    friendshipMiddlewares.checkPutFriendship,
    paramsMiddlewares.checkId
], friendshipController.putFriendship);

router.delete('/:id', [
    paramsMiddlewares.checkId
],friendshipController.deleteFriendship)

module.exports = router;