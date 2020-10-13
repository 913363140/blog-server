import Router from 'koa-router'
import Home from '../controller/home/home'

const router = new Router()

router.get('/directory', Home.directory)
router.get('/updateDirectory', Home.updateDirectory)

export default router