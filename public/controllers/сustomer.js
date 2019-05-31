"use strict";

var _express = _interopRequireDefault(require("express"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _Customer = _interopRequireDefault(require("../models/Customer"));

var _jwt = require("../utils/jwt");

var _wrap = _interopRequireDefault(require("../middlewares/wrap"));

var _validators = require("../middlewares/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/customer/list/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var customer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Customer.default.find(req.query);

          case 2:
            customer = _context.sent;
            return _context.abrupt("return", res.status(200).send({
              data: customer
            }));

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
router.get('/customer/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var customer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Customer.default.findById(req.params.id);

          case 2:
            customer = _context2.sent;

            if (customer) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: "Customer not found"
            }));

          case 5:
            return _context2.abrupt("return", res.status(200).send({
              data: customer
            }));

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
router.post('/customer/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var customer, validationError, saved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            customer = new _Customer.default(_objectSpread({}, req.body));
            validationError = customer.validateSync();

            if (!validationError) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 4:
            _context3.next = 6;
            return customer.save();

          case 6:
            saved = _context3.sent;
            res.status(201).send({
              data: saved
            });

          case 8:
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
router.post('/customer/authenticate', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var customer, verified, token;
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
            return _Customer.default.findOne({
              email: req.body.email
            }).select('+password').exec();

          case 4:
            customer = _context4.sent;

            if (customer) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Email or password is incorrect"
            }));

          case 7:
            _context4.next = 9;
            return customer.verifyPassword(req.body.password);

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
            token = (0, _jwt.sign)(customer);
            customer.password = undefined;
            return _context4.abrupt("return", res.status(200).send({
              token: token,
              data: customer
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
 */

router.patch('/customer/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body, field, value, customer, validationError, saved;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, field = _req$body.field, value = _req$body.value;

            if (!(!field || !value)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Wrong data! Field and value must be provided"
            }));

          case 3:
            _context5.next = 5;
            return _Customer.default.findById(req.params.id);

          case 5:
            customer = _context5.sent;

            if (customer) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Customer Not Found"
            }));

          case 8:
            if (!(_typeof(value) === 'object')) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Field type must match the provided value type"
            }));

          case 10:
            customer[field] = value;
            validationError = customer.validateSync();

            if (!validationError) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 14:
            _context5.next = 16;
            return customer.save();

          case 16:
            saved = _context5.sent;

            if (!saved.password) {
              _context5.next = 19;
              break;
            }

            return _context5.abrupt("return", res.status(200).send({
              message: "Password was changed"
            }));

          case 19:
            res.status(200).send({
              data: saved
            });

          case 20:
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
router.delete('/customer/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var customer;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Customer.default.findById(req.params.id);

          case 2:
            customer = _context6.sent;

            if (customer) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: "Customer Not Found"
            }));

          case 5:
            _context6.next = 7;
            return customer.remove();

          case 7:
            res.status(200).send({
              message: "Customer deleted"
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

process.env.NODE_ENV !== 'prod' && router.delete('/customer/clear', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var customers;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Customer.default.deleteMany();

          case 2:
            _context7.next = 4;
            return _Customer.default.find();

          case 4:
            customers = _context7.sent;

            if (!customers.length) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(500).send({
              error: "Due to unknown reason customers weren't deleted"
            }));

          case 7:
            res.status(200).send({
              message: 'Customers were deleted'
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
//# sourceMappingURL=сustomer.js.map