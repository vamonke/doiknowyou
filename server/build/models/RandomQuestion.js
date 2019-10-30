"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteById = exports.getAll = exports.populate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _questionBank = require("./questionBank.json");

var schema = new _mongoose.Schema({
  text: String,
  type: {
    type: String,
    "enum": ["mcq", "yesno", "players", "open"],
    "default": "mcq"
  },
  options: {
    type: [String],
    "default": undefined
  },
  usage: {
    type: Number,
    "default": 0
  }
}, {
  versionKey: false
});
var RandomQuestion = (0, _mongoose.model)("RandomQuestion", schema);

var populate =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, question;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("MongoDB: Populating Question Bank");
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = _questionBank.questionBank[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 14;
              break;
            }

            question = _step.value;
            console.log(question.text);
            _context.next = 11;
            return RandomQuestion.create(question);

          case 11:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 14:
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 20:
            _context.prev = 20;
            _context.prev = 21;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 23:
            _context.prev = 23;

            if (!_didIteratorError) {
              _context.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return _context.finish(23);

          case 27:
            return _context.finish(20);

          case 28:
            console.log("Done!");

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 16, 20, 28], [21,, 23, 27]]);
  }));

  return function populate() {
    return _ref.apply(this, arguments);
  };
}(); // export const getOne = RandomQuestion.aggregate.sample(1);


exports.populate = populate;

var getAll = function getAll() {
  return RandomQuestion.find().select({
    usage: 0
  });
};

exports.getAll = getAll;

var deleteById = function deleteById(id) {
  return RandomQuestion.findByIdAndDelete(id);
};

exports.deleteById = deleteById;