import moment from 'moment'
import ArticleModel from '../../models/article/article'
import BaseComponent from '../../prototype/baseComponent'


class Article extends BaseComponent{
    constructor() {
        super()
        this.article = this.article.bind(this)
        this.createArticle = this.createArticle.bind(this)
    }
    /**
     * create article
     * @param {*} ctx 
     */
    async createArticle(ctx) {
        let formData = ctx.request.body
        const result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        const { title, content, tag, cover, isRelease, dirId } = formData
        try  {
            const article_id = await this.getId('article_id')
            const newArticle = {
                id: article_id,
                title,
                content,
                tag,
                cover,
                isRelease,
                dirId,
                createdAt: moment().format('YYYY-MM-DD HH:mm'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm'),
            }
            await ArticleModel.create(newArticle)
            result.success = true
            result.message = 'success'
            ctx.body = result

        } catch(err) {
            result.message = 'article create fail'
            result.err = err
            ctx.body = result
        }
    }

    async article(ctx) {
        const formData = ctx.request.query
        console.log('----------query formData----------', ctx.req)
        const result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        const { id } = formData

        try {
            const articleData = await ArticleModel.findOne({ id: id }, { _id: 0, __v: 0 })
            console.log(articleData)
            
            result.code = 0
            result.success = true
            result.message = 'success'
            result.data = articleData
            ctx.body = result
        } catch (err) {
            result.code = 30001
            result.message = 'article get fail'
            result.err = err
            ctx.body = result
        }
        
    }
}

export default new Article()