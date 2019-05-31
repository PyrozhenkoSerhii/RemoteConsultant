"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _regex = _interopRequireDefault(require("../utils/validation/regex"));

var _range = require("../utils/validation/range");

var _defaults = require("../utils/validation/defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var CertificateSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, _messages.default.required.title],
    minlength: [_range.title.min, _messages.default.restrictions.title],
    maxlength: [_range.title.max, _messages.default.restrictions.title]
  },
  type: {
    type: String,
    trim: true,
    lowercase: true,
    index: true,
    required: [true, _messages.default.required.type],
    minlength: [_range.type.min, _messages.default.restrictions.type],
    maxlength: [_range.type.max, _messages.default.restrictions.type]
  },
  image: {
    type: String,
    default: _defaults.images.certificate,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  note: {
    type: String,
    trim: true,
    maxlength: [_range.note.max, _messages.default.required.note]
  }
});
CertificateSchema.plugin(_mongooseTimestamp.default);
module.exports = _mongoose.default.model('Certificate', CertificateSchema);
//# sourceMappingURL=Certificate.js.map