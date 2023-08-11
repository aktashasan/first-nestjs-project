import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { CatEntity } from './dto/create-cat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([CatEntity]),
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
          entities: [CatEntity],
          synchronize: true,
      }
    }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
