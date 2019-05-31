"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combine = _winston.format.combine;
var enviroment = process.env.NODE_ENV || 'dev';
var logger = (0, _winston.createLogger)({
  format: combine(_winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), _winston.format.printf(function (info) {
    return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
  })),
  transports: [new _winston.transports.Console({
    silent: enviroment === 'test',
    format: combine(_winston.format.colorize(), _winston.format.timestamp({
      format: 'HH:mm:ss'
    }), _winston.format.printf(function (info) {
      return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
    }))
  }), new _winston.transports.File({
    filename: _config.default.api.logs.warning,
    level: 'warn',
    silent: enviroment === 'test'
  }), new _winston.transports.File({
    filename: _config.default.api.logs.error,
    level: 'error',
    silent: enviroment === 'test'
  })]
});
var _default = logger;
exports.default = _default;
//# sourceMappingURL=logger.js.map