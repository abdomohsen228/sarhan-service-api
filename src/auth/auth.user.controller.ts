/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginRequestDto } from './dtos/requests/auth-login-request.dto';
import { UserAuthService } from './auth.user.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtPayload } from './interfaces/jwtPayload.interface';

import { AuthGuard } from './guards/jwt-auth.guard';
import { UserDataDto } from './dtos/responses/user-data-response.dto';
import { CurrentUser } from '../decorators/currentUser';

@ApiTags('Admin Authentication')
@Controller('/auth')
export class UserAuthController {
  constructor(private readonly authServices: UserAuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and generate JWT token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in and JWT token generated',
    type: UserDataDto,
  })
  @ApiBody({ type: LoginRequestDto })
  public async login(
    @Body() loginRequestDtoPayload: LoginRequestDto,
  ): Promise<UserDataDto> {
    return this.authServices.login(loginRequestDtoPayload);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and invalidate token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged out and token invalidated',
    type: String,
  })
  public async logout(@CurrentUser() userPayload: JwtPayload): Promise<string> {
    return this.authServices.logout(userPayload.id);
  }
}
