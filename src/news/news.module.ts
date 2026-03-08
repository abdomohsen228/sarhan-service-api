import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Admin } from '../admin/entities/admin.entity';
import { News } from './entities/news.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Admin, News]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        return {
          secret: config.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: Number(config.get<string>('JWT_EXPIRATION')),
          },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class NewsModule {}

