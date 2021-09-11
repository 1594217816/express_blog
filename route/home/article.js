const { Article } = require('../../model/article');

//导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    //接受客户端传递过来的文章id
    const id = req.query.id;
    let article = await Article.findOne({ _id: id }).populate('author').lean();

    let comments = await Comment.find({ aid: id }).populate('uid').lean();
    // res.send(comments);
    // return;

    res.render('home/article.art', {
        article,
        comments
    });
}