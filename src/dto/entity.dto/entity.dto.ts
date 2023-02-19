import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EntityDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;
}
