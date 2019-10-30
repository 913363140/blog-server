import Router from 'koa-router'
import Admin from '../controller/admin/admin'

const router = new Router()

router.get('/login', Admin.login)
router.get('/register', Admin.register)

export default router