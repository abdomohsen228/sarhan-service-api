import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin@example.com',
    description: 'The email of the admin',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin123',
    description: 'The password of the admin',
  })
  password: string;
}
