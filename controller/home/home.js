import BaseComponent from '../../prototype/baseComponent'
import DirectoryModel from '../../models/directory/directory'
import ArticleModel from '../../models/article/article'


class Home extends BaseComponent{
  constructor() {
    super()
    this.directory = this.directory.bind(this)
    this.updateDirectory = this.updateDirectory.bind(this)
  }
  
  /**
   * 描述：获取目录
   * @param {*} ctx 
   */
  async directory(ctx) {
    let result = {
      success: false,
      code: '',
      message: '',
      data: null,
    }
    try {
      const dirData = []
      let directoryData = await DirectoryModel.find({ level: 1 }, { level: 0, _id: 0, __v: 0 })
      for (let item of directoryData) {
        let itemCopy = JSON.parse(JSON.stringify(item))
        itemCopy.childList = await ArticleModel.find({ dirId: itemCopy.id }, { id: 1, title: 1})
        dirData.push(itemCopy)
      }

      result.code = 0
      result.success = true
      result.message = 'success'
      result.data = dirData
      ctx.body = result
    } catch (err) {
      result.code = 20001
      result.message = 'system error'
      result.err = err
      ctx.body = result
    }
  }

  async updateDirectory(ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      code: '',
      message: '',
      data: null,
    }
    const { id, name, level, parent_directory_id } = formData

    try {
      const directory = id && await DirectoryModel.findById(id)
      if (directory) {
        directory.name = name
      } else {
        const directory_id = await this.getId('directory_id')
        if (!name || !level) {
          throw '数据上传格式错误'
        }
        const newDirectory = {
          id: directory_id,
          name,
          level,
          parent_directory_id
        }
        await DirectoryModel.create(newDirectory)
        result.success = true
        result.message = '目录添加成功'
        ctx.body = result
      }
    } catch (err) {
      console.log(err)
      result.message = 'system error'
      ctx.body = result
    }1
  }
}

export default new Home()