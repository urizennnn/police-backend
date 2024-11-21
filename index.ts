import express, { Request, Response } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
