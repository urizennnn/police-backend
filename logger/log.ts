import winston from "winston";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { format } from "winston";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);

const consoleTransport = new winston.transports.Console({
  format: format.combine(
    format.colorize({ all: true }),
    format.printf(({ timestamp, level, message, ...metadata }) => {
      let msg = `${timestamp} [${level}] : ${message} `;
      const metaString = Object.keys(metadata).length
        ? JSON.stringify(metadata)
        : "";
      return msg + metaString;
    }),
  ),
});

const fileTransports = [
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/combined.log",
  }),
];

const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [...fileTransports, consoleTransport],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

interface ExtendedResponse extends Response {
  _startTime?: number;
  _originalEnd?: (
    chunk?: any,
    encodingOrCallback?: BufferEncoding | (() => void),
    callback?: () => void,
  ) => Response;
}

function LoggingMiddleware(
  req: Request,
  res: ExtendedResponse,
  next: NextFunction,
) {
  res._startTime = Date.now();

  logger.info(`Incoming Request`, {
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    ip: req.ip,
  });

  res._originalEnd = res.end;

  res.end = function (
    chunk?: any,
    encodingOrCb?: BufferEncoding | (() => void),
    cb?: () => void,
  ): Response {
    let encoding: BufferEncoding | undefined;
    let callback: (() => void) | undefined;

    if (typeof encodingOrCb === "string") {
      encoding = encodingOrCb;
      callback = cb;
    } else if (typeof encodingOrCb === "function") {
      callback = encodingOrCb;
    }

    if (this._originalEnd) {
      if (encoding) {
        this._originalEnd(chunk, encoding, callback);
      } else {
        // Type assertion to handle the callback
        this._originalEnd(chunk, callback as any);
      }
    }

    const responseTime = Date.now() - (this._startTime || Date.now());
    logger.info(`Request Completed`, {
      method: req.method,
      path: req.path,
      statusCode: this.statusCode,
      responseTime: `${responseTime}ms`,
    });

    return this;
  };

  next();
}

class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = logger;
  }

  log(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta);
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta);
  }

  verbose(message: string, ...meta: any[]) {
    this.logger.verbose(message, ...meta);
  }
}

export { logger, LoggerService, LoggingMiddleware };
