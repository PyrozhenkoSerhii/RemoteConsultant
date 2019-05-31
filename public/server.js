"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _expressJwtBlacklist = _interopRequireDefault(require("express-jwt-blacklist"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _helmet = _interopRequireDefault(require("helmet"));

var _fs = _interopRequireDefault(require("fs"));

var _config = _interopRequireDefault(require("./config"));

var _logger = _interopRequireDefault(require("./middlewares/logger"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _logger2 = _interopRequireDefault(require("./utils/logger"));

var _ustomer = _interopRequireDefault(require("./controllers/\u0441ustomer"));

var _company = _interopRequireDefault(require("./controllers/company"));

var _consultant = _interopRequireDefault(require("./controllers/consultant"));

var _consultation = _interopRequireDefault(require("./controllers/consultation"));

var _product = _interopRequireDefault(require("./controllers/product"));

var _representative = _interopRequireDefault(require("./controllers/representative"));

var _order = _interopRequireDefault(require("./controllers/order"));

var _certificate = _interopRequireDefault(require("./controllers/certificate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PeerServer = require('peer').ExpressPeerServer;

var api = (0, _express.default)();
var port = process.env.PORT || _config.default.api.port; // const ExpressPeerServer = require('peer').ExpressPeerServer;
// const server = http.createServer(api)
// const peerServer = ExpressPeerServer(server, {
// 	debug: true,
// 	ssl: {
// 		key: fs.readFileSync('./ssl/key.pem', 'utf8'),
// 		cert: fs.readFileSync('./ssl/cert.pem', 'utf8'),
// 		passphrase: process.env.PASSPHRASE
// 	}
// })

var limiter = (0, _expressRateLimit.default)({
  windowsMs: 15 * 60 * 1000,
  max: 100
});

_expressJwtBlacklist.default.configure({
  store: {
    type: 'redis',
    host: _config.default.redis.host,
    port: _config.default.redis.port
  }
}); // api.use('/p2p', peerServer)


api.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
var enviroment = process.env.NODE_ENV || 'dev';
if (enviroment === 'dev') api.enable('trust proxy');
api.use((0, _helmet.default)());
api.use((0, _cors.default)());
api.use(_bodyParser.default.urlencoded({
  extended: true
}));
api.use(_bodyParser.default.json());
api.use(limiter);
api.use(_logger.default); // force jwt to work in production env only

enviroment === 'prod' && api.use((0, _expressJwt.default)({
  secret: _config.default.api.secret
}).unless(function (req) {
  return req.originalUrl.match(/^((?!api).)*$/) || req.originalUrl === '/api/customers' && req.method === 'POST' || req.originalUrl === '/api/consultant' && req.method === 'POST' || req.originalUrl === '/api/representative' && req.method === 'POST' || req.originalUrl === '/api/customer/authenticate' || req.originalUrl === '/api/consultant/authenticate' || req.originalUrl === '/api/representative/authenticate';
}));
enviroment === 'prod' && api.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    _logger2.default.warn("[JWT] No authorization provided with request ".concat(req.originalUrl));

    res.status(401).send({
      error: "You have no permitions to make this request"
    });
  }
});
api.use('/api/', _ustomer.default);
api.use('/api/', _product.default);
api.use('/api/', _company.default);
api.use('/api/', _consultant.default);
api.use('/api/', _consultation.default);
api.use('/api/', _representative.default);
api.use('/api/', _order.default);
api.use('/api/', _certificate.default);
api.use(_errorHandler.default);
api.use(_express.default.static(_path.default.join(__dirname, '../public')));
api.get('*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '../public', 'index.html'));
});
api.all('*', function (req, res) {
  // res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
  res.status(404).send({
    error: "Path ".concat(req.originalUrl, " with method ").concat(req.method, " not found!")
  });
});

_mongoose.default.connect(_config.default.db.connectionString, _config.default.db.options).then(function () {
  return _logger2.default.info("[API] Connection to ".concat(_config.default.db.databaseName, " db was established "));
}, function (err) {
  return _logger2.default.error("[API] Error occured while connection to ".concat(_config.default.db.databaseName, " db"), err);
});

_mongoose.default.set('useCreateIndex', true);

enviroment === 'dev' && _mongoose.default.set('debug', function (coll, method) {
  _logger2.default.info("[Mongoose] Path: /".concat(coll, ", method: ").concat(method));
}); // api.listen(port, err => {

var server = api.listen(port, function (err) {
  if (err) {
    _logger2.default.error("[API] Error while launhing the server: ".concat(err));

    process.exit(1);
  } else {
    _logger2.default.info("[API] Server is running on port ".concat(port));
  }
});
var peerServer = PeerServer(server, {
  debug: true,
  ssl: {
    key: _fs.default.readFileSync('ssl/key.pem', 'utf8'),
    cert: _fs.default.readFileSync('ssl/cert.pem', 'utf8'),
    passphrase: process.env.PASSPHRASE
  }
});
api.use('/p2p/', peerServer);
module.exports = server;
//# sourceMappingURL=server.js.map