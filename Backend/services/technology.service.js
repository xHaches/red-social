const { Technology } = require("../models");


class TechnologyService {

    async getTechnologies() {
        const technologies = await Technology.findAll();
        return technologies;
    }


    async getTechnologyByPK({ id }) {
        const technology = await Technology.findByPk(id);
        if(!technology) {
            return {
                error: true,
                msg: 'No se logró encontrar la busqueda ',
                status: 400
            };
        }
        return technology; 
    }

  
    async getTechnologyBytitle({ title }) {
        const technology = await Technology.findOne({
            where: { title }
        });
        if(!technology) {
            return {
                error: true,
                msg: 'No se logró encontrar ninguna tecnología con el titulo',
                status: 400
            };
        }
        return technology;
    }

    async newTechnology ({ title }) {
        const technology = await Technology.create({
            title
        });
        if(!technology) {
            return {
                error: true,
                msg: 'No se logró la alta de la tecnología',
                status: 500
            };
        }
        await technology.save();
        return technology;
    }

    async putTechnology({ id, title }) {
        const technology = await Technology.findByPk(id);
        if(!technology) {
            return {
                error: true,
                msg: 'No se logró encontrar ninguna tecnología',
                status: 400
            };
        }
        await technology.update({ title });
        return technology;
    }

    async deleteTechnology({ id }) {
        const technology = await Technology.findByPk(id);
        if(!technology) {
            return {
                error: true,
                msg: 'No se logró encontrar ninguna tecnología',
                status: 400
            };
        }
        await technology.update({ title: "" });
        return technology;
    }

};


module.exports = TechnologyService;