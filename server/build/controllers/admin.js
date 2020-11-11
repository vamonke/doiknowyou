"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuestionBankAll = exports.populateQuestionBank = exports.toggleQuestion = exports.getRooms = exports.getRoom = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Room = _interopRequireWildcard(require("../models/Room"));

var Player = _interopRequireWildcard(require("../models/Player"));

var Question = _interopRequireWildcard(require("../models/Question"));

var RandomQuestion = _interopRequireWildcard(require("../models/RandomQuestion"));

var getRoom =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(roomId) {
    var room, players, questions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Room.findById(roomId);

          case 2:
            room = _context.sent;
            _context.next = 5;
            return Player.findByRoom(roomId);

          case 5:
            players = _context.sent;
            _context.next = 8;
            return Question.findbyRoomId(roomId);

          case 8:
            questions = _context.sent;
            // const hostId = room.hostId;
            // const host = players.find(player => player._id.toString() == hostId);
            // if (host) room.hostId = host;
            room.players = players;
            room.questions = questions;
            return _context.abrupt("return", room);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getRoom(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getRoom = getRoom;
var getRooms = Room.getAll;
exports.getRooms = getRooms;
var toggleQuestion = RandomQuestion.toggleDisabled;
exports.toggleQuestion = toggleQuestion;
var populateQuestionBank = RandomQuestion.populate;
exports.populateQuestionBank = populateQuestionBank;
var getQuestionBankAll = RandomQuestion.getAll;
exports.getQuestionBankAll = getQuestionBankAll;