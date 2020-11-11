"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Room = _interopRequireWildcard(require("../models/Room"));

var Player = _interopRequireWildcard(require("../models/Player"));

var Question = _interopRequireWildcard(require("../models/Question"));

var Answer = _interopRequireWildcard(require("../models/Answer"));

var _logger = require("../logger");

var connectionEvents = function connectionEvents(io, socket, common) {
  var emitPlayers =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(roomId) {
      var room;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Player.findByRoom(roomId);

            case 2:
              common.players = _context.sent;
              common.gameLog("Update player list - " + common.players.length + " players");
              io.to(roomId).emit("updatePlayers", common.players);
              _context.next = 7;
              return Room.findById(roomId);

            case 7:
              room = _context.sent;
              common.gameLog("Emit host - " + room.hostId);
              io.to(roomId).emit("newHost", room.hostId);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function emitPlayers(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var hydrateRoom =
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(roomId) {
      var room;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Room.findById(roomId);

            case 2:
              room = _context2.sent;
              common.playerLog("room hydrated");
              socket.emit("hydrateRoom", room);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function hydrateRoom(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var hydrateAnswers =
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(roomId) {
      var currentQuestion, answers, answeredPlayers;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Question.getCurrentQuestionInRoom(roomId);

            case 2:
              currentQuestion = _context3.sent;

              if (currentQuestion) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return");

            case 5:
              _context3.next = 7;
              return Answer.findByQuestion(currentQuestion._id);

            case 7:
              answers = _context3.sent;
              answeredPlayers = answers.map(function (answer) {
                return answer.playerId;
              });
              if (currentQuestion.correctAnswer) answeredPlayers.push(currentQuestion.recipientId);
              common.playerLog("answered hydrated - " + answeredPlayers.length);
              socket.emit("hydrateAnswers", answeredPlayers);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function hydrateAnswers(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var hydrateQuestions =
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(roomId) {
      var promises, _ref5, _ref6, currentQuestion, answeredQuestions;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              promises = [Question.getCurrentQuestionInRoomFull(roomId), Question.findAsked(roomId)];
              _context4.next = 3;
              return Promise.all(promises);

            case 3:
              _ref5 = _context4.sent;
              _ref6 = (0, _slicedToArray2["default"])(_ref5, 2);
              currentQuestion = _ref6[0];
              answeredQuestions = _ref6[1];
              common.playerLog("questions hydrated");
              socket.emit("hydrateQuestions", {
                currentQuestion: currentQuestion,
                answeredQuestions: answeredQuestions
              });

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function hydrateQuestions(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var leaveRoom =
  /*#__PURE__*/
  function () {
    var _ref7 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var _socket$player, _id, roomId, room, currentQuestion;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (socket.player) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              _socket$player = socket.player, _id = _socket$player._id, roomId = _socket$player.roomId;
              _context5.next = 5;
              return Room.findById(roomId);

            case 5:
              room = _context5.sent;

              if (!(room.status === "ended")) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return");

            case 8:
              _context5.next = 10;
              return Player.remove(_id);

            case 10:
              if (!(room.status === "created")) {
                _context5.next = 14;
                break;
              }

              _context5.next = 13;
              return Question.removeByPlayerId(_id);

            case 13:
              if (room.hostId === _id) {
                common.newHost(roomId, null);
              }

            case 14:
              common.playerLog("left the room");
              delete socket.player;
              emitPlayers(roomId);

              if (!(room.status === "created")) {
                _context5.next = 21;
                break;
              }

              common.startIfAllReady(roomId);
              _context5.next = 26;
              break;

            case 21:
              if (!(room.status === "started")) {
                _context5.next = 26;
                break;
              }

              _context5.next = 24;
              return Question.getCurrentQuestionInRoom(roomId);

            case 24:
              currentQuestion = _context5.sent;
              common.completeIfAllAnswered(currentQuestion);

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function leaveRoom() {
      return _ref7.apply(this, arguments);
    };
  }();

  var disconnect =
  /*#__PURE__*/
  function () {
    var _ref8 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var _socket$player2, _id, roomId, room;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (socket.player) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              _socket$player2 = socket.player, _id = _socket$player2._id, roomId = _socket$player2.roomId;
              _context6.next = 5;
              return Room.findById(roomId);

            case 5:
              room = _context6.sent;

              if (!(room.status === "ended")) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return");

            case 8:
              _context6.next = 10;
              return Player.disconnect(_id);

            case 10:
              common.playerLog("disconnected");
              emitPlayers(roomId);

              if (room.status === "created") {
                // await Question.removeByPlayerId(_id);
                if (room.hostId === _id) {
                  common.newHost(roomId, null);
                }
              }

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function disconnect() {
      return _ref8.apply(this, arguments);
    };
  }();

  var hydrate =
  /*#__PURE__*/
  function () {
    var _ref9 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(roomId) {
      var room;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              common.playerLog("joined");
              hydrateRoom(roomId);
              emitPlayers(roomId);
              _context7.next = 5;
              return Room.findById(roomId);

            case 5:
              room = _context7.sent;

              if (room.status !== "created") {
                hydrateAnswers(roomId);
                hydrateQuestions(roomId);
              }

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function hydrate(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  socket.on("join",
  /*#__PURE__*/
  function () {
    var _ref10 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(player) {
      var _id, roomId, socketInRoom;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              socket.player = player;
              _id = player._id, roomId = player.roomId;
              socketInRoom = Object.prototype.hasOwnProperty.call(socket.rooms, roomId);
              _context9.next = 5;
              return Player.connected(_id);

            case 5:
              if (!socketInRoom) {
                socket.join(roomId,
                /*#__PURE__*/
                (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee8() {
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          (0, _logger.socketLog)(player.name + " connected to room");
                          hydrate(roomId);

                        case 2:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                })));
              } else {
                hydrate(roomId);
              }

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x6) {
      return _ref10.apply(this, arguments);
    };
  }());

  socket.missingPlayer = function () {
    if (!socket.player) {
      (0, _logger.error)("Missing player from socket: " + socket.id);
      socket.emit("refresh"); // socket.emit("disconnected");

      return true;
    }

    var playerInRoom = common.players.some(function (player) {
      return player._id.toString() === socket.player._id;
    });

    if (!playerInRoom) {
      (0, _logger.error)("Socket player not in player list: " + socket.player.name);
      socket.emit("kick");
      return true;
    }

    return false;
  };

  socket.on("leave", leaveRoom);
  socket.on("disconnect",
  /*#__PURE__*/
  function () {
    var _ref12 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10(reason) {
      var _socket$player3, name, roomId, room;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (socket.player) {
                _context10.next = 2;
                break;
              }

              return _context10.abrupt("return");

            case 2:
              _socket$player3 = socket.player, name = _socket$player3.name, roomId = _socket$player3.roomId;
              _context10.next = 5;
              return Room.findById(roomId);

            case 5:
              room = _context10.sent;

              if (!(room.status === "ended")) {
                _context10.next = 8;
                break;
              }

              return _context10.abrupt("return");

            case 8:
              (0, _logger.socketLog)(name + " disconnected due to " + reason);
              disconnect();

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x7) {
      return _ref12.apply(this, arguments);
    };
  }());
  socket.on('reconnect', function (attemptNumber) {
    console.log("attemptNumber", attemptNumber);
  });
  Object.assign(common, {
    emitPlayers: emitPlayers
  });
};

var _default = connectionEvents;
exports["default"] = _default;