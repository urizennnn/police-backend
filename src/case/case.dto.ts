import { IsEnum, IsString } from "class-validator";
export enum CaseStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}
export class CaseDTO {
  @IsString()
  caseId: string;

  @IsString()
  title: string;

  @IsEnum(CaseStatus)
  status: CaseStatus;

  @IsString()
  description: string;

  @IsString()
  weapon: string;
}
