"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRoloesExisted = exports.checkDuplicateUserorEmail = void 0;

var _Role = require("../models/Role");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkDuplicateUserorEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var users, emails;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findOne({
              username: req.body.username
            });

          case 2:
            users = _context.sent;

            if (!users) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'the user already exists'
            }));

          case 5:
            _context.next = 7;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 7:
            emails = _context.sent;

            if (!emails) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'the email already exists'
            }));

          case 10:
            next();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkDuplicateUserorEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkDuplicateUserorEmail = checkDuplicateUserorEmail;

var checkRoloesExisted = function checkRoloesExisted(req, res, next) {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: 'Role ${req.body.roles[i]} does not exists'
        });
      }
    }
  }

  next();
};

exports.checkRoloesExisted = checkRoloesExisted;