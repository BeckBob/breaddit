const { getArticle, checkArticleExists, getAllArticlesObj, getCommentsForArticle, postComments, postCommentInArticle } = require("../models/articles.model");
const { checkUserExists } = require("../models/users.model");

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
    const commentsPromises = [checkArticleExists(article_id), getCommentsForArticle(article_id)]

    Promise.all(commentsPromises).then((resolvedPromises) => {
        const comments = resolvedPromises[1]
        res.status(200).send({comments});
    }).catch(next);
    
};

exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    const body = req.body
    const {username} = req.body
    const postCommentPromises = [checkArticleExists(article_id), checkUserExists(username), postCommentInArticle(article_id, body)]
   
    Promise.all(postCommentPromises).then((resolvedPromises) => {
        const comment = resolvedPromises[2]
    res.status(201).send({ comment })
    }).catch(next);
};