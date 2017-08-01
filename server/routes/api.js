const api =require('../controllers/todolist.js')
const koa_router =require('koa-router')
const user = require ('../controllers/user.js')
const router = koa_router()

router.get('/todolist/:id', api.getTodolist),
router.post('/todolist', api.createTodolist),
router.delete('/todolist/:userId/:id', api.removeTodolist),
router.put('/todolist/:userId/:id/:status', api.updateTodolist)

//router.get('/userinfo', user.getUserInfoByToken),
module.exports =  router
