"use strict";

var ObjectId = require('mongoose').Types.ObjectId;

exports.isObjectId = function (req, res, next) {
  if (!req.params.id || !ObjectId.isValid(req.params.id)) return res.status(400).send({
    error: "Invalid id provided: ".concat(req.params.id)
  });
  next();
};
//# sourceMappingURL=validators.js.map