import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryRequestDto {
  @ApiProperty({ example: 'Fruits' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Fresh fruits category', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
