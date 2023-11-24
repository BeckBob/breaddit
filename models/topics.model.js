const db = require("../db/connection");

exports.getTopicsArray = () => {
    return db.query("SELECT * FROM topics")
    .then(({ rows }) => { return rows });
}

exports.checkTopicExists = (query) => {
const {topic} = query
console.log(topic)
    return db.query(`SELECT * FROM articles WHERE topic = $1`, [topic])
.then(( {rows }) => {
    if(!rows.length) {
        return Promise.reject({status: 404, msg: "Not Found"})
    }
}
)}