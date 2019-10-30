"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _logger = require("../logger");

var _connectionEvents = _interopRequireDefault(require("./connectionEvents"));

var _lobbyEvents = _interopRequireDefault(require("./lobbyEvents"));

var _hostEvents = _interopRequireDefault(require("./hostEvents"));

var _gameEvents = _interopRequireDefault(require("./gameEvents"));

var socketEvents = function socketEvents(io, socket) {
  // console.log("Socket: " + socket.id + " [CONNECTED]");
  var common = {
    players: [],
    gameLog: function gameLog(msg) {
      if (socket.player && socket.player.roomId) (0, _logger.gameLog)(socket.player.roomId, msg);
    },
    playerLog: function playerLog(msg) {
      if (socket.player) (0, _logger.playerLog)(socket.player, msg);
    }
  };
  (0, _gameEvents["default"])(io, socket, common);
  (0, _lobbyEvents["default"])(io, socket, common);
  (0, _hostEvents["default"])(io, socket, common);
  (0, _connectionEvents["default"])(io, socket, common);
};

var _default = socketEvents;
exports["default"] = _default;