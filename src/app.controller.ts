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
  @Get(':id')
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
  async deleteById(@Res() res: Response, @Body() id: number) {
    await this.appService.remove(id);
    return { message: 'Cat has been deleted' };
  }
}

