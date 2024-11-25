import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../database/init";

export const GetDashboardDetails = async (_req: Request, res: Response) => {
  try {
    const [
      openCasesCount,
      onDutyOfficersCount,
      totalEvidenceCount,
      pendingReportsCount,
      recentCases,
    ] = await Promise.all([
      prisma.case.count({ where: { status: "OPEN" } }),
      prisma.officer.count({ where: { status: "ON_DUTY" } }),
      prisma.evidence.count(),
      prisma.report.count({ where: { status: "PENDING" } }),
      prisma.case.findMany({
        take: 5,
      }),
    ]);

    return res.status(StatusCodes.OK).json({
      openCasesCount,
      onDutyOfficersCount,
      totalEvidenceCount,
      pendingReportsCount,
      recentCases,
    });
  } catch (error) {
    console.error("Error fetching dashboard details:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while fetching dashboard details.",
    });
  }
};
