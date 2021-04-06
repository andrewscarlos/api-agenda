import Users from '../models/Users'
class UserController {
     async create(req, res){
        try{
            const novoUsers = await Users.create(req.body)
            res.json(novoUsers);
        }catch(e){
            res.status(400).json({
                erros: e.errors.map(err=> err.message)})
        }
        

    }
}

export default new UserController();