"use strict";

var _mongoose = require("mongoose");

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _messages = _interopRequireDefault(require("../../utils/validation/messages"));

var _range = require("../../utils/validation/range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestSchema = new _mongoose.Schema({
  consultant: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: [true, _messages.default.required.consultant]
  },
  message: {
    type: String,
    trim: true,
    maxlength: [_range.message.max, _messages.default.restrictions.message]
  }
});
RequestSchema.plugin(_mongooseTimestamp.default);
exports.Request = RequestSchema;
//# sourceMappingURL=Request.js.map