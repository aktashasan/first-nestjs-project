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
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import e, { Response } from 'express';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post('add')
  async create(@Res() res: Response, @Body() createCatDto: CreateCatDto) {
    this.catService.CreateCat(createCatDto);
    res.status(HttpStatus.CREATED).send();
  }

  @Get('list')
  async findAll() {
    return this.catService.findAll();
  }
  @Delete('delete/all')
  async deleteAllCats() {
    await this.catService.deleteAll();
    return { message: 'All cats have been deleted' };
  }
  @Get('list/:id')
  async getById(@Param('id') id: number) {
    try {
      const cat = await this.catService.findCatById(id);
      if (cat == null) {
        console.log('cat is null');
      } else {
        return cat;
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
    await this.catService.remove(id);
    if ((await this.catService.findCatById(id)) == null) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      throw new NotFoundException(`Cat with ID ${id} did not delete`);
    }
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updatecatDto: UpdateCatDto) {
    return this.catService.updateCat(+id, updatecatDto);
  }
}
