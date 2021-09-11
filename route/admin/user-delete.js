const { User } = require('../../model/user');

module.exports = async (req, res) => {
    //获取要删除的用户id
    const id = req.query.id;
    // res.send(id);
    //根据id删除用户
    await User.findByIdAndDelete({ _id: id });
    //重定向至用户列表也买你
    res.redirect('/admin/user');
}