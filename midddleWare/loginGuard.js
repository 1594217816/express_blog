module.exports = (req, res, next) => {
    //1. 判断用户访问的是否是登录页面
    //2. 判断用户的登录状态
    //3. 如果用户是登录状态  将请求放行
    //4. 如果用户不是登录状态 将请求重定向至登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果用户是登录状态  并且是一个普通用户
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        }

        next();
    }
}

