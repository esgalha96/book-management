// create-author.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  readonly surname?: string;

}
