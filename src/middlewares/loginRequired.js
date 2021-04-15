import jwt from 'jsonwebtoken';
import User from '../models/Users'
export default async (req, res, next)=>{
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({
            erros: ['Login Requied']
        })
    }
    const [texto, token] = authorization.split(' ')
    try{
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = dados;

        const user = await User.findOne({
            where: {
                id,
                email,
            }
        })
        if(!user){
            return res.status(401).json({
                erros: ['Usuario Invalido.']
            })
        }

        req.userId = id;
        req.userEmail = email;
        return next()
    }catch(e){
        return res.status(401).json({
            erros: ['Token Expirado ou Invalido.']
        })
    }
}