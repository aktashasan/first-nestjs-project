import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsNumber } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
    
}
