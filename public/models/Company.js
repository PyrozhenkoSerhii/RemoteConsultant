"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _regex = _interopRequireDefault(require("../utils/validation/regex"));

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _defaults = require("../utils/validation/defaults");

var _range = require("../utils/validation/range");

var _logger = _interopRequireDefault(require("../utils/logger"));

var _Request = require("./submodels/Request");

var _ImportConfig = require("./submodels/ImportConfig");

var _Representative = _interopRequireDefault(require("./Representative"));

var _Product = _interopRequireDefault(require("./Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var CompanySchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, _messages.default.required.title],
    index: true,
    unique: true,
    minlength: [_range.title.min, _messages.default.restrictions.title],
    maxlength: [_range.title.max, _messages.default.restrictions.title]
  },
  website: {
    type: String,
    required: [true, _messages.default.required.website],
    trim: true,
    unique: true,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  secret: {
    type: String,
    required: [true, _messages.default.required.secret],
    trim: true,
    select: false,
    match: [_regex.default.secret, _messages.default.match.secret],
    minlength: [_range.secret.min, _messages.default.restrictions.secret],
    maxlength: [_range.secret.max, _messages.default.restrictions.secret]
  },
  info: {
    type: String,
    trim: true,
    maxlength: [_range.info.max, _messages.default.restrictions.info]
  },
  image: {
    type: String,
    default: _defaults.images.company,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  importConfig: _ImportConfig.ImportConfig,
  requests: [_Request.Request],
  certificates: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  representatives: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Consultant'
  }],
  consultants: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Consultant'
  }],
  products: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});
CompanySchema.plugin(_mongooseTimestamp.default);
CompanySchema.pre('remove', function (next) {
  var _this = this;

  /* Note: these functions don't trigger post/pre hooks */
  _Product.default.deleteMany({
    company: this._id
  }, function (err) {
    if (err) _logger.default.error("Something went wrong while deleting products of company ".concat(_this.title, ". Method: company remove, cascade delete"));else _logger.default.log("Products of company ".concat(_this.title, " were deleted. Method: company remove, cascade delete"));
  });

  _Representative.default.deleteMany({
    company: this._id
  }, function (err) {
    if (err) _logger.default.error("Something went wrong while deleting representatives of company ".concat(_this.title, ". Method: company remove, cascade delete"));else _logger.default.log("Representatives of company ".concat(_this.title, " were deleted. Method: company remove, cascade delete"));
  });

  next();
});
module.exports = _mongoose.default.model('Company', CompanySchema);
//# sourceMappingURL=Company.js.map