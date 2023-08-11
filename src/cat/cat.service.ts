import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity) private catRepository: Repository<CatEntity>,
  ) {}

  CreateCat(createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat = new CatEntity();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.breed = createCatDto.breed;
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<CatEntity[]> {
    return this.catRepository.find();
  }

  async findCatById(id: number): Promise<CatEntity> {
    return this.catRepository.findOneBy({ id: id });
  }

  async updateCat(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity> {
    const catToUpdate = await this.catRepository.findOneBy({ id: id });
    Object.assign(catToUpdate, updateCatDto);
    return this.catRepository.save(catToUpdate);
  }

  async remove(id: number): Promise<void> {
    console.log('Deleting record with ID:', id);
    try {
      await this.catRepository.delete(id);
      console.log('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error; // Rethrow the error to handle it at the higher level
    }
  }
  async deleteAll(): Promise<void> {
    await this.catRepository.clear();
  }
}
