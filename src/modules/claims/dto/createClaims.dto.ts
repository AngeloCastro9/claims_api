import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export default class CreateClaimsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  observation: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsEmpty()
  createdAt: Date;
}
