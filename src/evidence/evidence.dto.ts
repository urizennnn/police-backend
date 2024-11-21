import { Status } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class EvidenceDTO {
  @IsString()
  caseId: string;

  @IsString()
  type: string;

  @IsString()
  evidenceId: string;

  @IsEnum(Status)
  status: Status;

  @IsString()
  location: string;
}
