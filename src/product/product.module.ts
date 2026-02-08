import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { Admin } from '../admin/entities/admin.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Admin, Product, Category]),
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
    AdminModule,
  ],
  exports: [JwtModule],
})
export class ProductModule {}
