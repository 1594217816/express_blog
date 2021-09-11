const { render } = require('art-template');
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块   实现分页功能
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let page = req.query.page;

    let result = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    //这里需要将对象转换为JSON对象 
    let str = JSON.stringify(result);
    let articlesJSON = JSON.parse(str);


    res.render('home/default.art', {
        articlesJSON
    });
}