"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createGame: true,
  joinGame: true,
  getQuestionBank: true
};
exports.getQuestionBank = exports.joinGame = exports.createGame = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Room = _interopRequireWildcard(require("../models/Room"));

var Player = _interopRequireWildcard(require("../models/Player"));

var RandomQuestion = _interopRequireWildcard(require("../models/RandomQuestion"));

var _admin = require("./admin");

Object.keys(_admin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _admin[key];
    }
  });
});

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
            room.creatorId = viewer._id;
            _context.next = 10;
            return room.save();

          case 10:
            res = {
              room: room,
              viewer: viewer
            };
            return _context.abrupt("return", res);

          case 12:
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
    var room, _room, hostId, roomId, viewer, hostIsActive, res;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Room.findByNumber(roomNo);

          case 2:
            room = _context2.sent;

            if (room) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", false);

          case 5:
            _room = room, hostId = _room.hostId, roomId = _room._id;
            _context2.next = 8;
            return Player.create(roomId, playerName);

          case 8:
            viewer = _context2.sent;
            _context2.next = 11;
            return isHostActive(hostId);

          case 11:
            hostIsActive = _context2.sent;

            if (hostIsActive) {
              _context2.next = 16;
              break;
            }

            _context2.next = 15;
            return setNewHost(roomId);

          case 15:
            room = _context2.sent;

          case 16:
            res = {
              room: room,
              viewer: viewer
            };
            return _context2.abrupt("return", res);

          case 18:
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

var isHostActive =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(hostId) {
    var host, disconnected;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (hostId) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", false);

          case 2:
            _context3.next = 4;
            return Player.findById(hostId);

          case 4:
            host = _context3.sent;
            console.log('host', host);

            if (host) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", false);

          case 8:
            disconnected = host.disconnected;
            console.log('disconnected', disconnected);
            return _context3.abrupt("return", !disconnected);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isHostActive(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var setNewHost =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(roomId) {
    var newHostId, room;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Player.getNextRecipientId(roomId);

          case 2:
            newHostId = _context4.sent;
            console.log('newHostId', newHostId);
            _context4.next = 6;
            return Room.updateHost(roomId, newHostId);

          case 6:
            room = _context4.sent;
            console.log('room', room);
            return _context4.abrupt("return", room);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setNewHost(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var getQuestionBank = RandomQuestion.getAllowed;
exports.getQuestionBank = getQuestionBank;