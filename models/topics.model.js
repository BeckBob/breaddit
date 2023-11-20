const db = require("../db/connection");

exports.getTopicsArray = () => {
    return db.query("SELECT * FROM topics")
    .then(({ rows }) => { return rows});
}