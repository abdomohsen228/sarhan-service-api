import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService) => {
  const allowedOrigins = configService
    .get<string>('CORS_ORIGINS')
    ?.split(',') || [
    'http://localhost:3001',
    'https://www.sarhan.shop',
    'https://sarhan.shop',
    'https://www.sarhan.shop',
  ];

  return {
    origin: allowedOrigins,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  };
};
