"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _range = require("../utils/validation/range");

var _calculator = require("../utils/contribution/calculator");

var _Consultant = _interopRequireDefault(require("./Consultant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var OrderSchema = new _mongoose.Schema({
  customer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, _messages.default.required.customer],
    index: true
  },
  product: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, _messages.default.required.product]
  },
  quantity: {
    type: Number,
    required: [true, _messages.default.required.quantity],
    min: [_range.quantity.min, _messages.default.restrictions.quantity],
    max: [_range.quantity.max, _messages.default.restrictions.quantity]
  },
  sum: {
    type: Number,
    required: [true, _messages.default.required.sum],
    min: [_range.sum.min, _messages.default.restrictions.sum],
    max: [_range.sum.max, _messages.default.restrictions.sum]
  },
  consultant: {
    /* _id of the most useful consultant */
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: [true, _messages.default.required.consultant]
  }
});
OrderSchema.plugin(_mongooseTimestamp.default);
OrderSchema.post('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(order) {
    var coefficients, sums;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _calculator.calculate)(order);

          case 2:
            coefficients = _context.sent;
            sums = (0, _calculator.getValue)(order.sum, coefficients);
            (0, _forEach2.default)(sums, function (sum, consultant) {
              _Consultant.default.findOneAndUpdate({
                username: consultant
              }, {
                $inc: {
                  bill: sum
                }
              });
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = _mongoose.default.model('Order', OrderSchema);
//# sourceMappingURL=Order.js.map