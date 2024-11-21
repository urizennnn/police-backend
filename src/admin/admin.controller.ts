import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { StatusCodes } from "http-status-codes";
import { prisma } from "../database/init";

export async function loginAdmin(req: Request, res: Response) {
  const { username, password } = req.body;
  const admin = await prisma.admin.findFirst({
    where: {
      username,
    },
  });
  if (!admin) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (isPasswordValid) {
    return res.status(StatusCodes.OK).json(admin);
  }
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: "Invalid credentials" });
}

export async function createAdmin(req: Request, res: Response) {
  let { username, password } = req.body;

  password = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: {
      username,
      password,
    },
  });
  return res.status(StatusCodes.CREATED).json(admin);
}
