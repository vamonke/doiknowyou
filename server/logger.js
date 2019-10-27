export const playerLog = (player, msg) => {
  let str = "[PLAYER] ";
  if (player.roomId) {
    str += "Room " + player.roomId + ": ";
  }
  // str += "Player (" + player.name + ") " + msg;
  str += player.name + " " + msg;
  console.log("\x1b[36m%s\x1b[0m", str);
};

export const gameLog = (roomNo, msg) => {
  let str = `[SERVER] Room ${roomNo}: ${msg}`;
  console.log("\x1b[33m%s\x1b[0m", str);
};
