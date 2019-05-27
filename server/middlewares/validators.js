const ObjectId = require('mongoose').Types.ObjectId


exports.isObjectId = (req, res, next) => {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })
    next()
} 