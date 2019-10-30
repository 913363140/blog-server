import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import chalk from 'chalk'
import db from './mongodb/db'
import routers from './routes/index'
import jwt from 'koa-jwt'

const app = new Koa()
const jwtSecret = 'jwtSecret'

app.use(bodyparser())

// custom 401 handle
app.use((ctx, next) => {
   // cors配置
   ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
   ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
   ctx.set('Access-Control-Allow-Credentials', true);
   ctx.set('Access-Control-Max-Age', 3600 * 24);
   
   return next().catch( err => {
      if (401 == err.status) {
         ctx.status = 401
         ctx.body =  err //'请登录'        
      } else {
         throw err
      }
   })
})

// use jwt
// app.use(jwt({secret: jwtSecret})
//    .unless({path: [/^\/admin/, /^\/favicon/]}))

// routers.get('/userInfo', ctx => {
//    let token = ctx.header.authorization

//    ctx.body = {
//          token:token,
//          user:ctx.state.user
//    }

//    //使用jwt-simple自行解析数据
//    let payload = jwt.decode(token.split(' ')[1], jwtSecret);
//    console.log(payload)
// })

app.use(routers.routes())  
   .use(routers.allowedMethods()) 

app.listen(3000, () => {
   console.log(
      chalk.green('start success at port 3000')
   )
})