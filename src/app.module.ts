import { Module } from '@nestjs/common';
import { EntityController } from './api/v1/entity/entity.controller';
import { EntityService } from './service/entity/entity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './auth/token.entity';
import { TokenService } from './service/token/token.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'app',
      synchronize: true,
      entities: [Token],
    }),
    TypeOrmModule.forFeature([Token]),
    HttpModule,
  ],
  controllers: [EntityController],
  providers: [EntityService, TokenService],
})
export class AppModule {}
