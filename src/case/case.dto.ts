import { IsEnum, IsString } from "class-validator";
export enum Status {
  SECURED = "SECURED",
  PROCESSING = "PROCESSING",
  RELEASED = "RELEASED",
}
export class CaseDTO {
  @IsString()
  caseId: string;

  @IsString()
  title: string;

  @IsString()
  status: Status;

  @IsEnum(Status)
  description: string;

  @IsString()
  weapon: string;
}
