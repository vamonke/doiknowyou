export const playerLog = (player, msg) => {
  const time = (new Date).toLocaleTimeString();
  let str = time + " [PLAYER] ";
  if (player.roomId) {
    str += player._id + ": ";
  }
  // str += "Player (" + player.name + ") " + msg;
  str += player.name + " " + msg;
  console.info("\x1b[36m%s\x1b[0m", str);
};

export const gameLog = (roomId, msg) => {
  const time = (new Date).toLocaleTimeString();
  let str = `${time} [SERVER] ${roomId}: ${msg}`;
  console.info("\x1b[33m%s\x1b[0m", str);
};
