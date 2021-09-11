const { User } = require('../../model/user');

module.exports = async (req, res) => {
    //标识   表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 获取地址栏中的id参数
    const { message, id } = req.query;

    //根据客户端是否传过来id参数来判断是注册用户还是修改用户信息
    //如果当前传递了id参数 说明是修改用户信息
    if (id) {
        //修改操作
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }


}