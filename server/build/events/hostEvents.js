"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Room = _interopRequireWildcard(require("../models/Room"));

var Player = _interopRequireWildcard(require("../models/Player"));

var Question = _interopRequireWildcard(require("../models/Question"));

var hostEvents = function hostEvents(io, socket, common) {
  var newHost =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(roomId, playerId) {
      var room;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (playerId) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return Player.getNextRecipientId(roomId);

            case 3:
              playerId = _context.sent;

            case 4:
              _context.next = 6;
              return Room.updateHost(roomId, playerId);

            case 6:
              room = _context.sent;
              common.gameLog("New host - " + playerId);
              io.to(roomId).emit("newHost", room.hostId);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function newHost(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(); // Host: Update settings


  socket.on("updateSettings",
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(settings) {
      var timeLimit, roomId, room;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!socket.missingPlayer()) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              timeLimit = settings.timeLimit;
              roomId = socket.player.roomId;

              if (!(settings.timeLimit || settings.timeLimit === 0)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 7;
              return Room.updateTimeLimit(roomId, timeLimit);

            case 7:
              room = _context2.sent;
              common.gameLog("Updated question time limit - " + timeLimit);
              io.to(roomId).emit("newSettings", {
                room: room
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }()); // Host: Update settings

  socket.on("makeHost",
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(playerId) {
      var roomId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!socket.missingPlayer()) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              roomId = socket.player.roomId;
              newHost(roomId, playerId);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }()); // Host: Kick player

  socket.on("kickPlayer",
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(playerId) {
      var roomId, room, players;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!socket.missingPlayer()) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              _context4.next = 4;
              return Player.remove(playerId);

            case 4:
              roomId = socket.player.roomId;
              _context4.next = 7;
              return Room.findById(roomId);

            case 7:
              room = _context4.sent;

              if (!(room.status === "created")) {
                _context4.next = 12;
                break;
              }

              _context4.next = 11;
              return Question.removeByPlayerId(playerId);

            case 11:
              if (room.hostId === playerId) {
                newHost(roomId, null);
              }

            case 12:
              common.gameLog("Kicked: " + playerId); // Emit players

              _context4.next = 15;
              return Player.findByRoom(roomId);

            case 15:
              players = _context4.sent;
              common.gameLog("Update players - " + players.length);
              io.to(roomId).emit("updatePlayers", players);

              if (room.status === "created") {
                common.startIfAllReady(roomId);
              }

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }());
  Object.assign(common, {
    newHost: newHost
  });
};

var _default = hostEvents;
exports["default"] = _default;