import AdminModel from '../../models/admin/admin'
import moment from 'moment'
import BaseComponent from '../../prototype/baseComponent'
import AdminCode from '../../codes/admin'
import jwt from 'jwt-simple'

const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7
const jwtSecret = 'jwtSecret'

class Admin extends BaseComponent{
    constructor() { 
        super()
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        // this.updateAvator = this.updateAvator.bind(this)
    } 

    async login(ctx) {
        let formData = ctx.request.query
        console.log(formData)
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        const {username, password} = formData

        try {
            if (!username || !password) {
                result.code = AdminCode.CODE_ERROR_USER_INFO
                result.message = AdminCode.ERROR_USER_INFO
                ctx.body = result
                return
            }

            const admin = await AdminModel.findOne({username})
            if (!admin) {
                result.code = AdminCode.CODE_FAIL_USER_NO_EXIST
                result.message = AdminCode.FAIL_USER_NO_EXIT
                ctx.body = result
                return
            } else if (admin.password !== password) {
                result.code = AdminCode.CODE_ERROR_USER_INFO
                result.message = AdminCode.ERROR_USER_INFO
                ctx.body = result
                return
            }else {

                let payload = {
                    exp: Date.now() + tokenExpiresTime,
                    username: username
                }
                let token = jwt.encode(payload, jwtSecret)
                
                result.code = AdminCode.CODE_LOGIN_SUCCESS
                result.message = AdminCode.LOGIN_SUCCESS
                result.token = token
                ctx.body = result
            }

        } catch(err) {
            result.code = AdminCode.CODE_ERROR_SYS
            result.message = AdminCode.ERROR_SYS
            result.data = JSON.stringify(err)
            console.log(err)
            ctx.body = result
        }
    }

    async register(ctx) {
        let formData = ctx.request.query
        console.log(formData)
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        const {username, password} = formData

        try {

            const admin = await AdminModel.findOne({username})
            if (admin) {
                result.message = '该用户已存在'
                ctx.body = result
            } else {
                const admin_id = await this.getId('admin_id');
                const newAdmin = {
                    id: admin_id,
                    username,
                    password,
                    create_time: moment().format('YYYY-MM-DD HH:mm')
                }
                await AdminModel.create(newAdmin)
                result.success = true
                result.message = 'admin注册成功'
                ctx.body = result
            }

        } catch(err) {
            result.message = '注册管理员失败'
            ctx.body = result
        }
    }
}

export default new Admin()