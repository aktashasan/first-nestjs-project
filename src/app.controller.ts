import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Delete,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { CatEntity } from './dto/create-cat.entity';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('api')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private appService: AppService) {}

  @Post('add')
  async create(@Res() res: Response, @Body() createCatDto: CatEntity) {
    this.appService.create(createCatDto);
    res.status(HttpStatus.CREATED).send();
  }

  @Get('list')
  async findAll(): Promise<CatEntity[]> {
    return this.appService.findAll();
  }
  @Delete('all')
  async deleteAllCats() {
    await this.appService.deleteAll();
    return { message: 'All cats have been deleted' };
  }
  @Get('list/:id')
  async getById(@Param('id') id: number) {
    try {
      const cat = await this.appService.getById(id);
      return cat;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Delete('delete/:id')
  async deleteById(@Res() res: Response, @Param() id: number) {
    console.log(id)
    await this.appService.remove(id);
    res.status(HttpStatus.OK).send();
  }
@Put(':id')
  async updateCat(@Param('id') id: number, @Body() updatedCatData: Partial<CatEntity>): Promise<CatEntity> {
    return this.appService.updateCat(id, updatedCatData);
  }
}