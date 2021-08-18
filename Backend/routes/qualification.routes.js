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

//calificaciones por id 
router.get('/:id', [
   authMiddlewares.validateToken,
    paramsMiddlewares.checkId,
], qualificationController.getQualificationByPK);

//todas las calificaciones por usuario ES ESTA
router.get('/user/:id_user/:id_technologies', [
    authMiddlewares.validateToken,
    paramsMiddlewares.checkIdUser
], qualificationController.getQualificationIdUser);

// todas las calificaciones de una misma tecnologia de un unico usuario
router.get('/users/:id_user/:id_technology', [
    authMiddlewares.validateToken,
   paramsMiddlewares.checkIdTechnology,
], qualificationController.getAllQualificationByUser);

//nueva calificacion a una tecnologia de un usuario especifico
router.post('/:id_user/:id_technology', [
   authMiddlewares.validateToken,
    paramsMiddlewares.checkIdTechnology,
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
], qualificationController.deleteQualification);

//TRAE EL PROMEDIO DE LAS CALIFICACIONES DE LAS TECNOLOGIAS
router.get('/mean/:id_user/:id_technology',[
    paramsMiddlewares.checkIdTechnology,
], qualificationController.getMeanQualification);

module.exports = router;
