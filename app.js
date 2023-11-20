const express = require("express");
const { getAllTopics } = require("./controllers/topics.controller");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors");
const { notFound } = require("./controllers/errors.controller");
const { getEndpoints } = require("./controllers/endpoints.controller");

const app = express();


app.get("/api/topics", getAllTopics);

app.get("/api", getEndpoints);


app.all("*", notFound);

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;

