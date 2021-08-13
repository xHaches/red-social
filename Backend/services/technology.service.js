const { Technology } = require("../models");


class TechnologyService {

    async getTechnologies() {
        const technologies = await Technology.findAll();
        return technologies;
    }


    async getTechnologyByPK({ id }) {
        const technology = await Technology.findByPk(id);
        return technology; 
    }

  
    async getTechnologyBytitle({ title }) {
        const technology = await Technology.findOne({
            where: { title }
        });
        return technology;
    }

    async newTechnology ({ title }) {
        const technology = await Technology.create({
            title
        });
        await technology.save();
        return technology;
    }

    async putTechnology({ id, title }) {
        const technology = await Technology.findByPk(id);
        await technology.update({ title });
        return technology;
    }

    async deleteTechnology({ id }) {
        const technology = await Technology.findByPk(id);
        if (!technology.title || !technology){
            return;
        }
        await technology.update({ title: "" });
        return technology;
    }

};


module.exports = TechnologyService;