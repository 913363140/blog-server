import Router from 'koa-router'

import admin from './admin'
import article from './article'
import home from './home'

const router = new Router()

router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())

export default router