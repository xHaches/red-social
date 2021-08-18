const { query } = require("express");
const QualificationService = require("../services/qualification.service");

const qualificationService = new QualificationService();


class QualificationController {
    
    async getQualifications(req, res) {
        try{
            const qualifications = await qualificationService.getQualifications();
            return res.json(qualifications);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async getQualificationIdUser(req, res) {
        let { id_user, id_technologies } = req.params;
        id_technologies = JSON.parse(id_technologies)
        try {
            const qualification = await qualificationService.getQualificationByIdUser({id_user, id_technologies});
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            return res.json(qualification);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }

    async getAllQualificationByUser(req, res) {
        const { id_user, id_technology } = req.params;
        try {
            const qualification = await qualificationService.getAllQualificationByUser({ id_user, id_technology });
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            return res.json(qualification);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }

    async getQualificationByPK(req, res) {
        const { id } = req.params;
        try {
            const qualification = await qualificationService.getQualificationByPK({id});
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            return res.json(qualification);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
//TRAE EL PROMEDIO DE LAS CALIFICACIONES POR TECNOLOGIA
    async getMeanQualification(req, res) {
        const { id_user, id_technology } = req.params;
        try {
            const qualification = await qualificationService.getMeanQualification({ id_user, id_technology });
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            return res.json(qualification);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                 msg: 'Hable con el administrador'
            });
        }
    }
    
    async newQualification(req, res) {
        const { id_user, id_technology } = req.params;
        const { stars }   = req.body;
        try {
            const qualification = await qualificationService.newQualification({ id_user, id_technology, stars });
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            await qualification.save();
            return res.json(qualification);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async putQualification(req, res) {
        const { id } = req.params;
        const qualificationData = req.body;
        try {
            const qualification = await qualificationService.putQualification({ id, body: qualificationData});
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            return res.json(qualification);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async deleteQualification(req, res) {
        const { id } = req.params;
        try {
            const qualification = await qualificationService.deleteQualification({ id });
            if(qualification.error){
                return res.status(qualification.status).json({error: qualification.msg});
            }
            return res.json(qualification);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
}

module.exports =   QualificationController;