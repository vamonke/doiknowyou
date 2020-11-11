"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByQuestion = exports.hasEveryPlayerAnswered = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var Player = _interopRequireWildcard(require("./Player"));

var Question = _interopRequireWildcard(require("./Question"));

var schema = new _mongoose.Schema({
  questionId: String,
  playerId: String,
  option: Number,
  createdAt: Date
}, {
  versionKey: false
});
var Answer = (0, _mongoose.model)("Answer", schema);

var create = function create(option, questionId, playerId) {
  var answer = {
    option: option,
    questionId: questionId,
    playerId: playerId,
    createdAt: Date.now()
  };
  return Answer.findOneAndUpdate({
    questionId: questionId,
    playerId: playerId
  }, answer, {
    upsert: true
  });
};

exports.create = create;

var hasEveryPlayerAnswered =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(roomId, questionId, recipientId) {
    var playerIds, answeredPlayerIds, allAnswered;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Player.findIdsByRoom(roomId);

          case 2:
            playerIds = _context.sent;
            _context.next = 5;
            return Answer.find({
              questionId: questionId
            }, {
              playerId: 1,
              _id: 0
            }, {
              sort: {
                playerId: 1
              }
            });

          case 5:
            answeredPlayerIds = _context.sent;

            if (!(answeredPlayerIds.length < playerIds.length - 1)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", false);

          case 8:
            allAnswered = playerIds.map(function (_ref2) {
              var _id = _ref2._id;
              return _id.toString();
            }).filter(function (id) {
              return id !== recipientId;
            }).every(function (id, i) {
              return id === answeredPlayerIds[i].playerId;
            });
            return _context.abrupt("return", allAnswered);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hasEveryPlayerAnswered(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.hasEveryPlayerAnswered = hasEveryPlayerAnswered;

var findByQuestion = function findByQuestion(questionId) {
  return Answer.find({
    questionId: questionId
  }).select({
    option: 1,
    playerId: 1
  });
}; // export const insertOpen = async (answer, questionId, playerId) => {
//   // Add option to question
//   const option = await Question.addOption(answer, questionId);
//   // Insert answer
//   await create(option, questionId, playerId);
//   return option;
// };
// export const getCorrectAnswers = (questionId, option, recipientId) => {
//   return Answer.find(
//     { questionId, option, playerId: { $ne: recipientId } },
//     { _id: 0, playerId: 1 }
//   );
// };


exports.findByQuestion = findByQuestion;