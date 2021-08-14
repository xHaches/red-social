const Router = require('express');
const TechnologyController = require('../controllers/technology.controller');
const { ParamsMiddlewares, TechnologyMiddlewares, AuthMiddlewares } = require('../middlewares');

const router = Router();
const technologyController = new TechnologyController();

const paramsMiddlewares = new ParamsMiddlewares();
const technologyMiddlewares = new TechnologyMiddlewares();
const authMiddlewares = new AuthMiddlewares();


router.get('/', [
    authMiddlewares.validateToken,
    authMiddlewares.validateAdminRole
], technologyController.getTechnologies);

router.get('/:id', [    
    authMiddlewares.validateToken,
    authMiddlewares.validateAdminRole,
    paramsMiddlewares.checkId
], technologyController.getTechnologyByPK);

router.post('/', [
    authMiddlewares.validateToken,
    authMiddlewares.validateAdminRole,
    technologyMiddlewares.checkPostTechnology
], technologyController.newTechnology);

router.put('/:id', [
    authMiddlewares.validateToken,
    authMiddlewares.validateAdminRole,
    technologyMiddlewares.checkPutTechnology,
    paramsMiddlewares.checkId
], technologyController.putTechnology);

router.delete('/:id', [
    authMiddlewares.validateToken,
    authMiddlewares.validateAdminRole,
    paramsMiddlewares.checkId
], technologyController.deleteTechnology)

module.exports = router;
