"use strict";

var _express = _interopRequireDefault(require("express"));

var _assignIn = _interopRequireDefault(require("lodash/assignIn"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _Consultation = _interopRequireDefault(require("../models/Consultation"));

var _wrap = _interopRequireDefault(require("../middlewares/wrap"));

var _validators = require("../middlewares/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/consultation/list/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var consultations;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Consultation.default.find(req.query);

          case 2:
            consultations = _context.sent;
            res.status(200).send({
              data: consultations
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
router.get('/consultation/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var consultation;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Consultation.default.findById(req.params.id);

          case 2:
            consultation = _context2.sent;

            if (consultation) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: "Consultation Not Found"
            }));

          case 5:
            res.status(200).send({
              data: consultation
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
router.post('/consultation/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var consultation, validationError, saved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            consultation = new _Consultation.default(_objectSpread({}, req.body));
            validationError = consultation.validateSync();

            if (!validationError) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 4:
            _context3.next = 6;
            return consultation.save();

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
router.put('/consultation/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var consultation, validationError, saved;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Consultation.default.findById(req.params.id);

          case 2:
            consultation = _context4.sent;

            if (consultation) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Consultation Not Found"
            }));

          case 5:
            (0, _assignIn.default)(consultation, req.body);
            validationError = consultation.validateSync();

            if (!validationError) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 9:
            _context4.next = 11;
            return consultation.save();

          case 11:
            saved = _context4.sent;
            res.status(200).send({
              data: saved
            });

          case 13:
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
 * @param {object} message Message object you want to insert
 */

router.patch('/consultation/list/:id/message', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var consultation, validationError, saved;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Consultation.default.findById(req.params.id);

          case 2:
            consultation = _context5.sent;

            if (consultation) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Consultation Not Found"
            }));

          case 5:
            consultation.messages.push(req.body.message);
            validationError = (0, _last2.default)(consultation.messages).validateSync();

            if (!validationError) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 9:
            _context5.next = 11;
            return consultation.save();

          case 11:
            saved = _context5.sent;
            res.status(200).send({
              data: saved
            });

          case 13:
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
router.delete('/consultation/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var consultation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Consultation.default.findById(req.params.id);

          case 2:
            consultation = _context6.sent;

            if (consultation) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: "Consultation Not Found"
            }));

          case 5:
            _context6.next = 7;
            return consultation.remove();

          case 7:
            res.status(200).send({
              message: "Consultation deleted"
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

process.env.NODE_ENV !== 'prod' && router.delete('/consultation/clear', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var consultations;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Consultation.default.deleteMany();

          case 2:
            _context7.next = 4;
            return _Consultation.default.find();

          case 4:
            consultations = _context7.sent;

            if (!consultations.length) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(500).send({
              error: "Due to unknown reason consultations weren't deleted"
            }));

          case 7:
            res.status(200).send({
              message: 'Consultations were deleted'
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
//# sourceMappingURL=consultation.js.map