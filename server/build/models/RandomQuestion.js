"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteById = exports.toggleDisabled = exports.getAllowed = exports.getAll = exports.populate = void 0;

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
  disabled: {
    type: Boolean,
    "default": false
  },
  usage: {
    type: Number,
    "default": 0
  },
  tags: {
    type: [String],
    "default": ["general"]
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
    var deleted, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, question;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("MongoDB: Emptying question bank");
            _context.next = 3;
            return RandomQuestion.deleteMany({});

          case 3:
            deleted = _context.sent;
            console.log("MongoDB: Removed", deleted.deletedCount, "questions");
            console.log("MongoDB: Populating question bank");
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;
            _iterator = _questionBank.questionBank[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

            question = _step.value;
            _context.next = 15;
            return RandomQuestion.create(question);

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 11;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            console.log("MongoDB: Inserted", _questionBank.questionBank.length, "questions");

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function populate() {
    return _ref.apply(this, arguments);
  };
}(); // export const getOne = RandomQuestion.aggregate.sample(1);


exports.populate = populate;

var getAll = function getAll() {
  return RandomQuestion.find();
};

exports.getAll = getAll;

var getAllowed = function getAllowed() {
  return RandomQuestion.find({
    disabled: {
      $ne: true
    }
  });
};

exports.getAllowed = getAllowed;

var toggleDisabled =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(id) {
    var randomQuestion;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return RandomQuestion.findById(id);

          case 2:
            randomQuestion = _context2.sent;
            randomQuestion.disabled = !randomQuestion.disabled;
            _context2.next = 6;
            return randomQuestion.save();

          case 6:
            return _context2.abrupt("return", randomQuestion);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function toggleDisabled(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.toggleDisabled = toggleDisabled;

var deleteById = function deleteById(id) {
  return RandomQuestion.findByIdAndDelete(id);
};

exports.deleteById = deleteById;