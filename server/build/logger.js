"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameLog = exports.playerLog = exports.socketLog = exports.warn = exports.error = exports.logger = void 0;

var _winston = _interopRequireWildcard(require("winston"));

var config = {
  levels: {
    error: 0,
    warn: 1,
    server: 2,
    player: 3,
    socket: 4,
    info: 5,
    debug: 6
  },
  colors: {
    error: "red",
    warn: "yellow",
    server: "green",
    player: "cyan",
    socket: "magenta",
    info: "blue",
    debug: "white"
  }
};
var logger = (0, _winston.createLogger)({
  levels: config.levels,
  format: _winston.format.combine((0, _winston.format)(function (info) {
    info.level = info.level.toUpperCase();
    return info;
  })(), _winston.format.timestamp({
    // format: "DD/MM/YYYY HH:mm:ss"
    format: "HH:mm:ss"
  }), _winston.format.printf(function (info) {
    return "".concat(info.timestamp, " [").concat(info.level, "] ").concat(info.message);
  }), _winston.format.errors({
    stack: true
  })),
  transports: [// Write all logs error (and below) to `error.log`
  new _winston.transports.File({
    filename: "logs/error.log",
    level: "error"
  }), // Write to all logs with level `info` and below to `combined.log
  new _winston.transports.File({
    filename: "logs/combined.log"
  })]
}); // if (process.env.NODE_ENV !== "production") {

exports.logger = logger;
logger.add(new _winston.transports.Console({
  format: _winston.format.combine(_winston.format.colorize({
    level: true,
    message: true
  }), _winston.format.printf(function (info) {
    return "".concat(info.timestamp, " [").concat(info.level, "] ").concat(info.message);
  }))
})); // }

_winston["default"].addColors(config.colors);

var error = function error(message) {
  logger.log({
    level: "error",
    message: message
  });
};

exports.error = error;

var warn = function warn(message) {
  logger.log({
    level: "warn",
    message: message
  });
};

exports.warn = warn;

var socketLog = function socketLog(message) {
  logger.log({
    level: "socket",
    message: message
  });
};

exports.socketLog = socketLog;

var playerLog = function playerLog(player, msg) {
  logger.log({
    level: "player",
    message: "".concat(player && player._id, ": ").concat(player.name, " ").concat(msg)
  });
};

exports.playerLog = playerLog;

var gameLog = function gameLog(roomId, msg) {
  logger.log({
    level: "server",
    message: "".concat(roomId, ": ").concat(msg)
  });
};

exports.gameLog = gameLog;