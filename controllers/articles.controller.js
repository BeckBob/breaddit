const { getArticle, checkArticleExists } = require("../models/articles.model")

 

exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id 
    const articlePromises = [getArticle(article_id), checkArticleExists(article_id)] 

    Promise.all(articlePromises).then((resolvedPromises) => {
        const article = resolvedPromises[0];
        res.status(200).send(article);
        }).catch(next);
    };