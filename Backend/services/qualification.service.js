
const { Qualification } = require("../models");


class QualificationService {

    async getQualifications() {
        const qualifications = await Qualification.findAll();
        return qualifications;
        
    }

    async getQualificationByPK({ id }) {
        const qualification = await Qualification.findByPk(id);
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }
        return qualification; 
    }
    //buscar por id
    async getQualificationByid({ id }) {
        const qualification = await Qualification.findOne({
            where: { id }
        });
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }
        return qualification;
    }
  
//todas las calificaciones por id_user 
    async getQualificationByIdUser({ id_user }) { 
        const qualification = await Qualification.findAll({
            where: { id_user: id_user }
        });
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró la busqueda solicitada',
                status: 400
            };
        }
        return qualification;
    };
//Todas las calificaciones de una misma tecnologia de un UNICO USUARIO
    async getAllQualificationByUser({ id_user, id_technology }) { 
        const qualification = await Qualification.findAll({
            where: { 
                id_user: id_user,
                id_technology: id_technology, 
            }
        });
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró la busqueda solicitada',
                status: 400
            };
        }
        return qualification;
    };


    async newQualification ({ stars, id_user, id_technology }) {
        const qualificationExists = await Qualification.findOne({
            where: {
                id_user,
                id_technology
            }
        });
        if(qualificationExists) {
            return await this.putQualification({ id: qualificationExists.id, body: {stars} });
        }
        const qualification = await Qualification.create({
            stars,
            id_user,
            id_technology
        });
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró procesar la alta de la calificación ',
                status: 500
            };
        }
        await qualification.save();
        return qualification;
    }

    async putQualification({ id, body }) {
        const { stars } = body;
        const qualification = await Qualification.findByPk(id);
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }
        await qualification.update({ stars });
        return qualification;
    }

    async deleteQualification({ id }) {
        const qualification = await Qualification.findByPk(id);
        if(!qualification) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }

        await qualification.update({ stars: 0 });
        return qualification;
    }

};


module.exports = QualificationService;