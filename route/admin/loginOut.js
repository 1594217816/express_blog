module.exports = (req, res) => {
    //删除session
    req.session.destroy(() => {
        //删除cookie
        res.clearCookie('connect.sid');
        //重定向至用户登录页面
        res.redirect('/admin/login');
        //删除res.app.locals.userInfo
        res.app.locals.userInfo = null;
    });
}