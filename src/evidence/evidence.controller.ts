import { Request, Response } from "express";
import { prisma } from "../database/init";
import { StatusCodes } from "http-status-codes";
import { EvidenceDTO } from "./evidence.dto";
export async function createEvidence(req: Request, res: Response) {
  const details: EvidenceDTO = req.body;
  const evidence = await prisma.evidence.create({
    data: {
      caseId: details.caseId,
      type: details.type,
      status: details.status,
      location: details.location,
      date: new Date(),
      evidenceID: details.evidenceId,
    },
  });
  return res.status(StatusCodes.CREATED).json(evidence);
}

export async function getEvidence(req: Request, res: Response) {
  const evidence = await prisma.evidence.findMany();
  return res.status(StatusCodes.OK).json(evidence);
}
