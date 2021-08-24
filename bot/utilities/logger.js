const { createLogger, format, transports, addColors } = require("winston");
const path = require("path");
const levels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warn: 4,
    notice: 5,
    shard: 6,
    db: 7,
    client: 8,
    info: 9,
    debug: 10,
    message: 11,
  },
  colors: {
    emerg: "red",
    alert: "red",
    crit: "red",
    error: "magenta",
    warn: "yellow",
    notice: "yellow",
    shard: "cyan",
    db: "green",
    client: "blue",
    info: "green",
    debug: "blue",
    message: "green",
  },
};
// Custom log formatting
const logFormat = format.printf((info) => {
  const { timestamp, level, label, message, ...rest } = info;
  let log = `[${timestamp}] - [${level}]: ${message}`;

  // Check if rest is an object
  if (!(Object.keys(rest).length === 0 && rest.constructor === Object)) {
    log = `${log}\n${JSON.stringify(rest, null, 2)}`.replace(/\\n/g, "\n");
  }
  return log;
});

/**
 * Create a new logger
 * @type {Logger}
 */
const logger = createLogger({
  levels: levels.levels,
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
  ),
  transports: [
    // Logging to console
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    // Logging info and up to file
    new transports.File({
      filename: "./bot/logs/full.log",
      level: "info",
      format: logFormat,
      options: { flags: "w" },
    }),
    // Logging only warns and errors to file
    new transports.File({
      filename: "./bot/logs/error.log",
      level: "warn",
      format: logFormat,
      options: { flags: "w" },
    }),
  ],
});
addColors(levels.colors);
module.exports = logger;
