const Router = require('express');
const FriendshipController = require('../controllers/friendship.controller');
const { ParamsMiddlewares, FriendshipMiddlewares, AuthMiddlewares } = require('../middlewares');

const router = Router();

const friendshipController = new FriendshipController();

const paramsMiddlewares = new ParamsMiddlewares();
const friendshipMiddlewares = new FriendshipMiddlewares();
const authMiddlewares = new AuthMiddlewares();



router.get('/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
], friendshipController.getFriendshipByPK);

// TRAE LA LISTA DE AMISTADES Y SU INFORMACION DE CADA UNO
router.get('/by-user/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
], friendshipController.getFriendShipsByUserId);

// TRAE LAS SOLICITUDES DE AMISTAD Y SU INFORMACION DE CADA UNO
router.get('/by-user/requests/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
], friendshipController.getFriendShipsRequestsByUserId);

//TRAE A UN AMIGO EN ESPECIAL DEL USUARIO ( CON SU INFORMACION)
router.get('/by-user/one/:id_user/:id_friend', [
    authMiddlewares.validateToken,
], friendshipController.getFriendShipByUser);


router.post('/:id_user/:id_friend', [
    authMiddlewares.validateToken,
    // friendshipMiddlewares.checkPostFriendship
], friendshipController.newFriendship);

router.put('/:id', [
    authMiddlewares.validateToken,
    friendshipMiddlewares.checkPutFriendship,
    paramsMiddlewares.checkId
], friendshipController.putFriendship);

router.delete('/friend/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
],friendshipController.deleteFriendship)


module.exports = router;