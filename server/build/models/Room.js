"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeLimit = exports.updateHost = exports.updateTimeLimit = exports.gameOver = exports.start = exports.isEveryPlayerReady = exports.getPlayers = exports.findByNumber = exports.findById = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var Player = _interopRequireWildcard(require("./Player"));

var generateRoomNo = function generateRoomNo() {
  return Math.floor(1000 + Math.random() * 9000);
};

var schema = new _mongoose.Schema({
  number: {
    type: Number,
    unique: true
  },
  status: {
    type: String,
    "enum": ["created", "started", "ended"],
    "default": "created"
  },
  hostId: String,
  timeLimit: {
    type: Number,
    "default": 0
  },
  nextRoomNo: Number,
  createdAt: Date,
  endedAt: Date
}, {
  versionKey: false
});
var Room = (0, _mongoose.model)("Room", schema);

var create = function create() {
  // console.log("MongoDB: Creating room");
  var number = generateRoomNo();
  return Room.create({
    number: number,
    createdAt: Date.now()
  }).then(function (room) {
    console.log("MongoDB: Room created - " + room.number);
    return room;
  })["catch"](function (error) {
    if (error.code === 11000) {
      console.log("MongoDB: Room number conflict: " + number); // TODO: Use latest room instead of a new room

      return create();
    } else {
      throw error;
    }
  });
};

exports.create = create;

var findById = function findById(id) {
  return Room.findById(id).lean();
};

exports.findById = findById;

var findByNumber = function findByNumber(roomNo) {
  return Room.findOne({
    number: roomNo
  }).exec().then(function (room) {
    if (room) {
      console.log("MongoDB: Room found - " + room.number);
      return room;
    }

    console.log("MongoDB: Room not found - " + roomNo);
    return false;
  })["catch"](function (error) {
    console.error(error);
  });
};

exports.findByNumber = findByNumber;
var getPlayers = Player.findByRoom;
exports.getPlayers = getPlayers;

var isEveryPlayerReady =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(id) {
    var players;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Player.findByRoom(id);

          case 2:
            players = _context.sent;
            return _context.abrupt("return", players.length > 1 && players.every(function (player) {
              return player.isReady;
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isEveryPlayerReady(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.isEveryPlayerReady = isEveryPlayerReady;

var start = function start(id) {
  return Room.findByIdAndUpdate(id, {
    status: "started"
  }, {
    "new": true
  });
};

exports.start = start;

var gameOver = function gameOver(id, nextRoomNo) {
  return Room.findByIdAndUpdate(id, {
    status: "ended",
    nextRoomNo: nextRoomNo,
    endedAt: Date.now()
  }, {
    "new": true
  });
};

exports.gameOver = gameOver;

var updateTimeLimit = function updateTimeLimit(id, timeLimit) {
  return Room.findByIdAndUpdate(id, {
    timeLimit: timeLimit
  }, {
    "new": true
  });
};

exports.updateTimeLimit = updateTimeLimit;

var updateHost = function updateHost(id, hostId) {
  return Room.findByIdAndUpdate(id, {
    hostId: hostId
  }, {
    "new": true
  });
};

exports.updateHost = updateHost;

var getTimeLimit = function getTimeLimit(id) {
  return Room.findById(id).select({
    timeLimit: 1
  }).lean();
};

exports.getTimeLimit = getTimeLimit;