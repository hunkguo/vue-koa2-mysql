
const db = require('../config/db.js'),
        userModel = '../schema/user.js';

const TodolistDb = db.Todolist;

const User = TodolistDb.import(userModel);


module.exports = {
    async getUserById(id){

    const userInfo = await User.findOne({
        attributes: ['id', ['user_name', 'name']],
        where: {
            id: id
        }
    });
    return userInfo
    },
    async getUserByName(name){
        const userInfo = await User.findOne({
            where: {
                user_name: name
            }
        })
        return userInfo
    }
}
