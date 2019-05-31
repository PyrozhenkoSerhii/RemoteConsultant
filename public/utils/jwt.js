"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import blacklist from 'express-jwt-blacklist'
exports.sign = function (user) {
  _logger.default.info("[JWT] User -".concat(user.username, "- was signed"));

  return _jsonwebtoken.default.sign(user.toJSON(), _config.default.api.secret, {
    expiresIn: '24h'
  });
};

exports.verify = function (token) {
  _jsonwebtoken.default.verify(token, _config.default.secret, function (err, decoded) {
    if (err) {
      _logger.default.warn("[JWT] Token isn't valid, err: ".concat(JSON.stringify(err.name)));

      return false;
    }

    if (decoded) {
      _logger.default.info("[JWT] Token was verified");

      return true;
    }
  });
};
//# sourceMappingURL=jwt.js.map