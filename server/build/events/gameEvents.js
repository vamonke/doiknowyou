"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Room = _interopRequireWildcard(require("../models/Room"));

var Player = _interopRequireWildcard(require("../models/Player"));

var Question = _interopRequireWildcard(require("../models/Question"));

var Answer = _interopRequireWildcard(require("../models/Answer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var gameEvents =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(io, socket, common) {
    var timeLimit, getTimeLimit, startTimer, endQuestion, gameOver, completeIfAllAnswered, closeQuestion, closeIfAllAnswered;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            timeLimit = false;

            getTimeLimit =
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(roomId) {
                var room;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return Room.findById(roomId);

                      case 2:
                        room = _context.sent;
                        timeLimit = room.timeLimit;

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function getTimeLimit(_x4) {
                return _ref2.apply(this, arguments);
              };
            }(); // Game: Start timing


            startTimer =
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(question) {
                var duration, callback;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(timeLimit === false)) {
                          _context3.next = 3;
                          break;
                        }

                        _context3.next = 3;
                        return getTimeLimit(question.roomId);

                      case 3:
                        if (!(timeLimit !== 0)) {
                          _context3.next = 13;
                          break;
                        }

                        duration = (timeLimit + 0.5) * 1000;
                        callback = endQuestion;

                        if (!(question.type === "open")) {
                          _context3.next = 10;
                          break;
                        }

                        duration *= 2;
                        if (!question.isClosed) callback = closeQuestion;
                        return _context3.abrupt("return");

                      case 10:
                        if (question.round === 1) duration += 3500;
                        common.gameLog(duration / 1000 + "s given");
                        setTimeout(
                        /*#__PURE__*/
                        (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee2() {
                          var timedOutQuestion;
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return Question.findById(question._id);

                                case 2:
                                  timedOutQuestion = _context2.sent;

                                  if (timedOutQuestion.status === "asking") {
                                    common.gameLog("Times up for question");
                                    callback(question);
                                  }

                                case 4:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee2);
                        })), duration);

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function startTimer(_x5) {
                return _ref3.apply(this, arguments);
              };
            }(); // Game: End question


            endQuestion =
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(question) {
                var questionId, roomId, correctAnswer, recipientId, answers, players, promises, answerIds, completedQuestion, round, nextQuestion;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        questionId = question._id, roomId = question.roomId, correctAnswer = question.correctAnswer, recipientId = question.recipientId;
                        common.gameLog("Question completed");
                        io.to(roomId).emit("completed"); // Tabulate scores

                        _context4.next = 5;
                        return Answer.findByQuestion(questionId);

                      case 5:
                        answers = _context4.sent;
                        players = [];

                        if (!(correctAnswer && correctAnswer.length > 0)) {
                          _context4.next = 14;
                          break;
                        }

                        promises = answers.filter(function (answer) {
                          return correctAnswer.includes(answer.option);
                        }).map(function (answer) {
                          return Player.addScore(answer.playerId);
                        });
                        _context4.next = 11;
                        return Promise.all(promises);

                      case 11:
                        players = _context4.sent;
                        _context4.next = 14;
                        break;

                      case 14:
                        answerIds = answers.map(function (answer) {
                          return answer._id;
                        });
                        _context4.next = 17;
                        return Question.complete(questionId, answerIds);

                      case 17:
                        completedQuestion = _context4.sent;
                        // Send results
                        common.gameLog("Question results");
                        io.to(roomId).emit("results", {
                          question: completedQuestion,
                          players: players
                        }); // Draw next question OR end the game

                        round = completedQuestion.round;
                        _context4.next = 23;
                        return Question.draw(roomId, round + 1, recipientId);

                      case 23:
                        nextQuestion = _context4.sent;

                        if (nextQuestion) {
                          common.gameLog("Next question - " + nextQuestion.text);
                          io.to(roomId).emit("nextQuestion", {
                            currentQuestion: nextQuestion
                          });
                          startTimer(nextQuestion);
                        } else {
                          gameOver(roomId);
                        }

                      case 25:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function endQuestion(_x6) {
                return _ref5.apply(this, arguments);
              };
            }(); // Game: Over


            gameOver =
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee5(roomId) {
                var newRoom, room;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return Room.create();

                      case 2:
                        newRoom = _context5.sent;
                        _context5.next = 5;
                        return Room.gameOver(roomId, newRoom.number);

                      case 5:
                        room = _context5.sent;
                        common.gameLog("Game Over");
                        io.to(roomId).emit("gameOver", room);

                      case 8:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function gameOver(_x7) {
                return _ref6.apply(this, arguments);
              };
            }(); // Game: End question if all players have answered


            completeIfAllAnswered =
            /*#__PURE__*/
            function () {
              var _ref7 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee6(question) {
                var questionId, roomId, correctAnswer, recipientId, recipientInGame, completed;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        questionId = question._id, roomId = question.roomId, correctAnswer = question.correctAnswer, recipientId = question.recipientId;

                        if (correctAnswer) {
                          _context6.next = 6;
                          break;
                        }

                        recipientInGame = common.players.some(function (player) {
                          return player._id.toString() === recipientId;
                        });

                        if (!recipientInGame) {
                          _context6.next = 5;
                          break;
                        }

                        return _context6.abrupt("return");

                      case 5:
                        console.log("Recipient not in game - ", common.players);

                      case 6:
                        _context6.next = 8;
                        return Answer.hasEveryPlayerAnswered(roomId, questionId, recipientId);

                      case 8:
                        completed = _context6.sent;

                        if (completed) {
                          _context6.next = 11;
                          break;
                        }

                        return _context6.abrupt("return", false);

                      case 11:
                        endQuestion(question);

                      case 12:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function completeIfAllAnswered(_x8) {
                return _ref7.apply(this, arguments);
              };
            }(); // Game: Update open-ended answers


            closeQuestion =
            /*#__PURE__*/
            function () {
              var _ref8 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee7(question) {
                var questionId, roomId, questionWithOptions, options, skippedQuestion;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        questionId = question._id, roomId = question.roomId;
                        _context7.next = 3;
                        return Question.openToRecipient(questionId);

                      case 3:
                        questionWithOptions = _context7.sent;
                        options = questionWithOptions.options;

                        if (!(!options || options.length === 0)) {
                          _context7.next = 10;
                          break;
                        }

                        _context7.next = 8;
                        return Question.findById(questionId);

                      case 8:
                        skippedQuestion = _context7.sent;
                        return _context7.abrupt("return", endQuestion(skippedQuestion));

                      case 10:
                        common.gameLog("Recipient to answer open-ended question");
                        io.to(roomId).emit("openQuestion", {
                          currentQuestion: questionWithOptions
                        });
                        startTimer(_objectSpread({}, questionWithOptions, {
                          roomId: roomId
                        }));

                      case 13:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function closeQuestion(_x9) {
                return _ref8.apply(this, arguments);
              };
            }(); // Game: Update open ended question if all answered


            closeIfAllAnswered =
            /*#__PURE__*/
            function () {
              var _ref9 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee8(question) {
                var questionId, roomId, recipientId, allAnswered;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        questionId = question._id, roomId = question.roomId, recipientId = question.recipientId;
                        _context8.next = 3;
                        return Answer.hasEveryPlayerAnswered(roomId, questionId, recipientId);

                      case 3:
                        allAnswered = _context8.sent;
                        if (allAnswered) closeQuestion(question);

                      case 5:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function closeIfAllAnswered(_x10) {
                return _ref9.apply(this, arguments);
              };
            }(); // Game: Player answer


            socket.on("answer",
            /*#__PURE__*/
            function () {
              var _ref10 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee9(answer) {
                var _socket$player, playerId, roomId, currentQuestion, _currentQuestion, questionId, recipientId, type, isRecipient, answerArray;

                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!socket.missingPlayer()) {
                          _context9.next = 2;
                          break;
                        }

                        return _context9.abrupt("return");

                      case 2:
                        _socket$player = socket.player, playerId = _socket$player._id, roomId = _socket$player.roomId;
                        _context9.next = 5;
                        return Question.getCurrentQuestionInRoom(roomId);

                      case 5:
                        currentQuestion = _context9.sent;
                        _currentQuestion = currentQuestion, questionId = _currentQuestion._id, recipientId = _currentQuestion.recipientId, type = _currentQuestion.type;
                        isRecipient = playerId === recipientId;

                        if (!isRecipient) {
                          _context9.next = 16;
                          break;
                        }

                        answerArray = Array.isArray(answer) ? answer : [answer];
                        answerArray = answerArray.map(Number);
                        _context9.next = 13;
                        return Question.setCorrectAnswer(questionId, answerArray);

                      case 13:
                        currentQuestion = _context9.sent;
                        _context9.next = 23;
                        break;

                      case 16:
                        if (!(type === "open" && !isRecipient)) {
                          _context9.next = 21;
                          break;
                        }

                        _context9.next = 19;
                        return Answer.insertOpen(answer, questionId, playerId);

                      case 19:
                        _context9.next = 23;
                        break;

                      case 21:
                        _context9.next = 23;
                        return Answer.create(answer, questionId, playerId);

                      case 23:
                        currentQuestion.roomId = roomId;
                        common.playerLog("answer - " + answer);

                        if (type === "open" && !isRecipient) {
                          io.to(roomId).emit("openAnswer", {
                            playerId: playerId,
                            answer: answer
                          });
                          closeIfAllAnswered(currentQuestion);
                        } else {
                          io.to(roomId).emit("playerAnswer", playerId);
                          completeIfAllAnswered(currentQuestion);
                        }

                      case 26:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x11) {
                return _ref10.apply(this, arguments);
              };
            }());
            Object.assign(common, {
              startTimer: startTimer,
              completeIfAllAnswered: completeIfAllAnswered
            });

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function gameEvents(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = gameEvents;
exports["default"] = _default;