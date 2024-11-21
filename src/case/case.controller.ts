import { Request, Response } from "express";
import { prisma } from "../database/init";
import { StatusCodes } from "http-status-codes";

export async function createCase(req: Request, res: Response) {
  const { title, date, status, description, caseId } = req.body;
  const newcase = await prisma.case.create({
    data: {
      title,
      date,
      status,
      description,
      caseId,
    },
  });
  return res.status(StatusCodes.CREATED).json(newcase);
}

export async function getCases(req: Request, res: Response) {
  const cases = await prisma.case.findMany();
  return res.status(StatusCodes.OK).json(cases);
}

export async function getCase(req: Request, res: Response) {
  const { caseId } = req.params;
  const cases = await prisma.case.findFirst({
    where: {
      caseId,
    },
  });
  return res.status(StatusCodes.OK).json(cases);
}

export async function updateCase(req: Request, res: Response) {
  const { caseId } = req.params;
  const { title, date, status, description } = req.body;
  const updatedCase = await prisma.case.update({
    where: {
      caseId,
    },
    data: {
      title,
      date,
      status,
      description,
    },
  });
  return res.status(StatusCodes.OK).json(updatedCase);
}
