"use strict";

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _Consultant = _interopRequireDefault(require("../../models/Consultant"));

var _Consultation = _interopRequireDefault(require("../../models/Consultation"));

var _Order = _interopRequireDefault(require("../../models/Order"));

var _logger = _interopRequireDefault(require("../logger"));

var _range = _interopRequireDefault(require("../validation/range"));

var _coefficients = _interopRequireDefault(require("./coefficients"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Function is called after an order was submitted
 * It returns a consultants contributions (in percentage)
 */
exports.calculate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(order) {
    var result, engagedConsultants, total, consultantEarned, totalEarned;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {};
            _context.next = 3;
            return fetchData(order);

          case 3:
            engagedConsultants = _context.sent;
            total = {
              consultations: 0,
              sales: 0
            };
            (0, _forEach2.default)(engagedConsultants, function (consultant) {
              total.consultations += consultant.consultationsCount;
              total.sales += consultant.salesCount;
            });
            consultantEarned = {};
            totalEarned = 0;
            (0, _forEach2.default)(engagedConsultants, function (consultant) {
              var points = 0;
              if (consultant.isBest) points += _coefficients.default.isBest.max;
              /* if best consultant*/

              if (consultant.isIdeator) points += _coefficients.default.isIdeator.max;
              /* if suggested product */

              points += scale(consultant.rating, _range.default.rating.min, _range.default.rating.max, _coefficients.default.rating.min, _coefficients.default.rating.max);
              /* rating */

              points += scale(consultant.competence, _range.default.competence.min, _range.default.competence.max, _coefficients.default.competence.min, _coefficients.default.competence.max);
              /* competence */

              points += scale(consultant.friendliness, _range.default.friendliness.min, _range.default.friendliness.max, _coefficients.default.friendliness.min, _coefficients.default.friendliness.max);
              /* friendliness*/

              points += scale(consultant.consultationsCount, 0, total.consultations, _coefficients.default.consultantions.min, _coefficients.default.consultantions.max);
              /*  consultations ratio */

              points += scale(consultant.salesCount, 0, total.sales, _coefficients.default.sales.min, _coefficients.default.sales.max);
              /* sales ratio */

              consultantEarned[consultant.username] = points;
              totalEarned += points;
            });
            (0, _map2.default)(engagedConsultants, function (consultant) {
              result[consultant.username] = Math.floor(consultantEarned[consultant.username] / totalEarned * 100);
            });

            _logger.default.log("Consultants contribution after saling of '".concat(order.product, "' for user '").concat(order.customer, "': \n ").concat(JSON.stringify(result)));

            return _context.abrupt("return", result);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Function to prepare a data to contribution calculation
 * It returns an array of consultants with all the data required for calculation
 */


var fetchData =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(order) {
    var productTitle, customerUsername, bestUsername, relevantConsultationsPromise, ordersPromise, relevantConsultations, engagedConsultants, tempConsulultantsName, ideatorUsername, consultantsStatisticPromise, consultationsCountPromise, orders, consultantConsultations, salesCount, consultantsStatistic, consultationsCount;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productTitle = order.product, customerUsername = order.customer, bestUsername = order.consultant;
            relevantConsultationsPromise = _Consultation.default.find({
              customer: customerUsername,
              product: productTitle
            });
            ordersPromise = _Order.default.find({});
            _context2.next = 5;
            return relevantConsultationsPromise;

          case 5:
            relevantConsultations = _context2.sent;

            /**
             * get consultants who provided a consultation to customer
             * if the ordered product inside 'alternative' field it means that this consultant suggested to buy it 
             */
            engagedConsultants = [];
            tempConsulultantsName = [];
            ideatorUsername = '';
            (0, _forEach2.default)(relevantConsultations, function (item) {
              engagedConsultants.push(_objectSpread({
                username: item.consultant
              }, item.survey));
              tempConsulultantsName.push(item.consultant);
              if (item.alternative === productTitle) ideatorUsername = (_readOnlyError("ideatorUsername"), item.username);
            });
            /**
             * get all required info about envolved consultants
             */

            consultantsStatisticPromise = _Consultant.default.find({
              username: {
                $in: tempConsulultantsName
              }
            }).select({
              "id": 0,
              "username": 1,
              "rating": 1
            });
            consultationsCountPromise = _Consultation.default.aggregate([{
              $match: {
                consultant: {
                  $in: tempConsulultantsName
                }
              }
            }, {
              $group: {
                username: '$consultant',
                count: {
                  $sum: 1
                }
              }
            }]);
            _context2.next = 14;
            return ordersPromise;

          case 14:
            orders = _context2.sent;
            _context2.next = 17;
            return _Consultation.default.find({
              consultant: {
                $in: tempConsulultantsName
              }
            }).select({
              "id": 0,
              "customer": 1,
              "product": 1,
              "consultant": 1
            });

          case 17:
            consultantConsultations = _context2.sent;
            salesCount = {};
            (0, _forEach2.default)(orders, function (order) {
              (0, _forEach2.default)(consultantConsultations, function (consultation) {
                if (order.customer === consultation.customer && order.product === consultation.product) salesCount[order.consultant] = (0, _isUndefined2.default)(salesCount[order.consultant]) ? 1 : ++salesCount[order.consultant];
              });
            });
            _context2.next = 22;
            return consultantsStatisticPromise;

          case 22:
            consultantsStatistic = _context2.sent;
            _context2.next = 25;
            return consultationsCountPromise;

          case 25:
            consultationsCount = _context2.sent;

            /**
             * merge consultant statistic and assessment from customer
             * check if consultant suggested an alternative product which was bought
             * check if consultant was selected as one who convinced customer to buy a product 
             * result object fields: {username, rating, competence, friendliness, note, consultationsCount, salesCount, isbest, isideator}
             *  */
            (0, _map2.default)(engagedConsultants, function (item) {
              (0, _assign2.default)(item, (0, _find2.default)(consultantsStatistic, {
                username: item.username
              }));
              item['consultationsCount'] = consultationsCount[item.username].count;
              item['salesCount'] = salesCount[item.username];
              item['isBest'] = item.username === bestUsername;
              item['isIdeator'] = item.username === ideatorUsername;
              return item;
            });
            return _context2.abrupt("return", engagedConsultants);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function fetchData(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Function to transform input value to defined range
 * @param {number} value The value to transform
 * @param {number} inMin Min input value
 * @param {number} inMax Max input value
 * @param {number} outMin Lower bound of output range
 * @param {number} outMax Upper bound of output range
 */


var scale = function scale(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};
//# sourceMappingURL=calculator.js.map