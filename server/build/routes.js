"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _controllers = require("./controllers");

// import { populateQuestionBank } from "./controllers";
var router = _express["default"].Router(); // Admin


router.get("/", function (_, res) {
  res.sendFile(__dirname + "/index.html");
}); // New game

router.post("/api/game/create",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _controllers.createGame)(req.body.playerName);

          case 2:
            result = _context.sent;
            res.json(result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/api/game/join",
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, playerName, roomNo, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, playerName = _req$body.playerName, roomNo = _req$body.roomNo;
            _context2.next = 3;
            return (0, _controllers.joinGame)(playerName, roomNo);

          case 3:
            result = _context2.sent;

            if (!result) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json(result));

          case 6:
            return _context2.abrupt("return", res.status(404).json({
              error: "Room not found"
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Question Bank
// router.get("/api/populate", (_, res) => {
//   populateQuestionBank();
//   res.json({ result: "ok" });
// });

router.get("/api/questionbank",
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(_, res) {
    var questionBank;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _controllers.getQuestionBank)();

          case 2:
            questionBank = _context3.sent;
            res.json({
              questionBank: questionBank
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;