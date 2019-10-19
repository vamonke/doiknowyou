import * as Log from "../logger";

import connectionEvents from "./connectionEvents";
import lobbyEvents from "./lobbyEvents";
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

  connectionEvents(io, socket);
  lobbyEvents(io, socket);
  gameEvents(io, socket);
};

export default socketEvents;
