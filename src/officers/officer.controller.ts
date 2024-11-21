import { Request, Response } from "express";
import { OfficerStatus, Status } from "@prisma/client";
import { prisma } from "../database/init";
import { OfficerDTO } from "./officer.dto";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export async function createOfficer(req: Request, res: Response) {
  try {
    const details: OfficerDTO = req.body;
    const newOfficer = await prisma.officer.create({
      data: {
        name: details.name,
        rank: details.rank,
        badgeNumber: details.badgeNumber,
        status: OfficerStatus.ON_DUTY,
      },
    });

    res.status(StatusCodes.CREATED).json({
      message: "Officer created successfully",
      officer: newOfficer,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Officer with the same badge number already exists",
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Database error",
          error: error.message,
        });
      }
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
}
