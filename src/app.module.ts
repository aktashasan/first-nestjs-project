import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { DogModule } from './dog/dog.module';
import { CatModule } from './cat/cat.module';
import { DogEntity } from './dog/entities/dog.entity';
import { CatEntity } from './cat/entities/cat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [DogEntity, CatEntity],
          synchronize: true,
      }
    }
    }),
    DogModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
