import { CaseDTO } from "../case/case.dto";

import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { ReportDTO } from "../report/report.dto";
enum Rank {
  OFFICER = "OFFICER",
  DETECTIVE = "DETECTIVE",
  SERGEANT = "SERGEANT",
  LIEUTENANT = "LIEUTENANT",
}

enum OfficerStatus {
  ON_DUTY = "ON_DUTY",
  OFF_DUTY = "OFF_DUTY",
  ON_LEAVE = "ON_LEAVE",
}
export class OfficerDTO {
  @IsString()
  name: string;

  @IsString()
  badgeNumber: string;

  @IsEnum(Rank)
  rank: Rank;

  @IsEnum(OfficerStatus)
  status: OfficerStatus;

  @IsOptional()
  @IsArray()
  cases: CaseDTO[];

  @IsOptional()
  @IsArray()
  report: ReportDTO[];
}
