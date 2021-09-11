//导入评论集合
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 接受客户端传递过来的请求参数
    const { content, aid, uid } = req.body;

    // 将评论信息存储在评论集合中
    await Comment.create({
        aid: aid,
        uid: uid,
        time: new Date(),
        content: content
    });

    // 将页面重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);
}