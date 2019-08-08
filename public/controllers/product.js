"use strict";

var _express = _interopRequireDefault(require("express"));

var _assignIn2 = _interopRequireDefault(require("lodash/assignIn"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _wrap = _interopRequireDefault(require("../middlewares/wrap"));

var _validators = require("../middlewares/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/product/list/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Product.default.find(req.query).populate('company');

          case 2:
            products = _context.sent;
            res.status(200).send({
              data: products
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
router.get('/product/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Product.default.findById(req.params.id).populate('company');

          case 2:
            product = _context2.sent;

            if (product) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              error: "Product Not Found"
            }));

          case 5:
            res.status(200).send({
              data: product
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
router.post('/product/', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var product, validationError, saved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            product = new _Product.default(_objectSpread({}, req.body));
            validationError = product.validateSync();

            if (!validationError) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 4:
            _context3.next = 6;
            return product.save();

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
router.put('/product/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var product, validationError, saved;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Product.default.findById(req.params.id);

          case 2:
            product = _context4.sent;

            if (product) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Product Not Found"
            }));

          case 5:
            (0, _assignIn2.default)(product, req.body);
            validationError = product.validateSync();

            if (!validationError) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 9:
            _context4.next = 11;
            return product.save();

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
 *  @param {string}  field Field you want to change
 *  @param {string|number|object}  value New value
 * Note: If you want to change a specification, provide an object like {attr1:val1, attr2:val2}
 *       If the attr and the value match the existent attr and val, this attr will be removed
 *       If the attr matches but its the value differs, the attr value will be changed
 *       Company field can't be changed
 */

router.patch('/product/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body, field, value, product, validationError, saved;

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
            return _Product.default.findById(req.params.id);

          case 5:
            product = _context5.sent;

            if (product) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Product Not Found"
            }));

          case 8:
            if (!(0, _isUndefined2.default)(product[field])) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Inexistent field provided: ".concat(field)
            }));

          case 10:
            if (!(filed === 'company')) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Company can't be changed"
            }));

          case 12:
            if (!(_typeof(product[field]) !== 'object')) {
              _context5.next = 16;
              break;
            }

            product[field] = value;
            _context5.next = 20;
            break;

          case 16:
            if (!(_typeof(value) !== 'object')) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: "Field type and provided value type must match"
            }));

          case 18:
            (0, _forEach2.default)(value, function (val, attr) {
              var currentValue = product.specification[attr];
              if (currentValue && currentValue === val) delete product.specification[attr];else if (currentValue && currentValue !== val) product.specification[attr] = val;else product.specification[attr] = val;
            });
            product.markModified('specification');

          case 20:
            validationError = product.validateSync();

            if (!validationError) {
              _context5.next = 23;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 23:
            _context5.next = 25;
            return product.save();

          case 25:
            saved = _context5.sent;
            res.status(200).send({
              data: saved
            });

          case 27:
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
/**
 * Method to import bunch of company's products
 * Requst body must be like:
 * @param {array} products An array with Product objects to import
 * Note: Each objtct in array must match Product Schema
 *       Only first object is going to be validated due to performance reasons, so be careful what you put here!
 *       All not required fields may be saved in 'specification' field like {{attr1: val1}, {attr2: val2}}
 */

router.post('/product/import', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var products, testProduct, validationError, saved;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            products = req.body.products;

            if (!(!products || products instanceof Array === false || _typeof(products[0]) !== 'object')) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: "Imported data must be an array with objects"
            }));

          case 3:
            testProduct = new _Product.default(_objectSpread({}, products[0]));
            validationError = testProduct.validateSync();

            if (!validationError) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(400).send({
              error: validationError.errors
            }));

          case 7:
            _context6.next = 9;
            return _Product.default.insertMany(products);

          case 9:
            saved = _context6.sent;
            res.status(200).send({
              data: saved
            });

          case 11:
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
router.delete('/product/list/:id', _validators.isObjectId, (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Product.default.findById(req.params.id);

          case 2:
            product = _context7.sent;

            if (product) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              error: "Product Not Found"
            }));

          case 5:
            _context7.next = 7;
            return product.remove();

          case 7:
            res.status(200).send({
              message: "Product was deleted"
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
router.post('/product/batchDelete', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var deleted;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if ((0, _isArray2.default)(req.body)) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt("return", res.status(400).send({
              error: "Body must be an array"
            }));

          case 2:
            _context8.next = 4;
            return _Product.default.deleteMany({
              _id: {
                $in: req.body
              }
            });

          case 4:
            deleted = _context8.sent;

            if (deleted.deletedCount === req.body.length) {
              res.status(200).send({
                message: "Products were deleted"
              });
            } else {
              res.status(500).send({
                message: "Something went wrong while deleting"
              });
            }

          case 6:
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

process.env.NODE_ENV !== 'production' && router.delete('/product/clear', (0, _wrap.default)(
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var products;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _Product.default.deleteMany();

          case 2:
            _context9.next = 4;
            return _Product.default.find();

          case 4:
            products = _context9.sent;

            if (!products.length) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", res.status(500).send({
              error: "Due to unknown reason products weren't deleted"
            }));

          case 7:
            res.status(200).send({
              message: 'Products were deleted'
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
module.exports = router;
//# sourceMappingURL=product.js.map