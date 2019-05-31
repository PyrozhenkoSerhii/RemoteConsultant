"use strict";

var _mongoose = require("mongoose");

var _messages = _interopRequireDefault(require("../../utils/validation/messages"));

var _regex = _interopRequireDefault(require("../../utils/validation/regex"));

var _range = require("../../utils/validation/range");

var _defaults = _interopRequireDefault(require("../../utils/validation/defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ImportConfig = new _mongoose.Schema({
  mode: {
    type: String
    /* TODO: fix error with enum */
    // enum: [defaults.mode.enum],
    // default: [defaults.mode.default]

  },
  url: {
    type: String
    /* removed for testing*/
    // match: [regex.url, messages.match.url],
    // minlength: [url.min, messages.restrictions.url],
    // maxlength: [url.max, messages.restrictions.url]

  },
  interval: Number,
  patterns: [{
    connections: Object,
    fieldsPathMap: Object,
    startPath: String,
    author: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Representative'
    },
    title: {
      type: String,
      trim: true,
      minlength: [_range.title.min, _messages.default.restrictions.title],
      maxlength: [_range.title.max, _messages.default.restrictions.title]
    }
  }]
});
//# sourceMappingURL=ImportConfig.js.map