"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _defaults = require("../utils/validation/defaults");

var _range = require("../utils/validation/range");

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _regex = _interopRequireDefault(require("../utils/validation/regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var ProductSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, _messages.default.required.title],
    minlength: [_range.title.min, _messages.default.restrictions.title],
    maxlength: [_range.title.max, _messages.default.restrictions.title]
  },
  company: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, _messages.default.required.company]
  },
  category: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, _messages.default.required.category]
  },
  price: {
    type: Number,
    required: [true, _messages.default.required.price],
    min: [_range.price.min, _messages.default.restrictions.price],
    max: [_range.price.max, _messages.default.restrictions.price]
  },
  quantity: {
    type: Number,
    required: [true, _messages.default.required.quantity],
    min: [_range.quantity.min, _messages.default.restrictions.quantity],
    max: [_range.quantity.max, _messages.default.restrictions.quantity]
  },
  image: {
    type: String,
    default: _defaults.images.product,
    match: [_regex.default.url, _messages.default.match.url],
    minlength: [_range.url.min, _messages.default.restrictions.url],
    maxlength: [_range.url.max, _messages.default.restrictions.url]
  },
  description: {
    type: String,
    minlength: [_range.description.min, _messages.default.restrictions.description],
    maxlength: [_range.description.max, _messages.default.restrictions.description]
  },
  specification: {
    type: Object,
    default: {}
  }
}, {
  minimize: false
});
ProductSchema.plugin(_mongooseTimestamp.default);
module.exports = _mongoose.default.model('Product', ProductSchema);
//# sourceMappingURL=Product.js.map