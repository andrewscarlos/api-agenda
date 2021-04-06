import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs'
export default class Users extends Model{
    static init(sequelize){
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len:{
                        args: [3, 255],
                        mgs: 'campo nome deve ter entre 3 e 255 caracteres'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique:{
                    msg: 'Email ja existe'
                },
                validate: {
                    isEmail:{
                        mgs: 'Email invalido'
                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len:{
                        args: [6, 50],
                        mgs: 'campo senha deve ter entre 6 e 50 caracteres'
                    }
                }
            },
        },{sequelize})

        this.addHook('beforeSave',  async user =>{
            if(user.password){
                user.password_hash = await bcryptjs.hash(user.password, 8 )
            }
        });

        return this;
    }
    passwordIsValid(password){
        return bcryptjs.compare(password, this.password_hash)
    }
}