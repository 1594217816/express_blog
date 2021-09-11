//将文章集合构造函数导入当前文件中
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块   实现分页功能
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

    //标识   表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //接受客户端传递过来的页码
    const page = req.query.page;


    //查询所有文章数据
    //这里会报错  需要添加.lean()  
    //利用 lean（） 方法将多级联合的结果转化为普通对象 ，缓解两者的冲突
    //报错原因 当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面。所以报错
    //page 指定当前页数
    //size 指定每页显示的数据条数
    //total 查询到的数据条数
    //display 指定客户端要显示的页码数量
    //exec 向数据库中发送查询请求
    //查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();


    //这里需要将对象转换为JSON对象 
    let str = JSON.stringify(articles);
    let articlesJSON = JSON.parse(str);
    // articles = articles[0].author;
    // res.send(articles);
    res.render('admin/article.art',
        { articles: articlesJSON }
    );
}