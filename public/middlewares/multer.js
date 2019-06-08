"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    return cb(null, 'uploads');
  },
  filename: function filename(req, file, cb) {
    return cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = (0, _multer.default)({
  storage: storage
});
var _default = upload;
exports.default = _default;
//# sourceMappingURL=multer.js.map