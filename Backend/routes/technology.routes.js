const Router = require('express');
const TechnologyController = require('../controllers/technology.controller');
const { ParamsMiddlewares, TechnologyMiddlewares } = require('../middlewares');

const router = Router();
const technologyController = new TechnologyController();

const paramsMiddlewares = new ParamsMiddlewares();
const technologyMiddlewares = new TechnologyMiddlewares();

router.get('/', [
], technologyController.getTechnologies);

router.get('/:id', [
    paramsMiddlewares.checkId
], technologyController.getTechnologyByPK);

router.post('/', [
    technologyMiddlewares.checkPostTechnology
], technologyController.newTechnology);

router.put('/:id', [
    technologyMiddlewares.checkPutTechnology,
    paramsMiddlewares.checkId
], technologyController.putTechnology);

router.delete('/:id', [
    paramsMiddlewares.checkId
], technologyController.deleteTechnology)

module.exports = router;
