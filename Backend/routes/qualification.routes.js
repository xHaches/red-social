const Router = require('express');
const QualificationController = require('../controllers/qualification.controller');
const { ParamsMiddlewares, QualificationMiddlewares } = require('../middlewares');

const router = Router();
const qualificationController = new QualificationController();

const paramsMiddlewares = new ParamsMiddlewares();
const qualificationMiddlewares = new QualificationMiddlewares();

router.get('/', [
], qualificationController.getQualifications);

router.get('/:id', [
    paramsMiddlewares.checkId
], qualificationController.getQualificationByPK);

// router.get('/user/:id', [
//     paramsMiddlewares.checkId
// ], qualificationController.getQualificationIdUser);

router.post('/:id_user/:id_technology', [
    qualificationMiddlewares.checkPostQualification
], qualificationController.newQualification);

router.put('/:id', [
    qualificationMiddlewares.checkPutQualification,
    paramsMiddlewares.checkId
], qualificationController.putQualification);

router.delete('/:id', [
    paramsMiddlewares.checkId
], qualificationController.deleteQualification)

module.exports = router;
