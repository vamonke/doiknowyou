"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _controllers = require("./controllers");

var Admin = _interopRequireWildcard(require("./controllers/admin"));

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
}()); // Admin

router.get("/api/questionbank/populate", function (_, res) {
  Admin.populateQuestionBank();
  res.json({
    result: "ok"
  });
});
router.get("/api/questionbank/toggle/:id",
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var question;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!req.params || !req.params.id)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", res.json({
              result: "Missing param: id"
            }));

          case 2:
            _context4.next = 4;
            return Admin.toggleQuestion(req.params.id);

          case 4:
            question = _context4.sent;
            res.json({
              question: question
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/api/questionbank/all",
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(_, res) {
    var questionBank;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Admin.getQuestionBankAll();

          case 2:
            questionBank = _context5.sent;
            res.json({
              questionBank: questionBank
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.get("/api/rooms",
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(_, res) {
    var rooms;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Admin.getRooms();

          case 2:
            rooms = _context6.sent;
            res.json({
              rooms: rooms
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.get("/api/rooms/:id",
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var room;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!(!req.params || !req.params.id)) {
              _context7.next = 2;
              break;
            }

            return _context7.abrupt("return", res.json({
              result: "Missing param: id"
            }));

          case 2:
            _context7.next = 4;
            return Admin.getRoom(req.params.id);

          case 4:
            room = _context7.sent;
            res.json({
              room: room
            });

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;