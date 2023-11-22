const { getArticle, checkArticleExists, getAllArticlesObj } = require("../models/articles.model")

exports.getAllArticles = (req, res, next) => {
    const query = req.query
    var size = Object.keys(query).length;
    if(size > 0) {
        res.status(400).send({msg: "Bad Request"})}
    else
    getAllArticlesObj().then((body) => {
    res.status(200).send({body})
}).catch(next)
}

exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id 
    const articlePromises = [getArticle(article_id), checkArticleExists(article_id)] 

    Promise.all(articlePromises).then((resolvedPromises) => {
        const article = resolvedPromises[0];
        res.status(200).send(article);
        }).catch(next);
    };