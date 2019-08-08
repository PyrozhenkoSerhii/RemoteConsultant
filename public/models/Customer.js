"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseBcrypt = _interopRequireDefault(require("mongoose-bcrypt"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _regex = _interopRequireDefault(require("../utils/validation/regex"));

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _defaults = require("../utils/validation/defaults");

var _range = require("../utils/validation/range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Remove comments field for now
 * Don't forget to change Patch request after its returning
 */
//import { Comment } from './submodels/Comment'
var UserSchema = new _mongoose.Schema({
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
    min: [_range.age.min, _messages.default.restrictions.age],
    max: [_range.age.max, _messages.default.restrictions.age]
  },
  gender: {
    type: String,
    enum: _defaults.gender.enum,
    default: _defaults.gender.default
  },
  image: {
    type: String,
    default: _defaults.images.customer,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  //comments: [Comment],
  verified: {
    type: Boolean,
    default: false
  }
});
UserSchema.plugin(_mongooseBcrypt.default);
UserSchema.plugin(_mongooseTimestamp.default);
module.exports = _mongoose.default.model('User', UserSchema);
//# sourceMappingURL=Customer.js.map