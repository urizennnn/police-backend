import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

export const Logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});

export const logWithContext = (message: string, context: string) => {
  Logger.info(`[${context}] ${message}`);
};
export const logInfo = (message: string) => Logger.info(message);
export const logError = (message: string) => Logger.error(message);
export const logDebug = (message: string) => Logger.debug(message);
export const logWarn = (message: string) => Logger.warn(message);
