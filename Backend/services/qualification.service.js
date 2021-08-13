
const { Qualification } = require("../models");


class QualificationService {

    async getQualifications() {
        const qualifications = await Qualification.findAll();
        return qualifications;
        
    }

    async getQualificationByPK({ id }) {
        const qualification = await Qualification.findByPk(id);
        return qualification; 
    }
    //buscar por id
    async getQualificationByid({ id }) {
        const qualification = await Qualification.findOne({
            where: { id }
        });
        return qualification;
    }
  
    //todas las calificaciones por id_user REVISAR
    // async getQualificationByIdUser({ id }) { 
    //     const qualification = await Qualification.findAll({
    //         where: { id_user: id }
    //     });
    //     return qualification;
    // }

    async newQualification ({ stars, id_user, id_technology }) {
        const qualification = await Qualification.create({
            stars,
            id_user,
            id_technology
        });
        await qualification.save();
        return qualification;
    }

    async putQualification({ id, body }) {
        const { stars } = body;
        const qualification = await Qualification.findByPk(id);
        await qualification.update({ stars });
        return qualification;
    }

    async deleteQualification({ id }) {
        const qualification = await Qualification.findByPk(id);
        if (!qualification.stars || !qualification){
            return;
        }
        await qualification.update({ stars: 0 });
        return qualification;
    }

};


module.exports = QualificationService;