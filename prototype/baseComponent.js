import Ids from '../models/ids'
import chalk from 'chalk'

export default class BaseComponent {
    constructor() {
        this.idList = ['admin_id', 'img_id', 'article_id', 'directory_id']
    }
    async getId(type) {
        if (!this.idList.includes(type)) {
            console.log(
                chalk.red('id类型错误')
            )
            throw new Error('id类型错误')
            return
        }
        try{
            const idData = await Ids.findOne()
            idData[type]++
            await idData.save()
            return idData[type]
        } catch(err) {
            console.log(
                chalk.red('获取数据id失败')
            )
            throw new Error('获取数据id失败')
        }
    }
}