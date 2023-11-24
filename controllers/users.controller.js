const { getEveryUser } = require("../models/users.model")


exports.getAllUsers = (req, res, next) => {
    getEveryUser().then((users) => {
    
    res.status(200).send({users})
})
}