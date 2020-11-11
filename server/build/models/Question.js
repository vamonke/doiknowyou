"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findbyRoomId = exports.findById = exports.findAsked = exports.complete = exports.openToRecipient = exports.setCorrectAnswer = exports.getCurrentQuestionInRoomFull = exports.getCurrentQuestionInRoom = exports.addOption = exports.draw = exports.removeByPlayerId = exports.createMany = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var Player = _interopRequireWildcard(require("./Player"));

var schema = new _mongoose.Schema({
  text: String,
  type: {
    type: String,
    "enum": ["mcq", "yesno", "players", "open"],
    "default": "mcq"
  },
  options: {
    type: [String],
    "default": []
  },
  number: Number,
  roomId: String,
  authorId: String,
  round: Number,
  status: {
    type: String,
    "enum": ["unasked", "asking", "asked"],
    "default": "unasked"
  },
  recipientId: String,
  correctAnswer: {
    type: [Number],
    "default": []
  },
  answeredAt: Date,
  randomQuestionId: String,
  answers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }],
  isClosed: Boolean
}, {
  versionKey: false
});
var Question = (0, _mongoose.model)("Question", schema);

var createMany = function createMany(questions, authorId, roomId) {
  var promises = questions.map(function (_ref, number) {
    var randomQuestionId = _ref.randomQuestionId,
        text = _ref.text,
        type = _ref.type,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? [] : _ref$options;
    var question = {
      text: text,
      type: type,
      options: options,
      number: number,
      roomId: roomId,
      authorId: authorId,
      status: "unasked"
    };
    if (randomQuestionId) Object.assign(question, {
      randomQuestionId: randomQuestionId
    });
    return Question.findOneAndUpdate({
      number: number,
      roomId: roomId,
      authorId: authorId
    }, question, {
      upsert: true
    });
  });
  return Promise.all(promises);
};

exports.createMany = createMany;

var removeByPlayerId = function removeByPlayerId(authorId) {
  return Question.deleteMany({
    authorId: authorId
  });
};

exports.removeByPlayerId = removeByPlayerId;

var draw =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(roomId, round, currentRecipientId) {
    var unasked, id, recipientId, update, players, drawn;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Question.aggregate([[{
              $match: {
                roomId: roomId,
                status: "unasked"
              }
            }, {
              $sample: {
                size: 1
              }
            }]]);

          case 2:
            unasked = _context.sent;

            if (!(unasked && unasked.length > 0)) {
              _context.next = 20;
              break;
            }

            id = unasked[0]._id; // get next recipient

            _context.next = 7;
            return Player.getNextRecipientId(roomId, currentRecipientId);

          case 7:
            recipientId = _context.sent;
            update = {
              status: "asking",
              recipientId: recipientId,
              round: round
            };

            if (!(unasked[0].type === "players")) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return Player.findByRoom(roomId);

          case 12:
            players = _context.sent;
            update.options = players.map(function (player) {
              return player.name;
            });

          case 14:
            _context.next = 16;
            return Question.findByIdAndUpdate(id, update, {
              "new": true
            });

          case 16:
            drawn = _context.sent;
            return _context.abrupt("return", drawn);

          case 20:
            return _context.abrupt("return", false);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function draw(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.draw = draw;

var addOption =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(answer, id) {
    var question, optionIndex;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Question.findByIdAndUpdate(id, {
              $push: {
                options: answer
              }
            }, {
              "new": true,
              lean: true
            });

          case 2:
            question = _context2.sent;
            optionIndex = question.options.findIndex(function (option) {
              return option === answer;
            }); // get answer index

            return _context2.abrupt("return", optionIndex);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addOption(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addOption = addOption;

var getCurrentQuestionInRoom = function getCurrentQuestionInRoom(roomId) {
  return Question.findOne({
    roomId: roomId,
    status: "asking"
  }, {
    correctAnswer: 1,
    recipientId: 1,
    type: 1,
    options: 1
  }).lean();
};

exports.getCurrentQuestionInRoom = getCurrentQuestionInRoom;

var getCurrentQuestionInRoomFull = function getCurrentQuestionInRoomFull(roomId) {
  return Question.findOne({
    roomId: roomId,
    status: "asking"
  }).lean();
};

exports.getCurrentQuestionInRoomFull = getCurrentQuestionInRoomFull;

var setCorrectAnswer = function setCorrectAnswer(id, correctAnswer) {
  return Question.findByIdAndUpdate(id, {
    correctAnswer: correctAnswer
  }, {
    "new": true,
    select: {
      correctAnswer: 1,
      recipientId: 1,
      type: 1
    }
  }).lean();
};

exports.setCorrectAnswer = setCorrectAnswer;

var openToRecipient = function openToRecipient(id) {
  return Question.findByIdAndUpdate(id, {
    isClosed: true
  }, {
    "new": true,
    select: {
      isClosed: 1,
      options: 1,
      type: 1
    },
    lean: true
  });
};

exports.openToRecipient = openToRecipient;

var complete = function complete(id, answers) {
  return Question.findByIdAndUpdate(id, {
    status: "asked",
    answers: answers
  }, {
    "new": true,
    select: {
      text: 1,
      type: 1,
      options: 1,
      round: 1,
      status: 1,
      recipientId: 1,
      correctAnswer: 1,
      answers: 1
    }
  }).populate("answers", {
    option: 1,
    playerId: 1
  }).lean();
};

exports.complete = complete;

var findAsked = function findAsked(roomId) {
  return Question.find({
    roomId: roomId,
    status: "asked"
  }).select({
    text: 1,
    type: 1,
    options: 1,
    round: 1,
    status: 1,
    recipientId: 1,
    correctAnswer: 1,
    answers: 1
  }).sort({
    round: "desc"
  }).populate("answers", {
    option: 1,
    playerId: 1
  }).lean();
};

exports.findAsked = findAsked;

var findById = function findById(id) {
  return Question.findById(id);
};

exports.findById = findById;

var findbyRoomId = function findbyRoomId(roomId) {
  return Question.find({
    roomId: roomId
  }).populate("answers", {
    option: 1,
    playerId: 1
  });
}; // export const deleteById = id => Question.findByIdAndDelete(id);


exports.findbyRoomId = findbyRoomId;