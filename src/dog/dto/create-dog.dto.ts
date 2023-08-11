import { IsString, IsNumber } from 'class-validator';

export class CreateDogDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
