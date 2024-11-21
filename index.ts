import express, { Request, Response } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { prisma } from "./src/database/init";
import process from "node:process";
import morgan from "morgan";
import { LoggerService, LoggingMiddleware } from "./logger/log";

dotenv.config();

const app = express();
export const Logger = new LoggerService();

const PORT = 3000;

app.use(express.json());
app.use(morgan("combined"));
app.use(LoggingMiddleware);
app.use(cors());

app.use("/api", require("./src/route.index"));

app.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    message: "Hello World",
  });
});

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    Logger.log("Database connected");
    Logger.verbose(`Server started on http://localhost:${PORT}`, "app");
  } catch (error) {
    Logger.error("Error starting server", error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  Logger.log("Database disconnected");
  Logger.log("Server stopped");
  process.exit(0);
});
