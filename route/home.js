// 导入express模块
const express = require('express');
// 创建路由对象
const home = express.Router();
// 将路由和请求路径进行匹配
home.get('/', require('./home/index'));

//指定前台文章详情展示页面
home.get('/article', require('./home/article'));

//创建用户评论路由
home.post('/comment', require('./home/comment'));

// 将路由对象作为模块成员进行导出
module.exports = home;