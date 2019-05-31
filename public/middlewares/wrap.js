"use strict";

module.exports = function (handler) {
  return function (req, res, next) {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
};
//# sourceMappingURL=wrap.js.map