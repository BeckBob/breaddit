const express = require("express");
const { getAllTopics } = require("./controllers/topics.controller");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors");
const { notFound } = require("./controllers/errors.controller");
const { getEndpoints } = require("./controllers/endpoints.controller");
const { getArticleById, getAllArticles, getComments, postComment, updateArticle, deleteComments } = require("./controllers/articles.controller");
const { getAllUsers } = require("./controllers/users.controller");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getEndpoints);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", updateArticle);

app.delete("/api/comments/:comment_id", deleteComments)

app.get("/api/users", getAllUsers);

app.all("*", notFound);

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;


