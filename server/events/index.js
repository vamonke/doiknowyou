import * as Log from "../logger";

import connectionEvents from "./connectionEvents";
import lobbyEvents from "./lobbyEvents";
import hostEvents from "./hostEvents";
import gameEvents from "./gameEvents";

const socketEvents = (io, socket) => {
  // console.log("Socket: " + socket.id + " [CONNECTED]");

  socket.gameLog = msg => {
    if (socket.player && socket.player.roomId)
      Log.gameLog(socket.player.roomId, msg);
  };

  socket.playerLog = msg => {
    if (socket.player) Log.playerLog(socket.player, msg);
  };

  gameEvents(io, socket);
  hostEvents(io, socket);
  lobbyEvents(io, socket);
  connectionEvents(io, socket);
};

export default socketEvents;
