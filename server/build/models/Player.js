"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addScore = exports.getNextRecipientId = exports.connected = exports.disconnect = exports.remove = exports.notReady = exports.ready = exports.findIdsByRoom = exports.findCountByRoom = exports.findByRoom = exports.findById = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var schema = new _mongoose.Schema({
  name: String,
  roomId: String,
  isReady: {
    type: Boolean,
    "default": false
  },
  score: {
    type: Number,
    "default": 0
  },
  disconnected: {
    type: Boolean,
    "default": false
  },
  createdAt: Date
}, {
  versionKey: false
});
var Player = (0, _mongoose.model)("Player", schema);

var create =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(roomId, name) {
    var player;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Player.create({
              name: name,
              roomId: roomId
            });

          case 2:
            player = _context.sent;
            console.log("MongoDB: Player created - " + player.name);
            return _context.abrupt("return", player);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = create;

var findById = function findById(id) {
  return Player.findById(id).lean();
};

exports.findById = findById;

var findByRoom = function findByRoom(roomId) {
  return Player.find({
    roomId: roomId
  }).select({
    name: 1,
    isReady: 1,
    score: 1,
    disconnected: 1
  });
};

exports.findByRoom = findByRoom;

var findCountByRoom = function findCountByRoom(roomId) {
  return Player.count({
    roomId: roomId
  });
};

exports.findCountByRoom = findCountByRoom;

var findIdsByRoom = function findIdsByRoom(roomId) {
  return Player.find({
    roomId: roomId
  }).select({
    _id: 1
  }).sort({
    _id: 1
  });
};

exports.findIdsByRoom = findIdsByRoom;

var ready = function ready(id) {
  return Player.findByIdAndUpdate(id, {
    isReady: true
  });
};

exports.ready = ready;

var notReady = function notReady(id) {
  return Player.findByIdAndUpdate(id, {
    isReady: false
  });
};

exports.notReady = notReady;

var remove = function remove(id) {
  return Player.findByIdAndDelete(id);
};

exports.remove = remove;

var disconnect = function disconnect(id) {
  return Player.findByIdAndUpdate(id, {
    disconnected: true
  });
};

exports.disconnect = disconnect;

var connected = function connected(id) {
  return Player.findByIdAndUpdate(id, {
    disconnected: false
  });
};

exports.connected = connected;

var getNextRecipientId =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(roomId, currentRecipientId) {
    var next;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!currentRecipientId) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return Player.findOne({
              roomId: roomId,
              disconnected: false,
              _id: {
                $gt: currentRecipientId
              }
            }, "_id", {
              sort: {
                _id: 1
              }
            });

          case 3:
            next = _context2.sent;

          case 4:
            if (next) {
              _context2.next = 8;
              break;
            }

            _context2.next = 7;
            return Player.findOne({
              roomId: roomId,
              disconnected: false
            }, "_id");

          case 7:
            next = _context2.sent;

          case 8:
            return _context2.abrupt("return", next ? next._id : null);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getNextRecipientId(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getNextRecipientId = getNextRecipientId;

var addScore = function addScore(id) {
  return Player.findByIdAndUpdate(id, {
    $inc: {
      score: 1
    }
  }, {
    "new": true,
    select: {
      name: 1,
      roomId: 1,
      score: 1
    }
  });
};

exports.addScore = addScore;