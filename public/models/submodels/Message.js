"use strict";

var _mongoose = require("mongoose");

var _messages = _interopRequireDefault(require("../../utils/validation/messages"));

var _range = require("../../utils/validation/range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Message = new _mongoose.Schema({
  sender: {
    type: String,
    required: [true, _messages.default.required.sender]
  },
  receiver: {
    type: String,
    required: [true, _messages.default.required.receiver]
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
//# sourceMappingURL=Message.js.map