import mongoose from 'mongoose'
import config from '../config/config'
import chalk from 'chalk'

mongoose.connect(config.url, {useNewUrlParser: true, useCreateIndex: true})
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {  
    console.log(
        chalk.green('连接数据库成功')
    )
})

db.on('error', error => {
    console.error(
        chalk.red('Error in Mongodb connection: ' + error)
    )
    mongoose.disconnect()
})

db.on('close', () => {
    console.log(
        chalk.red('数据库断开链接，重新链接数据库')
    )
    mongoose.connect(config.url, {server: {auto_reconnect: true}})
})

export default db