import {
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export default class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmpty()
    createdAt: Date;

}
