"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _assignIn2 = _interopRequireDefault(require("lodash/assignIn"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _Consultant = _interopRequireDefault(require("../models/Consultant"));

var _Certificate = _interopRequireDefault(require("../models/Certificate"));

var _jwt = require("../utils/jwt");

var _defaults = require("../utils/validation/defaults");

var _validators = require("../middlewares/validators");

var _wrap = _interopRequireDefault(require("../middlewares/wrap"));

var _multer = _interopRequireDefault(require("../middlewares/multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/consultant/list', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var consultants;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Consultant.default.find(req.query);

          case 2:
            consultants = _context.sent;
            res.status(200).send({
              data: consultants
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
router.get('/consultant/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var consultant;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Consultant.default.findById(req.params.id).populate('company');

          case 2:
            consultant = _context2.sent;

            if (consultant) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: "Consultant Not Found"
            }));

          case 5:
            res.status(200).send({
              data: consultant
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
router.post('/consultant/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var consultant, validationError, saved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            consultant = new _Consultant.default(_objectSpread({}, req.body));
            validationError = consultant.validateSync();

            if (!validationError) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 4:
            _context3.next = 6;
            return consultant.save();

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
router.post('/consultant/authenticate', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var consultant, verified, token;
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
            return _Consultant.default.findOne({
              email: req.body.email
            }).select('+password').populate('company').exec();

          case 4:
            consultant = _context4.sent;

            if (consultant) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Email or password is incorrect"
            }));

          case 7:
            _context4.next = 9;
            return consultant.verifyPassword(req.body.password);

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
            token = (0, _jwt.sign)(consultant);
            consultant.password = undefined;
            return _context4.abrupt("return", res.status(200).send({
              token: token,
              data: consultant
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
 *  @param {string} field Field you want to change
 *  @param {string|number|array|object|boolean}  value New value
 *  @param {string} old (Optional) Must be provided if you want to change password, 
 *  Note: 'Bill', 'verified', 'completed' fields can't be changed explicitly using this method
 *        'Completed' field may be set to true if all fields required for it was initialized
 */

router.patch('/consultant/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body, field, value, old, consultant, validationError, saved;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, field = _req$body.field, value = _req$body.value, old = _req$body.old;

            if (!(!field || !value)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Wrong data! Field and value must be provided"
            }));

          case 3:
            if (!['bill', 'verified', 'completed'].includes(field)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "".concat(field, " field can't be changed this way ")
            }));

          case 5:
            _context5.next = 7;
            return _Consultant.default.findById(req.params.id).populate('company').exec();

          case 7:
            consultant = _context5.sent;

            if (consultant) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Consultant Not Found"
            }));

          case 10:
            // temporary unavailable
            // if (field === 'password') {
            // const verified = await consultant.verifyPassword(old)
            // if (!verified) return res.status(400).send({ error: 'Old password is incorrect!' })
            // }
            if (field === 'languages' && _typeof(value) === 'object') {
              consultant.languages.push(value); //TODO: editing and removing of language and its certificate
              // _forEach(value, language => consultant.language.push(language))

              consultant.markModified('languages');
            } else if (typeof value === 'string' || typeof value === 'number') {
              consultant[field] = value;
            }

            validationError = consultant.validateSync();

            if (!validationError) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 14:
            if (isCompleted(consultant)) consultant.completed = true;
            _context5.next = 17;
            return consultant.save();

          case 17:
            saved = _context5.sent;

            /* don't let the passport be sent to client */
            saved.password = undefined;
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
router.patch('/consultant/list/:id/certificate', _validators.isObjectId, _multer.default.single('file'), (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var consultant, imageFile, finalImg, validationError, saved;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Consultant.default.findById(req.params.id).populate('company');

          case 2:
            consultant = _context6.sent;

            if (consultant) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: "Consultant Not Found"
            }));

          case 5:
            imageFile = _fs.default.readFileSync(req.file.path);
            finalImg = {
              contentType: req.file.mimetype,
              data: new Buffer(imageFile, 'base64')
            };
            consultant.certificate = {
              title: req.body.title,
              type: req.body.type,
              note: req.body.note,
              image: finalImg
            };
            validationError = consultant.validateSync();

            if (!validationError) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 11:
            _context6.next = 13;
            return consultant.save();

          case 13:
            saved = _context6.sent;
            res.status(200).send({
              data: saved
            });

          case 15:
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
router.patch('/consultant/list/:id/chat', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var consultant, validationError, saved;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Consultant.default.findById(req.params.id);

          case 2:
            consultant = _context7.sent;

            if (consultant) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              error: "Consultant Not Found"
            }));

          case 5:
            consultant.chat = req.body;
            validationError = consultant.validateSync();

            if (!validationError) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 9:
            _context7.next = 11;
            return consultant.save();

          case 11:
            saved = _context7.sent;
            res.status(200).send({
              data: saved
            });

          case 13:
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
router.delete('/consultant/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var consultant;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Consultant.default.findById(req.params.id);

          case 2:
            consultant = _context8.sent;

            if (consultant) {
              _context8.next = 5;
              break;
            }

            return _context8.abrupt("return", res.status(400).send({
              error: "Consultant Not Found"
            }));

          case 5:
            _context8.next = 7;
            return consultant.remove();

          case 7:
            res.status(200).send({
              message: "Consultant deleted"
            });

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}()));
/**
 * Adding an opportunity to clear a collection for non-production environment
 */

process.env.NODE_ENV !== 'prod' && router.delete('/consultant/clear', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var consultants;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _Consultant.default.deleteMany();

          case 2:
            _context9.next = 4;
            return _Consultant.default.find();

          case 4:
            consultants = _context9.sent;

            if (!consultants.length) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", res.status(500).send({
              error: "Due to unknown reason consultants weren't deleted"
            }));

          case 7:
            res.status(200).send({
              message: 'Consultants were deleted'
            });

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}()));

var isCompleted = function isCompleted(consultant) {
  return consultant.age && consultant.phone && consultant.image !== _defaults.images.consultant && consultant.gender && consultant.certificate && consultant.verified;
};

module.exports = router;
//# sourceMappingURL=consultant.js.map