import Users from '../models/Users'
class UserController {

     async create(req, res){
        try{
            const novoUsers = await Users.create(req.body)
            return res.json(novoUsers);
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
    }

    async index(req, res){
        try{
            const users = await Users.findAll()
            return res.json(users); 
        }catch(e){
            return res.json(null)
        }
    }

    async show(req, res){
        try{
            const users = await Users.findByPk(req.params.id)
            return res.json(users); 
        }catch(e){
            return res.json(null)
        }
    }

    async update(req, res){
        try{
            if(!req.params.id) {
                return res.status(400).json({
                    errors: ['Id não enviado']
                })
            }
            const users = await Users.findByPk(req.params.id)
            if(!users){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                })
            }
            const novosDados = await users.update(req.body)
            return res.json(novosDados)
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
    }

    async delete(req, res){
        try{
            if(!req.params.id) {
                return res.status(400).json({
                    errors: ['Id não enviado']
                })
            }
            const users = await Users.findByPk(req.params.id)
            if(!users){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                })
            }
            await users.destroy()
            return res.json(users)
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
    }

}

export default new UserController();