import { Status } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class ReportDTO {
  @IsString()
  caseId: string;
  @IsString()
  officerId: string;
  @IsString()
  reportId: string;
  @IsEnum(Status)
  status: Status;
}
