const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //接受客户端传递过来的参数
    //接受post参数
    const { username, email, role, state, password } = req.body;
    //接受get参数
    const id = req.query.id;

    let user = await User.findOne({ _id: id });

    //密码比对
    let idValid = await bcrypt.compare(password, user.password);

    //密码比对成功
    if (idValid) {
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        //重定向用户列表页面
        res.redirect('/admin/user');
    } else {
        //密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码输入错误，不能修改', id: id };
        next(JSON.stringify(obj));
    }
}