import {
    IsEmail,
    IsEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export default class UpdateAdminDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsEmpty()
    createdAt: Date;

}
