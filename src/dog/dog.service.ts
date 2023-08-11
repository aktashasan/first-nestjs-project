import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { DogEntity } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(DogEntity) private dogRepository: Repository<DogEntity>,
  ) {}
  
  createDog(createDogDto: CreateDogDto): Promise<DogEntity> {
    const dog = new DogEntity();
    dog.name = createDogDto.name;
    dog.age = createDogDto.age;
    dog.breed = createDogDto.breed;
    return this.dogRepository.save(dog);
  }
  
  async findAll(): Promise<DogEntity[]> {
    return this.dogRepository.find();
  }
  
  async findDogById(id: number): Promise<DogEntity> {
    return this.dogRepository.findOneBy({id: id});
  }
  
  async updateDog(id: number, updateDogDto: UpdateDogDto): Promise<DogEntity> {
    const dogToUpdate = await this.dogRepository.findOneBy({id: id});
    if (!dogToUpdate) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    Object.assign(dogToUpdate, updateDogDto);
    return this.dogRepository.save(dogToUpdate);
  }
  
  async remove(id: number): Promise<void> {
    console.log('Deleting record with ID:', id);
    try {
      await this.dogRepository.delete(id);
      console.log('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error; // Rethrow the error to handle it at the higher level
    }
  }
  
  async deleteAll(): Promise<void> {
    await this.dogRepository.clear();
  }
  
}
