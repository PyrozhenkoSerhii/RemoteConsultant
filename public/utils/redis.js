"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _config = _interopRequireDefault(require("config"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _redis.default.createClient({
  port: _config.default.get('redis.port'),
  host: _config.default.get('redis.host'),
  retry_strategy: function retry_strategy(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }

    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }

    if (options.attempt > 10) {
      return undefined;
    }

    return Math.min(options.attempt * 100, 3000);
  }
});

client.on('connect', function () {
  _logger.default.info("[Redis] Connection created on port ".concat(_config.default.get('redis.port'), " and host ").concat(_config.default.get('redis.host')));
});
client.on('error', function (err) {
  _logger.default.error("Redis error: ".concat(err, " "));
});
var _default = client;
exports.default = _default;
//# sourceMappingURL=redis.js.map