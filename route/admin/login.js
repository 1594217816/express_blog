// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入bcrypt模块  进行密码匹配
const bcrypt = require('bcrypt');


module.exports = async (req, res) => {
    // 接受请求参数
    // 将请求参数解构
    const { email, password } = req.body;
    // 二次验证  在服务器端再一次判断用户发送的请求参数
    // 因为用户可能会禁用javascript代码的执行
    // 如果用户没有输入邮件地址或者
    if (email.trim().length == 0 || password.trim().length == 0) {
        // return res.status(400).send("<h4>邮件地址或者密码错误！</h4>");
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误！' });
    }

    let user = await User.findOne({ email });
    //如果查找到用户
    if (user) {
        // 密码匹配
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // 登录成功以后  需要将用户信息存储在session中
            req.session.username = user.username;
            // 将用户角色存储在session中
            req.session.role = user.role;

            // res.send('success');
            //req.app属性对象就是app.js中的app对象
            req.app.locals.userInfo = user;

            //对用户的角色进行判断
            if (user.role == 'admin') {
                // 重定向至列表页面 第一个参数是地址
                res.redirect('/admin/user');
            } else {
                // 重定向到用户列表页面
                res.redirect('/home/');
            }


        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误！' });
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误！' });
    }
}

