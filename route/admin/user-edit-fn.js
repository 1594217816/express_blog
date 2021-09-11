
const { User, validateUser } = require('../../model/user');

//导入bcrypt 进行密码加密
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

    try {
        await validateUser(req.body);
    } catch (error) {
        //验证没有通过
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
        //使用错误处理中间件进行跳转
        //JSON.stringify()  将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));
    }

    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    //如果邮箱用户已经存在  说明邮箱地址已经被别人占用
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被人占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被人占用' }));
    }

    //对密码进行加密处理

    //生成随机字符串
    const salt = await bcrypt.genSalt(10);

    //加密
    const password = await bcrypt.hash(req.body.password, salt);

    //替换body中的密码
    req.body.password = password;

    //将用户信息添加至数据库中
    await User.create(req.body);

    //将页面重定向至用户列表页面
    res.redirect('/admin/user');
}