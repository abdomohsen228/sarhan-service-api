import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Admin } from './entities/admin.entity';
import { WebsiteSettingsService } from './metaData/website_settings.service';
import { WebsiteSettings } from './metaData/website-settings.entity';
import { WebsiteSettingsController } from './metaData/website_settings.controller';

@Module({
  providers: [WebsiteSettingsService],
  controllers: [WebsiteSettingsController],
  imports: [
    TypeOrmModule.forFeature([Admin, WebsiteSettings]),
    ConfigModule,
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
})
export class AdminModule {}
