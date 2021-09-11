// 引入express框架
const express = require('express');

//路径拼接模块
const path = require('path');

//使用express框架创建网站服务器
const app = express();

//引入express-session模块
const session = require('express-session');

//导入art-template 模板引擎
const template = require('art-template');

//导入dateformat 可以进行时间格式化设置
const dateformat = require('dateformat');


//导入morgan模块
const morgan = require('morgan');

//导入config模块
const config = require('config');

//数据库连接
require('./model/connect');

// 在模板中使用rander方法需要配置以下信息
// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

//向模板内部导入dataformate变量
template.defaults.imports.dateformat = dateformat;

//处理post请求参数  由于body-parser弃用  所以可以直接调用express框架内部的方法即可
//不过必须在express配置完成之后进行调用
app.use(express.urlencoded({ extended: false }));

//获取系统环境变量  返回值是对象
if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境')
} else {
    console.log('当前是生产环境')
}


//开放静态资源文件
//1.使用app.use拦截所有请求  这里的地址同样使用绝对路径

app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

//拦截所有请求  验证用户身份  是否处于登录状态
//配置session
app.use(session({
    secret: 'encryption',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//拦截所有请求  验证用户身份  未登录不能访问admin目录下的文件
//这里将业务方法单独放一个文件
app.use('/admin', require('./midddleWare/loginGuard'));

//接受路由模块
//require返回一个module.express对象  这个对象就是home Router对象
const home = require('./route/home');
const admin = require('./route/admin');



//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//设置错误处理中间件
app.use((err, req, res, next) => {
    //将字符串对象转换为对象类型
    //JSON.parse()
    const result = JSON.parse(err);

    //由于错误处理参数的数量不是固定的  所以需要字符串的拼接
    let params = [];

    for (let temp in result) {
        if (temp != 'path') {
            params.push(temp + '=' + result[temp]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

//监听端口
app.listen(8080);
console.log('网站服务器启动成功');