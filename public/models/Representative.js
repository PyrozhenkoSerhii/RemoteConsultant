"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseBcrypt = _interopRequireDefault(require("mongoose-bcrypt"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _defaults = require("../utils/validation/defaults");

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _regex = _interopRequireDefault(require("../utils/validation/regex"));

var _range = require("../utils/validation/range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var RepresentativeSchema = new _mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: [true, _messages.default.required.email],
    match: [_regex.default.email, _messages.default.match.email],
    minLength: [_range.email.min, _messages.default.restrictions.email],
    maxlength: [_range.email.max, _messages.default.restrictions.email]
  },
  fullname: {
    type: String,
    trim: true,
    required: [true, _messages.default.required.fullname],
    match: [_regex.default.fullname, _messages.default.match.fullname],
    minlength: [_range.fullname.min, _messages.default.restrictions.fullname],
    maxlength: [_range.fullname.max, _messages.default.restrictions.fullname]
  },
  password: {
    type: String,
    select: false,
    bcrypt: true,
    required: [true, _messages.default.required.password],
    match: [_regex.default.password, _messages.default.match.password],
    minlength: [_range.password.min, _messages.default.restrictions.password],
    maxlength: [_range.password.max, _messages.default.restrictions.password]
  },
  phone: {
    type: Number,
    required: [true, _messages.default.required.phone],
    match: [_regex.default.phone, _messages.default.match.phone]
  },
  image: {
    type: String,
    default: _defaults.images.representative,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  company: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, _messages.default.required.company]
  }
});
RepresentativeSchema.plugin(_mongooseBcrypt.default);
RepresentativeSchema.plugin(_mongooseTimestamp.default);
RepresentativeSchema.post('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(doc, next) {
    var company, saved;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose.default.model('Company').findById(doc.company);

          case 2:
            company = _context.sent;
            company.representatives.push(this._id);
            _context.next = 6;
            return company.save();

          case 6:
            saved = _context.sent;
            next();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = _mongoose.default.model('Representative', RepresentativeSchema);
//# sourceMappingURL=Representative.js.map