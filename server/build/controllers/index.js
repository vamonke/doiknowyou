"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuestionBank = exports.populateQuestionBank = exports.joinGame = exports.createGame = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Room = _interopRequireWildcard(require("../models/Room"));

var Player = _interopRequireWildcard(require("../models/Player"));

var RandomQuestion = _interopRequireWildcard(require("../models/RandomQuestion"));

var createGame =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(playerName) {
    var room, viewer, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Room.create();

          case 2:
            room = _context.sent;
            _context.next = 5;
            return Player.create(room._id, playerName);

          case 5:
            viewer = _context.sent;
            room.hostId = viewer._id;
            _context.next = 9;
            return room.save();

          case 9:
            res = {
              room: room,
              viewer: viewer
            };
            return _context.abrupt("return", res);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createGame(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createGame = createGame;

var joinGame =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(playerName, roomNo) {
    var room, viewer, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Room.findByNumber(roomNo);

          case 2:
            room = _context2.sent;

            if (!room) {
              _context2.next = 13;
              break;
            }

            _context2.next = 6;
            return Player.create(room._id, playerName);

          case 6:
            viewer = _context2.sent;

            if (room.hostId) {
              _context2.next = 11;
              break;
            }

            room.hostId = viewer._id;
            _context2.next = 11;
            return room.save();

          case 11:
            res = {
              room: room,
              viewer: viewer
            };
            return _context2.abrupt("return", res);

          case 13:
            return _context2.abrupt("return", false);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function joinGame(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.joinGame = joinGame;
var populateQuestionBank = RandomQuestion.populate;
exports.populateQuestionBank = populateQuestionBank;
var getQuestionBank = RandomQuestion.getAll;
exports.getQuestionBank = getQuestionBank;