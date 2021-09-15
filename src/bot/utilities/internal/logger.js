import winston from "winston";
import path from "path";
const { createLogger, format, transports, addColors } = winston;
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
    const { timestamp, level, message: messageRaw, label, stack } = info, message = typeof messageRaw === "object"
        ? JSON.stringify(messageRaw)
        : messageRaw;
    let log = `[${timestamp} in ${label}] - [${level}]: ${message}`;
    if (stack)
        log += `\n${stack.split("\n").splice(1).join("\n")}`;
    return log;
});
/**
 * Create a new logger
 * @type {Logger}
 */
const logger = createLogger({
    levels: levels.levels,
    format: format.combine(format.errors({ stack: true }), format.label({ label: path.basename(require.main.filename) }), format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })),
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
export default logger;
