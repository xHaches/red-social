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
                error: 'Hable con el administrador'
            });
        }
    }

    async getTechnologyByPK(req, res) {
        const { id } = req.params;
        try {
            const technology = await technologyService.getTechnologyByPK({id});
            if(technology.error){
                return res.status(technology.status).json({error: technology.msg});
            }
            
            return res.json(technology);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
    
    async newTechnology(req, res) {
        const { title } = req.body;
        
        try {
            const technology = await technologyService.newTechnology({ title });
            if(technology.error){
                return res.status(technology.status).json({error: technology.msg});
            }
            await technology.save();
            return res.json(technology);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async putTechnology(req, res) {
        const { id } = req.params;
        const { title } = req.body;
        try {
            const technology = await technologyService.putTechnology({ id, title });
            if(technology.error){
                return res.status(technology.status).json({error: technology.msg});
            }
            return res.json(technology);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async deleteTechnology(req, res) {
        const { id } = req.params;
        try {
            const technology = await technologyService.deleteTechnology({ id });
            if(technology.error){
                return res.status(technology.status).json({error: technology.msg});
            }
            return res.json(technology);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
}

module.exports = TechnologyController;