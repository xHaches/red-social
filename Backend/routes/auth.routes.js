const Router = require('express');
const { AuthController } = require('../controllers');
const { AuthMiddlewares } = require('../middlewares');

const router = Router();

const authController = new AuthController();

const authMiddlewares = new AuthMiddlewares();


router.post('/', [
    authMiddlewares.checkEmailAndPassword
], authController.login);


module.exports = router;