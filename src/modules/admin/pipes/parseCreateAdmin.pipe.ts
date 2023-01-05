import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import CreateAdminDto from '../dto/createAdmin.dto';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParseCreateAdminPipe implements PipeTransform {
    async transform(value: CreateAdminDto, { metatype }: ArgumentMetadata) {
        if (value.password) value.password = await bcrypt.hash(value.password, 12)

        return value
    }
}
