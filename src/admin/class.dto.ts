import { IsString } from "class-validator";

export class Admin {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
