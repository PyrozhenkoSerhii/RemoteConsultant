"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;

function parser(query) {
  var params = new URLSearchParams(query);
  params.forEach(function (element) {
    console.log(element);
  });
}
//# sourceMappingURL=parser.js.map