import * as Log from "../logger";

import connectionEvents from "./connectionEvents";
import lobbyEvents from "./lobbyEvents";
import hostEvents from "./hostEvents";
import gameEvents from "./gameEvents";

const socketEvents = (io, socket) => {
  // console.log("Socket: " + socket.id + " [CONNECTED]");

  const common = {
    players: [],
    gameLog: msg => {
      if (socket.player && socket.player.roomId)
        Log.gameLog(socket.player.roomId, msg);
    },
    playerLog: msg => {
      if (socket.player) Log.playerLog(socket.player, msg);
    }
  };

  gameEvents(io, socket, common);
  lobbyEvents(io, socket, common);
  hostEvents(io, socket, common);
  connectionEvents(io, socket, common);
};

export default socketEvents;
