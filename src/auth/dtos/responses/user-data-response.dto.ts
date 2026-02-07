import { ApiProperty } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';

export class UserDataDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  username: string;

  static userDateResponse(token: string, admin: Admin): UserDataDto {
    const userDataDto = new UserDataDto();
    userDataDto.accessToken = token;
    userDataDto.id = admin.id;
    userDataDto.email = admin.email;
    userDataDto.username = admin.username;
    return userDataDto;
  }
}
