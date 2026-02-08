/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Admin } from '../../admin/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = this.extractToken(authHeader);

    if (!token) {
      throw new UnauthorizedException(
        'Invalid authorization header format. Expected format: "Bearer <token>"',
      );
    }

    try {
      const adminPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });

      const admin = await this.adminRepository.findOne({
        where: { id: adminPayload.id },
      });

      if (!admin) {
        throw new UnauthorizedException(
          'Admin not found or unauthorized access',
        );
      }
      if (adminPayload.tokenVersion !== admin.tokenVersion) {
        throw new UnauthorizedException(
          'Token version mismatch. Please log in again.',
        );
      }

      req['user'] = admin;
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorDetails =
        error instanceof Error ? error.stack : JSON.stringify(error);
      this.logger.error(errorMessage, errorDetails);
      throw new UnauthorizedException(
        'Invalid or expired token. Please log in again.',
      );
    }
  }

  private extractToken(authHeader: string): string | null {
    const bearerPrefix = 'Bearer';
    const [type, token] = authHeader.trim().split(' ');
    return type === bearerPrefix && token ? token : null;
  }
}
