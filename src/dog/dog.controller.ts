import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Response } from 'express';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post('add')
  async create(@Res() res: Response, @Body() createDogDto: CreateDogDto) {
    this.dogService.createDog(createDogDto);
    res.status(HttpStatus.CREATED).send();
  }

  @Get('list')
  async findAll() {
    return this.dogService.findAll();
  }

  @Delete('delete/all')
  async deleteAllDogs() {
    await this.dogService.deleteAll();
    return { message: 'All dogs have been deleted' };
  }

  @Get('list/:id')
  async getById(@Param('id') id: number) {
    try {
      const dog = await this.dogService.findDogById(id);
      if (dog == null) {
        console.log('dog is null');
      } else {
        return dog;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('delete/:id')
  async deleteById(@Res() res: Response, @Param() id: number) {
    console.log(id);
    await this.dogService.remove(id);
    if ((await this.dogService.findDogById(id)) == null) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      throw new NotFoundException(`Dog with ID ${id} did not delete`);
    }
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() createDogDto: CreateDogDto) {
    return this.dogService.updateDog(+id, createDogDto);
  }
}
