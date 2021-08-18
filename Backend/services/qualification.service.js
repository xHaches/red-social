
const e = require("express");
const { object } = require("joi");
const { Qualification, Technology } = require("../models");


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
    async getQualificationByIdUser({ id_user, id_technologies }) {
        
        const means = await Promise.all(
            id_technologies.map( id_technology => {
                console.log(id_technology)
                console.log(this.getMeanQualification)
                this.getMeanQualification({id_user: 2, id_technology:2})
            }
        )
        )

        // const qualification = await Qualification.findAll({ 
        //     include: {
        //         model: Technology,
        //         attributes: ['title'],
        //     },
        //     where: { id_user: id_user }
        // }); 
        console.log(means)
        return means.map(qualification => {
            console.log(qualification)
            return qualification });
    };

//sequelize.fn('avg', sequelize.col('stars')), 'avg_stars']




    


//Todas las calificaciones de una misma tecnologia
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


//TRAE EL PROMEDIO DE LAS CALIFICACIONES DE UNA TECNOLOGIA
    async getMeanQualification({ id_user, id_technology }) { 
        console.log(id_user, id_technology)
        const qualification = await Qualification.findAll({
            include: {
                model: Technology,
                attributes: ['title'],
            },
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
        };
        
        const meanQualificationTechnoly = await mean(qualification);
        return [meanQualificationTechnoly, qualification];
    };

    async newQualification ({ stars, id_user, id_technology }) {
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

}    

module.exports = QualificationService;

function mean (qualification){
    let suma=0;
    const up = qualification.length;
    for (let i=0; i <(up); i++ ){
        suma = qualification[i].stars + suma;
    }

    if(!suma) {
        return {
            error: true,
            msg: 'No se logró realizar el promedio',
            status: 400
        };
    }
    const meanQualification = suma/up;
    return meanQualification;
}

