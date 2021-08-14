const Router = require('express');
const QualificationController = require('../controllers/qualification.controller');
const { ParamsMiddlewares, QualificationMiddlewares, AuthMiddlewares } = require('../middlewares');

const router = Router();
const qualificationController = new QualificationController();

const paramsMiddlewares = new ParamsMiddlewares();
const qualificationMiddlewares = new QualificationMiddlewares();
const authMiddlewares = new AuthMiddlewares();

router.get('/', [
    authMiddlewares.validateToken,
    authMiddlewares.validateAdminRole,
], qualificationController.getQualifications);

router.get('/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId,
], qualificationController.getQualificationByPK);

// router.get('/user/:id', [
//     paramsMiddlewares.checkId
// ], qualificationController.getQualificationIdUser);

router.post('/:id_user/:id_technology', [
    authMiddlewares.validateToken,
    qualificationMiddlewares.checkPostQualification,
], qualificationController.newQualification);

router.put('/:id', [
    authMiddlewares.validateToken,
    qualificationMiddlewares.checkPutQualification,
    paramsMiddlewares.checkId,
], qualificationController.putQualification);

router.delete('/:id', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkId
], qualificationController.deleteQualification)

module.exports = router;
