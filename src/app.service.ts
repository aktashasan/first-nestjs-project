import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatEntity } from './dto/create-cat.entity';

@Injectable()
export class AppService {

  
   
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,
  ) {}

  async create(cat: CatEntity): Promise<CatEntity> {
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<CatEntity[]> {
    return this.catRepository.find();
  }
  
  async deleteAll(): Promise<void> {
    await this.catRepository.clear();
  }

  async getById(id: number): Promise<CatEntity> {

    const cat = await this.catRepository.findOneBy({ id: id })

    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    return cat;
  }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
