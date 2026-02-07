import { Module } from '@nestjs/common';
import { UserAuthController } from './auth.user.controller';
import { UserAuthService } from './auth.user.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { Admin } from 'src/admin/entities/admin.entity';
@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Admin]),
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
export class AuthModule {}
