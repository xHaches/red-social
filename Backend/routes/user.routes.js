const Router = require('express');
const UserController = require('../controllers/user.controller');
const { ParamsMiddlewares, UserMiddlewares, FileMiddlewares, AuthMiddlewares } = require('../middlewares');

const router = Router();

const userController = new UserController();

const paramsMiddlewares = new ParamsMiddlewares();
const fileMiddlewares = new FileMiddlewares();
const userMiddlewares = new UserMiddlewares();

const authMiddlewares = new AuthMiddlewares();


router.get('/', [
    authMiddlewares.validateToken,
], userController.getUsers);

router.get('/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
], userController.getUserByPK);

router.post('/', [
    fileMiddlewares.validateFileUploaded,
    userMiddlewares.checkPostUser
], userController.newUser);

router.put('/:id', [
    authMiddlewares.validateToken,
    userMiddlewares.checkPutUser,
    paramsMiddlewares.checkId
], userController.putUser);

router.delete('/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
], userController.deleteUser)

module.exports = router;
