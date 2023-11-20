const express = require("express");
const { getAllTopics } = require("./controllers/topics.controller");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors");
const { notFound } = require("./controllers/errors.controller");

const app = express();

app.use(express.json());


app.get("/api/topics", getAllTopics);

app.all("*", notFound)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;


