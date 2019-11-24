import winston, { createLogger, format, transports } from "winston";

const config = {
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

export const logger = createLogger({
  levels: config.levels,
  format: format.combine(
    format(info => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.timestamp({
      // format: "DD/MM/YYYY HH:mm:ss"
      format: "HH:mm:ss"
    }),
    format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
    format.errors({ stack: true }),
  ),
  transports: [
    // Write all logs error (and below) to `error.log`
    new transports.File({ filename: "logs/error.log", level: "error" }),
    // Write to all logs with level `info` and below to `combined.log
    new transports.File({ filename: "logs/combined.log" })
  ]
});

// if (process.env.NODE_ENV !== "production") {
logger.add(
  new transports.Console({
    format: format.combine(
      format.colorize({ level: true, message: true }),
      format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
    )
  })
);
// }

winston.addColors(config.colors);

export const error = message => {
  logger.log({
    level: "error",
    message
  });
};

export const warn = message => {
  logger.log({
    level: "warn",
    message
  });
};

export const socketLog = message => {
  logger.log({
    level: "socket",
    message: message
  });
};

export const playerLog = (player, msg) => {
  logger.log({
    level: "player",
    message: `${player && player._id}: ${player.name} ${msg}`
  });
};

export const gameLog = (roomId, msg) => {
  logger.log({
    level: "server",
    message: `${roomId}: ${msg}`
  });
};
