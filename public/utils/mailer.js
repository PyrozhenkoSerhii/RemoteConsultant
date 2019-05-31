"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _logger = _interopRequireDefault(require("./logger"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createTestTransport = function (result) {
  return _nodemailer.default.createTestAccount(function (err, account) {
    if (err) _logger.default.error("[Node mailer] Error occured while creating account");

    _logger.default.info('[Node mailer] Mailer account was created successfully!');

    var transport = _nodemailer.default.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    }, {
      from: 'Serhii <Pirogenkoss85@gmail.com>',
      headers: {
        'X-Laziness-level': 1000
      }
    });

    _logger.default.info("[Node mailer] Transport (for test only) was created successfully with following user ".concat(account.user, "!"));

    result(transport);
  });
};

exports.createGmailTransport = function (result) {
  var transport = _nodemailer.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    socketTimeout: 5000,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  }, {
    from: 'Serhii Pyrozhenko <Pirogenkoss85@gmail.com>',
    headers: {
      'X-Laziness-level': 1000
    }
  });

  _logger.default.info("[Node mailer] Gmail transport was created successfully with following user: ".concat(process.env.MAIL_USER, "!"));

  result(transport);
};

exports.verificationMessage = function (user) {
  return {
    to: user.email,
    subject: 'Email verification',
    text: "Hello, ".concat(user.username, "! If it isn't you, just ignore the message. Otherwise, please, ") + "verify your email by following link ".concat(_config.default.urls.emailVerifyingBase).concat(user._id, "!")
  };
};

exports.passwordResetMessage = function (user, hash) {
  return {
    to: user.email,
    subject: 'Password reset',
    text: "Hello, ".concat(user.username, "! You've just sent a request to restore your password,") + "if it isn't you, just ignore the message. Otherwise, please, use following link ".concat(_config.default.urls.passwordResetBase).concat(hash, "!")
  };
};
//# sourceMappingURL=mailer.js.map