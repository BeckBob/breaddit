const db = require("../db/connection");

exports.getArticle = (article_id) => {

return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
.then(( {rows} ) => { return rows[0]});
    
}

exports.getAllArticlesObj = () => {
    return db.query(`SELECT articles.author,
                    articles.title, 
                    articles.article_id,
                    articles.topic,
                    articles.created_at,
                    articles.votes,
                    articles.article_img_url,
                    CAST(COUNT(comments.article_id) AS integer) AS comment_count 
                    FROM articles
                    LEFT JOIN comments
                    ON comments.article_id = articles.article_id
                    GROUP BY 
                    articles.article_id,
                    comments.article_id
                    ORDER BY articles.article_id DESC;`)
    .then(({ rows }) => {
    
        {return rows}
    })
}

exports.checkArticleExists = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
.then(( {rows }) => {
    if(!rows.length) {
        return Promise.reject({status: 404, msg: "Not Found"})
    }
}
)}

exports.getCommentsForArticle = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY comment_id DESC`, [article_id])
    .then(( {rows }) => {
        
        {return rows}
    }
    )}
