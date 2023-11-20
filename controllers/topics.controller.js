const { getTopicsArray } = require("../models/topics.model");


exports.getAllTopics = (req, res, next) => {
    getTopicsArray().then((topics) => 
    res.status(200).send({topics})).catch(next)
    
   };