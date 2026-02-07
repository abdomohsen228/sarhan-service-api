import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dtos/requests/auth-login-request.dto';
import { Admin } from '../admin/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from './dtos/responses/user-data-response.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  public async login(loginDto: LoginRequestDto): Promise<UserDataDto> {
    const { email, password } = loginDto;
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });
    if (!existingAdmin) {
      throw new NotFoundException('admin not found');
    }
    if (!existingAdmin.password) {
      throw new BadRequestException(
        'This admin account does not have a password set. Please contact support.',
      );
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(
        'Invalid credentials. Please check your email and password and try again.',
      );
    }
    const tokenPayload = {
      email: existingAdmin.email,
      id: existingAdmin.id,
      tokenVersion: existingAdmin.tokenVersion,
    };

    const token = this.generateAccessToken(tokenPayload);

    existingAdmin.lastLogin = new Date();
    await this.adminRepository.save(existingAdmin);
    return UserDataDto.userDateResponse(token, existingAdmin);
  }

  public async logout(userId: number): Promise<string> {
    const admin = await this.adminRepository.findOne({ where: { id: userId } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    admin.tokenVersion = admin.tokenVersion + 1;
    await this.adminRepository.save(admin);

    return 'Logout successful';
  }

  private generateAccessToken(payload: {
    email: string;
    id: number;
    tokenVersion: number;
  }): string {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
