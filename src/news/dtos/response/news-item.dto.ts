import { ApiProperty } from '@nestjs/swagger';

export class NewsItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: 'Sustainable Agriculture Trends in 2026',
  })
  title: string;

  @ApiProperty({
    example:
      'Farmers worldwide are adopting precision agriculture, smart irrigation, and data-driven logistics to boost yield and reduce waste.',
  })
  shortArticle: string;

  @ApiProperty({
    example: 'https://example.com/images/news/sustainable-agriculture.jpg',
    required: false,
  })
  image?: string | null;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;
}

