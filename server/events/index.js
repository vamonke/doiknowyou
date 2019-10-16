import * as Log from "../logger";

import lobbyEvents from "./lobbyEvents";
import connectionEvents from "./connectionEvents";

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
};

export default socketEvents;
