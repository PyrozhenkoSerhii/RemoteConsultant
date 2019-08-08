"use strict";

var _express = _interopRequireDefault(require("express"));

var _assignIn2 = _interopRequireDefault(require("lodash/assignIn"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _Representative = _interopRequireDefault(require("../models/Representative"));

var _Company = _interopRequireDefault(require("../models/Company"));

var _wrap = _interopRequireDefault(require("../middlewares/wrap"));

var _validators = require("../middlewares/validators");

var _jwt = require("../utils/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/representative/list', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var representatives;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Representative.default.find(req.query);

          case 2:
            representatives = _context.sent;
            res.status(200).send({
              data: representatives
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
router.get('/representative/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var representative;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Representative.default.findById(req.params.id);

          case 2:
            representative = _context2.sent;

            if (representative) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: "Representative Not Found"
            }));

          case 5:
            res.status(200).send({
              data: representative
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));
/**
 * Request body must be like:
 * @param {string} secret Secret from company to prove representative's identity
 * @param {object} representative Representative object you want to save
 */

router.post('/representative/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, secret, info, companies, match, representative, validationError, saved;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, secret = _req$body.secret, info = _objectWithoutProperties(_req$body, ["secret"]);

            if (secret) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: "Secret is required!"
            }));

          case 3:
            _context3.next = 5;
            return _Company.default.find({}).select('+secret').exec();

          case 5:
            companies = _context3.sent;
            match = null;
            (0, _forEach2.default)(companies, function (company) {
              if (company.secret === secret) {
                match = company;
                return false;
              }
            });

            if (match) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: "Secret doesn't match any company"
            }));

          case 10:
            info.company = match._id;
            representative = new _Representative.default(_objectSpread({}, info));
            validationError = representative.validateSync();

            if (!validationError) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 15:
            _context3.next = 17;
            return representative.save();

          case 17:
            saved = _context3.sent;
            res.status(201).send({
              data: saved
            });

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()));
router.post('/representative/authenticate', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var representative, verified, token;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!req.body.email || !req.body.password)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              error: 'Email and password are required!'
            }));

          case 2:
            _context4.next = 4;
            return _Representative.default.findOne({
              email: req.body.email
            }).select('+password').exec();

          case 4:
            representative = _context4.sent;

            if (representative) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Email or password is incorrect"
            }));

          case 7:
            _context4.next = 9;
            return representative.verifyPassword(req.body.password);

          case 9:
            verified = _context4.sent;

            if (verified) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: 'Email or password is incorrect'
            }));

          case 12:
            token = (0, _jwt.sign)(representative);
            representative.password = undefined;
            return _context4.abrupt("return", res.status(200).send({
              token: token,
              data: representative
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()));
/**
 * Request body must be like:
 *  @param {string}  field Field you want to change
 *  @param {string|number}  value New value
 * Note: Company field can't be changed
 */

router.patch('/representative/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, field, value, representative, validationError, saved;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, field = _req$body2.field, value = _req$body2.value;

            if (!(!field || !value)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Wrong data! Field and value must be provided"
            }));

          case 3:
            _context5.next = 5;
            return _Representative.default.findById(req.params.id);

          case 5:
            representative = _context5.sent;

            if (representative) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Representative Not Found"
            }));

          case 8:
            if (!(0, _isUndefined2.default)(representative[field])) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Inexistent field provided: ".concat(field)
            }));

          case 10:
            if (!(field === 'company')) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Company can't be changed"
            }));

          case 12:
            if (!(_typeof(value) === 'object')) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Field type must match the provided value type"
            }));

          case 14:
            representative[field] = value;
            validationError = representative.validateSync();

            if (!validationError) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 18:
            _context5.next = 20;
            return representative.save();

          case 20:
            saved = _context5.sent;
            res.status(200).send({
              data: saved
            });

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()));
router.delete('/representative/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var representative;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Representative.default.findById(req.params.id);

          case 2:
            representative = _context6.sent;

            if (representative) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: "Representative Not Found"
            }));

          case 5:
            _context6.next = 7;
            return representative.remove();

          case 7:
            res.status(200).send({
              message: "Representative deleted"
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()));
/**
 * Adding an opportunity to clear a collection for non-production environment
 */

process.env.NODE_ENV !== 'pproductionrod' && router.delete('/representative/clear', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var representatives;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Representative.default.deleteMany();

          case 2:
            _context7.next = 4;
            return _Representative.default.find();

          case 4:
            representatives = _context7.sent;

            if (!representatives.length) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(500).send({
              error: "Due to unknown reason representatives weren't deleted"
            }));

          case 7:
            res.status(200).send({
              message: 'Representatives were deleted'
            });

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()));
module.exports = router;
//# sourceMappingURL=representative.js.map