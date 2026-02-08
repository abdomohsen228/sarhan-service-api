import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { getCorsConfig } from './config/corsConfig';
import validationPipeConfig from './config/pipesConfig';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  app.enableCors(getCorsConfig(configService));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('Sarhan Service API')
    .setDescription('API documentation for Sarhan Service')
    .setVersion('1.0')
    .addTag('sarhan-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
