"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DUPLICATE_MONGO_ERROR = 11000;

var errorHandler = function errorHandler(err, req, res, next) {
  if (err.code === DUPLICATE_MONGO_ERROR) {
    var field = err.errmsg.split(".$")[1];
    field = field.split(" dup key")[0];
    field = field.substring(0, field.lastIndexOf("_"));
    return res.status(400).send({
      error: "This ".concat(field, " already exists")
    });
  } else if (err.stack.includes('Cast to ObjectId failed')) {
    return res.status(400).send({
      error: "Wrong id provided"
    });
  } else if (err.name === 'ValidationError') {
    // TODO: handle mongoose validation errors here
    return res.status(400).send({
      error: err.errors
    });
  } else {
    _logger.default.error(err.stack);

    return res.status(500).send({
      error: "Error occured on the server. If you are owner, check the logs of the server"
    });
  }
};

var _default = errorHandler;
exports.default = _default;
//# sourceMappingURL=errorHandler.js.map