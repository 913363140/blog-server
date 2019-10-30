import Router from 'koa-router'
import Article from '../controller/article/article'

const router = new Router()

router.get('/article', Article.article)
router.post('/createArticle', Article.createArticle)

export default router
