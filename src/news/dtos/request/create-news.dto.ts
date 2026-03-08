import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Global Wheat Market Update' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example:
      'International demand for high-quality wheat continues to grow as key markets adjust to climate impacts.',
  })
  @IsString()
  @IsNotEmpty()
  shortArticle: string;

  @ApiProperty({
    example: 'https://example.com/images/news/wheat-market.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  image?: string;
}

