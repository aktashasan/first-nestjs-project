import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'int'})
  age: number;

  @Column({ type: 'varchar', length: 30})
  breed: string;
}
