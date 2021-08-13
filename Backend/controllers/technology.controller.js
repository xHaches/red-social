const TechnologyService = require("../services/technology.service");

const technologyService = new TechnologyService();


class TechnologyController {
    
    async getTechnologies(req, res) {
        try{
            const technologies = await technologyService.getTechnologies();
            return res.json(technologies);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }

    async getTechnologyByPK(req, res) {
        const { id } = req.params;
        try {
            const technology = await technologyService.getTechnologyByPK({id});
            if (!technology) {
                return res.status(400).json({ msg: 'Tecnología no encontrada' });
            }
            return res.json(technology);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }
    
    async newTechnology(req, res) {
        const { title } = req.body;
        
        try {
            const technology = await technologyService.newTechnology({ title });
            await technology.save();
            return res.json(technology);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }

    async putTechnology(req, res) {
        const { id } = req.params;
        const { title } = req.body;
        try {
            const technology = await technologyService.putTechnology({ id, title });
            if (!technology) {
                return res.status(400).json({ msg: 'Tecnología no encontrada' });
            }
            return res.json(technology);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }

    async deleteTechnology(req, res) {
        const { id } = req.params;
        try {
            const technology = await technologyService.deleteTechnology({ id });
            if (!technology) {
                return res.status(400).json({ msg: 'Tecnología no encontrada' });
            }
            return res.json(technology);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }
}

module.exports = TechnologyController;