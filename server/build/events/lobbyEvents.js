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

var trim = function trim(questions) {
  return questions.filter(function (question) {
    return question.text && (question.type === "players" || question.type === "open" || question.options.filter(Boolean).length > 1);
  });
};

var lobbyEvents = function lobbyEvents(io, socket, common) {
  // Lobby: Start if all players are ready
  var startIfAllReady =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(roomId) {
      var ready, currentQuestion, room;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Room.isEveryPlayerReady(roomId);

            case 2:
              ready = _context.sent;

              if (ready) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", false);

            case 5:
              _context.next = 7;
              return Question.draw(roomId, 1, null);

            case 7:
              currentQuestion = _context.sent;
              _context.next = 10;
              return Room.start(roomId);

            case 10:
              room = _context.sent;
              common.gameLog("Game start");
              io.to(roomId).emit("start", {
                room: room,
                currentQuestion: currentQuestion
              });

              if (currentQuestion) {
                common.startTimer(currentQuestion);
              } else {
                common.gameOver(roomId);
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function startIfAllReady(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // Lobby: Player ready


  socket.on("ready",
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(questions) {
      var trimmedQuestions, _ref3, playerId, roomId, room;

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
              trimmedQuestions = trim(questions);

              if (!(trimmedQuestions.length > 0)) {
                _context2.next = 6;
                break;
              }

              _context2.next = 6;
              return Question.createMany(trimmedQuestions, socket.player._id, socket.player.roomId);

            case 6:
              _context2.next = 8;
              return Player.ready(socket.player._id);

            case 8:
              _ref3 = _context2.sent;
              playerId = _ref3._id;
              roomId = _ref3.roomId;
              common.playerLog("is ready - " + trimmedQuestions.length + " questions added");
              common.gameLog("Update player ready");
              io.to(roomId).emit("playerReady", playerId);
              _context2.next = 16;
              return Room.findById(roomId);

            case 16:
              room = _context2.sent;

              if (room.status === "created") {
                startIfAllReady(roomId);
              }

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()); // Lobby: Player not ready

  socket.on("notReady",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var _ref5, playerId, roomId, room;

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
            _context3.next = 4;
            return Question.removeByPlayerId(socket.player._id);

          case 4:
            _context3.next = 6;
            return Player.notReady(socket.player._id);

          case 6:
            _ref5 = _context3.sent;
            playerId = _ref5._id;
            roomId = _ref5.roomId;
            common.playerLog("is not ready");
            common.gameLog("Update player not ready");
            io.to(roomId).emit("playerNotReady", playerId);
            _context3.next = 14;
            return Room.findById(roomId);

          case 14:
            room = _context3.sent;

            if (room.status === "created") {
              startIfAllReady(roomId);
            }

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  Object.assign(common, {
    startIfAllReady: startIfAllReady
  });
};

var _default = lobbyEvents;
exports["default"] = _default;