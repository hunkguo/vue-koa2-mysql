
const user = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async getUserInfo( ctx ) {
    const result = await user.getUserById(ctx.params.id);
    ctx.body = result;
  },
  /*
  async getUserInfoByToken( ctx ) {
    const token = ctx.header.authorization  // 获取jwt
     let payload
     if (token) {
         payload = await jwt.verify(token.split(' ')[1], 'vue-koa-demo')  // // 解密，获取payload
        console.log('用户信息： '+payload.name)
        ctx.body  = await user.getUserById(payload.id)
     } else {
         ctx.body = {
             message: 'token 错误',
             code: -1
         }
     }

  },
*/
  async postUserAuth(ctx){
    const data = ctx.request.body;
    const userInfo = await user.getUserByName(data.name);

    if(userInfo != null){
        //if(userInfo.password !=data.password){
        if(!bcrypt.compareSync(data.password, userInfo.password)){
            ctx.body ={
                success: false,
                info: '密码错误！'
            }
        }else{
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            const secret = 'vue-koa-demo';
            const token = jwt.sign(userToken,secret);
            ctx.body = {
                success: true,
                token: token,
            }
        }
    }else{
        ctx.body ={
            success:false,
            info: '用户不存在'
        }
    }
}
}
