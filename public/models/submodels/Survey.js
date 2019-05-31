"use strict";

var _mongoose = require("mongoose");

var _messages = _interopRequireDefault(require("../../utils/validation/messages"));

var _range = require("../../utils/validation/range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SurveySchema = new _mongoose.Schema({
  competence: {
    type: Number,
    required: [true, _messages.default.required.competence],
    min: [_range.competence.min, _messages.default.restrictions.competence],
    max: [_range.competence.max, _messages.default.restrictions.competence]
  },
  friendliness: {
    type: Number,
    required: [true, _messages.default.required.friendliness],
    min: [_range.friendliness.min, _messages.default.restrictions.friendliness],
    max: [_range.friendliness.max, _messages.default.restrictions.friendliness]
  },
  note: {
    type: String,
    trim: true,
    maxlength: [_range.note.max, _messages.default.restrictions.note]
  }
});
SurveySchema.set('validateBeforeSave', false);
exports.Survey = SurveySchema;
//# sourceMappingURL=Survey.js.map