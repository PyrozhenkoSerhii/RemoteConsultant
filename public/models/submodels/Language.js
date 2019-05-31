"use strict";

var _mongoose = require("mongoose");

var _messages = _interopRequireDefault(require("../../utils/validation/messages"));

var _defaults = require("../../utils/validation/defaults");

var _range = require("../../utils/validation/range");

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LanguageSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, _messages.default.required.title],
    minLength: [_range.title.min, _messages.default.restrictions.title],
    maxlength: [_range.title.max, _messages.default.restrictions.title]
  },
  level: {
    type: String,
    required: [true, _messages.default.required.level],
    enum: _defaults.language.enum
  }
});
LanguageSchema.plugin(_mongooseTimestamp.default);
exports.Language = LanguageSchema;
//# sourceMappingURL=Language.js.map