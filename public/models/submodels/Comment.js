"use strict";

var _mongoose = require("mongoose");

var _messages = _interopRequireDefault(require("../../utils/validation/messages"));

var _range = require("../../utils/validation/range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Comment = new _mongoose.Schema({
  product: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, _messages.default.required.product]
  },
  message: {
    type: String,
    trim: true,
    required: [true, _messages.default.required.message],
    minlength: [_range.message.min, _messages.default.restrictions.message],
    maxlength: [_range.message.max, _messages.default.restrictions.message]
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
//# sourceMappingURL=Comment.js.map