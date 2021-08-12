const Router = require('express');
const UserController = require('../controllers/user.controller');
const { ParamsMiddlewares, UserMiddlewares, FileMiddlewares } = require('../middlewares');

const router = Router();

const userController = new UserController();

const paramsMiddlewares = new ParamsMiddlewares();
const fileMiddlewares = new FileMiddlewares();
const userMiddlewares = new UserMiddlewares();

router.get('/', [
], userController.getUsers);

router.get('/:id', [
    paramsMiddlewares.checkId
], userController.getUserByPK);

router.post('/', [
    fileMiddlewares.validateFileUploaded,
    userMiddlewares.checkPostUser
], userController.newUser);

router.put('/:id', [
    userMiddlewares.checkPutUser,
    paramsMiddlewares.checkId
], userController.putUser);

router.delete('/:id', [
    paramsMiddlewares.checkId
], userController.deleteUser)

module.exports = router;
