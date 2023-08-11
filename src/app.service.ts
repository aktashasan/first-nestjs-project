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
  console.log('Deleting record with ID:', id);
  try {
    await this.catRepository.delete( id);
    console.log('Record deleted successfully.');
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error; // Rethrow the error to handle it at the higher level
  }
}
async updateCat(id: number, updatedCatData: Partial<CatEntity>): Promise<CatEntity> {
  const catToUpdate = await this.catRepository.findOneBy({id: id});

  if (!catToUpdate) {
    throw new NotFoundException(`Cat with ID ${id} not found`);
  }

  // Update properties of the cat with the new data
  Object.assign(catToUpdate, updatedCatData);

  return this.catRepository.save(catToUpdate);
}
}
