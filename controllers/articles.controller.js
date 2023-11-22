const { getArticle, checkArticleExists, getAllArticlesObj, getCommentsForArticle } = require("../models/articles.model")

exports.getAllArticles = (req, res, next) => {
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

exports.getComments = (req, res, next) => {
    const {article_id} = req.params
    const commentsPromises = [getCommentsForArticle(article_id), checkArticleExists(article_id)]

    Promise.all(commentsPromises).then((resolvedPromises) => {
        res.status(200).send(resolvedPromises);
    }).catch(next)
    
}