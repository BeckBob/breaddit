const express = require("express");
const { getAllTopics } = require("./controllers/topics.controller");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors");
const { notFound } = require("./controllers/errors.controller");
const { getEndpoints } = require("./controllers/endpoints.controller");
const { getArticleById, getAllArticles, getComments, postComment, updateArticle } = require("./controllers/articles.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getEndpoints);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", updateArticle);


app.all("*", notFound);

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;


