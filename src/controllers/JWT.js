import User from '../models/Users';
import jwt from 'jsonwebtoken';

class TokenController {
    async create(req, res){
        const { email ='', password=''} = req.body;
        if(!email || !password ){
            return res.status(401).json({
                erros: ['credencias invalidas']
            })
        }
        const user = await User.findOne({where:{email}});

        if(!user ){
            return res.status(401).json({
                erros: ['Usuario não existe']
            })
        }
        if(!(await user.passwordIsValid(password))){
            return res.status(401).json({
                erros: ['Senha Invalida']
            })
        }
        const { id }= user;
        const token = jwt.sign({id, email}, process.env.TOKEN_SECRET,{
            expiresIn: process.env.TOKEN_EXPIRATION
        });

        return res.json({token})
        }
    }


export default new TokenController();