"use strict";

var _express = _interopRequireDefault(require("express"));

var _assignIn2 = _interopRequireDefault(require("lodash/assignIn"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _find3 = _interopRequireDefault(require("lodash/find"));

var _Company = _interopRequireDefault(require("../models/Company"));

var _Consultant = _interopRequireDefault(require("../models/Consultant"));

var _wrap = _interopRequireDefault(require("../middlewares/wrap"));

var _validators = require("../middlewares/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/company/list/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var companies;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Company.default.find(req.query).populate('certificates');

          case 2:
            companies = _context.sent;
            res.status(200).send({
              data: companies
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
router.get('/company/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var company;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Company.default.findById(req.params.id).populate('certificates');

          case 2:
            company = _context2.sent;

            if (company) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: "Company Not Found"
            }));

          case 5:
            res.status(200).send({
              data: company
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
 * In production, companies must be created directly in database by platform administrator
 */

process.env.NODE_ENV !== 'prod' && router.post('/company/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var company, validationError, saved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            company = new _Company.default(_objectSpread({}, req.body));
            validationError = company.validateSync();

            if (!validationError) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 4:
            _context3.next = 6;
            return company.save();

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
/**
 * Request body must be like:
 *  @param {string}  field Field you want to change
 *  @param {string|object}  value New value
 * Note: If the value is already in an array, it will be removed
 *       Request field value must match the Requst Schema (submodel)
 */

router.patch('/company/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, field, value, company, index, subdoc, validationError, saved, populated;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, field = _req$body.field, value = _req$body.value;

            if (!(!field || !value)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Wrong data! Field and value must be provided"
            }));

          case 3:
            _context4.next = 5;
            return _Company.default.findById(req.params.id);

          case 5:
            company = _context4.sent;

            if (company) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Company Not Found"
            }));

          case 8:
            if (!(field === 'secret')) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Secret can be changed manually only. Please contact platform administrator"
            }));

          case 10:
            if (!(0, _isUndefined2.default)(company[field])) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Inexistent field provided: ".concat(field)
            }));

          case 12:
            if (!(_typeof(company[field]) !== 'object')) {
              _context4.next = 16;
              break;
            }

            company[field] = value;
            _context4.next = 25;
            break;

          case 16:
            if (!(field !== 'requests')) {
              _context4.next = 21;
              break;
            }

            index = company[field].indexOf(value);
            index === -1 ? company[field].push(value) : company[field].pull(value);
            _context4.next = 25;
            break;

          case 21:
            if (!(_typeof(value) !== 'object')) {
              _context4.next = 23;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Field type and provided value type must match"
            }));

          case 23:
            subdoc = (0, _find3.default)(company.requests, {
              consultant: value.consultant,
              message: value.message
            });
            subdoc && subdoc._id ? company.requests.pull(subdoc._id) : company.requests.push(value);

          case 25:
            validationError = company.validateSync();

            if (!validationError) {
              _context4.next = 28;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 28:
            _context4.next = 30;
            return company.save();

          case 30:
            saved = _context4.sent;
            _context4.next = 33;
            return _Company.default.populate(saved, 'certificates');

          case 33:
            populated = _context4.sent;
            res.status(200).send({
              data: populated
            });

          case 35:
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
 * Method to approve or reject consultants request
 * Request body must be like:
 *  @param {boolean} approved Has consultants been request approved or not?
 *  @param {object}  request  Object of Request {consultant, message}
 */

router.patch('/company/list/:id/request', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, approved, request, company, _find2, _id, consultant, consultantObj, saved;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, approved = _req$body2.approved, request = _req$body2.request;

            if (!(!request || _typeof(request) !== 'object')) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Request must be an object type"
            }));

          case 3:
            _context5.next = 5;
            return _Company.default.findById(req.params.id);

          case 5:
            company = _context5.sent;

            if (company) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Company Not Found"
            }));

          case 8:
            _find2 = (0, _find3.default)(company.requests, {
              consultant: request.consultant,
              message: request.message
            }), _id = _find2._id, consultant = _find2.consultant;
            company.requests.pull(_id);

            if (!approved) {
              _context5.next = 17;
              break;
            }

            _context5.next = 13;
            return _Consultant.default.findOneAndUpdate({
              _id: consultant
            }, {
              $set: {
                company: company._id
              }
            }, {
              new: true
            });

          case 13:
            consultantObj = _context5.sent;

            if (!(consultantObj.company !== company._id)) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.status(500).send("Something went wrong while hiring consultant, ".concat(consultantObj)));

          case 16:
            company.consultants.push(consultant);

          case 17:
            _context5.next = 19;
            return company.save();

          case 19:
            saved = _context5.sent;
            return _context5.abrupt("return", res.status(200).send({
              data: saved
            }));

          case 21:
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
router.patch('/company/list/:id/importConfig', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var company, validationError, saved;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Company.default.findById(req.params.id);

          case 2:
            company = _context6.sent;

            if (company) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: "Company Not Found"
            }));

          case 5:
            company.importConfig = req.body.importConfig;
            validationError = company.importConfig.validateSync();

            if (!validationError) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 9:
            _context6.next = 11;
            return company.save();

          case 11:
            saved = _context6.sent;
            return _context6.abrupt("return", res.status(200).send({
              data: saved
            }));

          case 13:
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
router.delete('/company/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var company;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Company.default.findById(req.params.id);

          case 2:
            company = _context7.sent;

            if (company) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              error: "Company Not Found"
            }));

          case 5:
            _context7.next = 7;
            return company.remove();

          case 7:
            res.status(200).send({
              message: "Company deleted"
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
/**
 * Providing an opportunity to clear a collection for non-production environment
 */

process.env.NODE_ENV !== 'prod' && router.delete('/company/clear', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var companies;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Company.default.deleteMany();

          case 2:
            _context8.next = 4;
            return _Company.default.find();

          case 4:
            companies = _context8.sent;

            if (!companies.length) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(500).send({
              error: "Due to unknown reason companies weren't deleted"
            }));

          case 7:
            res.status(200).send({
              message: 'Companies were deleted'
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
module.exports = router;
//# sourceMappingURL=company.js.map