//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');

//导入joi模块进
const Joi = require('joi');

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        //保证邮箱地址填入数据库中不重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启动
    // 1 禁用
    state: {
        type: String,
        default: 0
    }
});

//创建集合
const User = mongoose.model('User', userSchema);

//导入bcrypt 进行密码加密
const bcrypt = require('bcrypt');

// async function createUser() {
//     //1. 生成盐
//     const salt = await bcrypt.genSalt(10);
//     //2. 生成加密密码
//     const password = await bcrypt.hash('123456', salt);
//     const user = await User.create({
//         username: 'root',
//         email: '1594217816@qq.com',
//         password: password,
//         role: 'admin',
//         state: 0
//     });
// }

// createUser();

const validateUser = user => {
    const schema = Joi.object({
        username: Joi.string().min(5).max(10).required().error(new Error('username没有通过验证')),
        email: Joi.string().required().error(new Error('邮箱格式不正确')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,12}$/).required().error(new Error('password没有通过验证')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不正确')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    });
    return schema.validateAsync(user);
}




//将用户集合作为模块成员进行导出
module.exports = {
    // 在ES6中 当属性和属性的值一样时 可以简写成User
    // 下面这行代码等价于User: User
    User,
    validateUser
}