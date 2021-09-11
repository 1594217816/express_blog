// 导入express模块
const express = require('express');




// 创建路由对象
const admin = express.Router();

// 将路由和请求路径进行匹配
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 实现退出登录功能
admin.get('/loginout', require('./admin/loginOut'))

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 创建用户注册路由
admin.get('/user-edit', require('./admin/user-edit'));

// 创建注册用户功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 创建用户信息更新路由
admin.post('/user-modify', require('./admin/user-modify'));

// 创建用户信息删除路由
admin.get("/user-delete", require('./admin/user-delete'));

// 创建文章列表页面路由
admin.get('/article', require('./admin/article'));

// 创建文章编辑路由
admin.get('/article-edit', require('./admin/article-edit'));

// 创建实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'));

// 将路由对象作为模块成员进行导出
module.exports = admin;