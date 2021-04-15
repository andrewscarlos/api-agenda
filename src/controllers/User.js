import Users from '../models/Users'
class UserController {

     async create(req, res){
        try{
            const novoUsers = await Users.create(req.body)
            const { id, email, nome} = novoUsers
            return res.json({ id, email, nome} );
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
    }

    async index(req, res){
        try{
            const users = await Users.findAll({atributes: ['id', 'nome', 'email']})
            return res.json(users); 
        }catch(e){
            return res.json(null)
        }
    }

    async show(req, res){
        try{
            
            const users = await Users.findByPk(req.params.id)
            const { id, nome, email } = users;
            return res.json({ id, nome, email }); 
        }catch(e){
            return res.json(null)
        }
    }

    async update(req, res){
        try{    
            const user = await Users.findByPk(req.userId)
            if(!user){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                })     
            }
            const novosDados = await user.update(req.body)
            const { id, email, nome}  = novosDados
            return res.json({ id, email, nome} )
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
    }

    async delete(req, res){
        try{
            const user = await Users.findByPk(req.userId)

            
            if(!user){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                })
            }
            await user.destroy()
            return res.json({"user": 'Usuario deletado com sucesso!'})
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
    }

}

export default new UserController();