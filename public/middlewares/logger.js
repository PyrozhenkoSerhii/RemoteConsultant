"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

var _logger = _interopRequireDefault(require("../utils/logger"));

var _regex = require("../utils/validation/regex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_shortid.default.characters(_regex.idCharacters);

var loggerMiddleware = function loggerMiddleware(req, res, next) {
  var id = _shortid.default.generate();

  var withBody = process.env.NODE_ENV === 'dev';
  addJsonBody(res);

  if (withBody) {
    _logger.default.info("[".concat(id, "] Request url:").concat(req.originalUrl, ", method:").concat(req.method, ", headers:").concat(req.headers['user-agent'], ", body:").concat(JSON.stringify(req.body)));
  } else {
    _logger.default.info("[".concat(id, "] Request url:").concat(req.originalUrl, ", method:").concat(req.method, ", headers:").concat(req.headers['user-agent']));
  }

  var onFinishedListener = function onFinishedListener() {
    clearListeners();

    if (res.statusCode >= 500) {
      _logger.default.error("[".concat(id, "] Request on url ").concat(req.originalUrl, " finished with status ") + "".concat(res.statusCode, " ").concat(res.statusMessage, ", err: ").concat(JSON.stringify(res.JsonBody.error || "Unknown error. See the server.logs")));
    } else if (res.statusCode >= 400) {
      _logger.default.warn("[".concat(id, "] Request on url ").concat(req.originalUrl, " finished with status ") + "".concat(res.statusCode, " ").concat(res.statusMessage, ", err: ").concat(JSON.stringify(res.JsonBody.error || res.JsonBody.errors)));
    } else {
      _logger.default.info("[".concat(id, "] Request on url ").concat(req.originalUrl, " finished with status ").concat(res.statusCode, " ").concat(res.statusMessage));
    }

    res.JsonBody = null;
  };

  var onClosedListener = function onClosedListener() {
    clearListeners();

    _logger.default.warn("[".concat(id, "] Request on url ").concat(req.originalUrl, " was aborted by the client"));
  };

  var onErrorListener = function onErrorListener(err) {
    clearListeners();

    _logger.default.error("[".concat(id, "] Unexpected error occured during requst on url ").concat(req.originalUrl, ", error: ").concat(JSON.stringify(err)));
  };

  var clearListeners = function clearListeners() {
    res.removeListener('finish', onFinishedListener);
    res.removeListener('close', onClosedListener);
    res.removeListener('error', onErrorListener);
  };

  res.on('finish', onFinishedListener);
  res.on('close', onClosedListener);
  res.on('error', onErrorListener);
  next();
};

var addJsonBody = function addJsonBody(res) {
  var oldEnd = res.end;
  var bodyBuffer = [];

  res.end = function () {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    try {
      if (rest[0]) bodyBuffer.push(new Buffer.from(rest[0]));
      res.JsonBody = JSON.parse(Buffer.concat(bodyBuffer).toString('utf8'));
      oldEnd.apply(res, rest);
    } catch (e) {
      res.JsonBody = "{error: 'Unexpected error occured due code'}";
      oldEnd.apply(res, rest);
    }
  };
};

var _default = loggerMiddleware;
exports.default = _default;
//# sourceMappingURL=logger.js.map