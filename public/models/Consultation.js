"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _messages = _interopRequireDefault(require("../utils/validation/messages"));

var _range = require("../utils/validation/range");

var _Message = require("./submodels/Message");

var _Survey = require("./submodels/Survey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var ConsultationSchema = new _mongoose.Schema({
  customer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, _messages.default.required.customer]
  },
  consultant: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: [true, _messages.default.required.consultant],
    index: true
  },
  product: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, _messages.default.required.product]
  },
  alternative: {
    /* _id of an alternative product */
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    minlength: [_range.title.min, _messages.default.restrictions.title],
    maxlength: [_range.title.max, _messages.default.restrictions.title]
  },
  messages: [_Message.Message],
  survey: _Survey.Survey
});
ConsultationSchema.plugin(_mongooseTimestamp.default);
module.exports = _mongoose.default.model('Consultation', ConsultationSchema);
//# sourceMappingURL=Consultation.js.map