// update-book.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Author } from '../../author/schemas/author.schema'

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly author?: Author;

  @IsOptional()
  readonly pages?: number;

}
