"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseBcrypt = _interopRequireDefault(require("mongoose-bcrypt"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _pull2 = _interopRequireDefault(require("lodash/pull"));

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _defaults = _interopRequireDefault(require("../utils/validation/defaults"));

var _regex = _interopRequireDefault(require("../utils/validation/regex"));

var _range = require("../utils/validation/range");

var _logger = _interopRequireDefault(require("../utils/logger"));

var _Language = require("./submodels/Language");

var _Company = _interopRequireDefault(require("./Company"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var ConsultantSchema = new _mongoose.Schema({
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
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, _messages.default.required.username],
    minlength: [_range.username.min, _messages.default.restrictions.username],
    maxlength: [_range.username.max, _messages.default.restrictions.username]
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
  age: {
    type: Number,
    min: [_range.matureAge.min, _messages.default.restrictions.matureAge],
    max: [_range.matureAge.max, _messages.default.restrictions.matureAge]
  },
  gender: {
    type: String,
    enum: _defaults.default.gender.enum,
    default: _defaults.default.gender.default
  },
  rating: {
    type: Number,
    min: [_range.rating.min, _messages.default.restrictions.rating],
    max: [_range.rating.max, _messages.default.restrictions.rating],
    default: _defaults.default.rating
  },
  bill: {
    type: Number,
    default: _defaults.default.bill
  },
  phone: {
    type: Number,
    match: [_regex.default.phone, _messages.default.match.phone]
  },
  info: {
    type: String,
    trim: true,
    maxlength: [_range.info.max, _messages.default.restrictions.info]
  },
  image: {
    type: String,
    default: _defaults.default.images.customer,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  certificate: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  },
  languages: [_Language.Language],
  company: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    trim: true
  },
  online: {
    type: Boolean,
    default: false
  },
  chat: {
    id: String,
    allowAudio: {
      type: Boolean,
      default: true
    },
    allowVideo: {
      type: Boolean,
      default: true
    }
  },
  verified: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});
ConsultantSchema.plugin(_mongooseBcrypt.default);
ConsultantSchema.plugin(_mongooseTimestamp.default);
ConsultantSchema.pre('remove', function (next) {
  _Company.default.findById(_this.company, function (err, company) {
    if (err) _logger.default.error("Something went wrong while fetching company. \n Method: consultant remove, cascade remove");
    if (!company) _logger.default.error("Company with title ".concat(_this.company, " wasn't found. \n Method: consultant remove, cascade remove"));
    company.consultants.pull(_this._id);
    company.save(function (err, saved) {
      if (err) _logger.default.error("Something went wrong while updating company with title ".concat(_this.company, " \n Method: consultant remove, cascade remove"));
      if (saved) _logger.default.log("Company updated \n Method: consultant remove, cascade remove");
      return next();
    });
  });
});
module.exports = _mongoose.default.model('Consultant', ConsultantSchema);
//# sourceMappingURL=Consultant.js.map